# Mechanism Core Model / 机制核心模型

本文定义第一阶段（M0）共享的离散状态模型。它只描述可观察的机械逻辑，不描述齿轮的几何尺寸、动画时长或具体机器的历史复原。

## 1. 边界与术语

- **wheel**：一个十进制数字轮，位置为 `0..9`。
- **step**：驱动一个轮尝试前进或后退一个数字位置的离散输入动作。
- **crank**：一次完整的人工驱动周期；一个 crank 可以包含多个按顺序执行的 step 与 carry phase。
- **phase**：crank 中可单步观察的阶段。
- **carry event**：某个轮越过边界后，向相邻高位轮传递一次进位（或借位）请求的事件。
- **carry-out**：最高位继续越过边界，超出当前轮组容量的事件。

这里的“前进”默认表示加法方向；减法/借位需要在后续模型中明确作为独立方向，而不是隐含在负数里。

## 2. 十进制轮状态

最小状态：

```ts
interface DecimalWheelState {
  /** Least-significant position is 0. */
  index: number;
  /** Current digit, always an integer in 0..9. */
  position: number;
}
```

不变量：

```text
0 <= position <= 9
position is an integer
index is unique within a wheel assembly
```

单轮加法 step 的状态转移：

| 当前位 | 输入 step | 新位置 | 事件 |
|---:|---:|---:|---|
| 0..8 | +1 | 当前位 + 1 | 无 |
| 9 | +1 | 0 | `CARRY_PENDING` |

状态转移必须先产生“边界已越过”的事件，再由 carry chain 决定是否传播；不能只把数字直接取模而丢失事件。

## 3. Carry chain

一个 carry chain 是按低位到高位排列的有限轮组：

```ts
interface CarryChainState {
  wheels: DecimalWheelState[];
  crank: number;
}

interface CarryEvent {
  type: 'CARRY_PENDING' | 'CARRY_PROPAGATED' | 'CARRY_OUT';
  fromIndex: number;
  toIndex?: number;
  crank: number;
}
```

### 加法 `+1` 的确定性顺序

1. 对 index `0` 的轮执行一个 `+1` step。
2. 若未越过 `9`，本次 crank 结束。
3. 若越过边界，发出 `CARRY_PENDING`，将 carry 传给 `index + 1`。
4. 高位轮接收 carry，先发出对应的 `CARRY_PROPAGATED`，再执行自己的 `+1` step。
5. 重复步骤 3–4，直到某个轮没有越界。
6. 若最高位仍越界，发出 `CARRY_OUT`；轮组内部保持归零后的状态。

因此，四位轮组的参考结果是：

```text
0009 + 1 -> 0010
  carry: 0 -> 1

0099 + 1 -> 0100
  carry: 0 -> 1 -> 2

9999 + 1 -> 0000 + carry-out
  carry: 0 -> 1 -> 2 -> 3 -> 4
```

事件序列中的 `fromIndex` / `toIndex` 使用低位为 `0` 的索引，便于与数组和测试断言对应。UI 可以把它显示为个位、十位等人类可读名称，但不能改变核心索引语义。

## 4. Crank 与 phase

核心引擎应返回可序列化的 phase，而不是只返回最终数字：

```ts
type CrankPhase =
  | 'INPUT_STEP'
  | 'CARRY_PENDING'
  | 'CARRY_PROPAGATED'
  | 'CARRY_OUT'
  | 'CRANK_COMPLETE';
```

推荐的单次结果形状：

```ts
interface TransitionResult {
  before: number[];
  after: number[];
  crank: number;
  phases: Array<{
    phase: CrankPhase;
    activeIndex?: number;
    event?: CarryEvent;
  }>;
}
```

`before` 与 `after` 都按低位到高位存储；展示层如需显示通常书写的高位到低位数字串，应在 adapter 中反转，不能让核心状态同时承担两种顺序。

### 状态转换要求

- 给定相同的 `before`、输入动作和轮组宽度，结果与 phase 序列必须完全相同。
- 每个 phase 只改变它负责的局部状态；动画不得偷偷修改核心状态。
- `CRANK_COMPLETE` 只能出现在所有 pending carry 已处理之后。
- 任何 phase 都可以被序列化并用于重放；重放不得依赖墙上时钟或随机数。

## 5. 机械事件与视觉适配

核心模型只输出数字位置和事件。可视化 adapter 再决定：

- 哪个轮高亮；
- 棘爪、拨杆或齿轮如何运动；
- 每个 phase 的动画时长；
- 用户是点击单步还是拖动曲柄。

推荐数据流：

```text
input action
    ↓
deterministic transition engine
    ↓
serializable phases/events
    ↓
SVG / Canvas / other visual adapter
```

这样即使移除所有动画，也可以通过事件序列验证机械逻辑；反过来，动画也不能成为状态真相来源。

## 6. 测试验收

M0 至少需要覆盖：

1. `0009 + 1 -> 0010`：个位进位到十位；
2. `0099 + 1 -> 0100`：连续两次进位；
3. `9999 + 1 -> 0000` 且存在 `CARRY_OUT`；
4. 普通输入（例如 `1234 + 1 -> 1235`）不产生 carry；
5. 事件索引按低位到高位递增；
6. phase 重放得到与首次执行相同的 `after` 和事件序列；
7. 非法位置（小于 0、大于 9、非整数）在进入引擎时被拒绝。

测试应断言两类事实：最终状态正确，以及中间 carry event/phase 正确。只断言最终数字会掩盖“结果对了但机械过程错了”的实现。

## 7. 历史与模型的证据边界

本文是跨机器共用的教学抽象，不声称每台历史机器都采用同一套 step 或事件边界。具体机器文档必须另外说明：

- 哪些状态来自保留实物、原始图纸或手册；
- 哪些状态是从资料推导出的解释；
- 哪些只是为了教学而设计的离散化。

证据等级沿用 [`PRIOR_ART.md`](PRIOR_ART.md) 的 A–D 标记。尤其是 `CARRY_PENDING` 与 `CARRY_PROPAGATED` 是软件可观察事件，不应未经来源支持就写成某一历史机构的字面零件名称。
