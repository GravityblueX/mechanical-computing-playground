# Mechanical Computing Playground · 机械计算游乐场

> 目标不是做“复古计算器皮肤”，而是让人看见：**一个数学操作究竟怎样被齿轮、拨轮、棘轮、进位机构、曲柄和纸带做出来。**

## 项目目标

这个仓库用可交互模拟、最小机制模型和历史资料，把“计算”重新还原成机械动作。

我们关心的不是只有结果：

```text
27 × 4 = 108
```

而是：

```text
输入 27
→ 曲柄旋转
→ 个位/十位机构移动
→ 累加
→ 进位
→ 计数器变化
→ 得到 108
```

## 明确不重复造轮子

Babbage Difference Engine、Analytical Engine、Curta 等已经存在不少模拟器和复原项目。本项目不以“再写一个只能算出同样结果的 emulator”为目标。

本仓库更强调：

- **机制可视化**：为什么这一齿会带动下一齿；
- **信息流**：数值在哪个机械部件中“存在”；
- **操作成本**：一次加法、乘法、进位到底需要多少机械动作；
- **错误与限制**：卡齿、进位链、位数、回差、人工操作顺序；
- **跨机器比较**：同一个计算，在不同机械架构上如何实现。

## 第一批机制，而不是第一批“整机”

先做可复用机制：

1. 十进制数字轮；
2. 单级与连续进位；
3. Leibniz stepped drum（阶梯鼓轮）概念模型；
4. pinwheel（可变齿拨轮）概念模型；
5. carriage shift（移位架）；
6. revolution counter（转数计数器）；
7. finite differences（有限差分）列联动；
8. punched card / program card 的离散控制模型。

这些机制能组合成不同机器。

## 第一批机器

按“机制差异”而不是名气排序：

- Pascaline：十进制加法与进位；
- Leibniz / Arithmometer 系：阶梯鼓轮与乘除；
- Odhner 系：pinwheel；
- Comptometer：键驱动并行输入；
- Curta：高度压缩的手摇十进制机械计算；
- Difference Engine：有限差分与自动制表；
- Analytical Engine：Store / Mill / cards；
- Differential Analyzer：连续量与机械积分（后期）。

## 建议架构

先不要上复杂 3D 物理引擎。

```text
Mechanism state model
        ↓
Deterministic transition engine
        ↓
2D/3D visualization adapter
        ↓
Interactive controls
```

核心状态应该可测试，例如：

```json
{
  "mechanism": "decimal-wheel",
  "position": 9,
  "input_steps": 1,
  "next_position": 0,
  "carry": true
}
```

这样“机械逻辑”和“动画”不会绑死。

## 每个机制/机器至少要有

```text
machines/<name>/
├── README.md       # 历史与用途
├── mechanism.md    # 机械结构抽象
├── state-model.md  # 软件状态模型
├── operations.md   # 怎样做 + - × ÷ / 制表等
├── limitations.md  # 位数、速度、人工步骤、误差
├── sources.md      # 原始资料和已有模拟器
└── demo/           # 可交互实现
```

## 第一阶段实验

### Demo 1：看得见的进位

做一个 4 位十进制轮：

```text
0099 + 1
```

用户应能逐步看到两次进位，而不是数字瞬间变成 0100。

### Demo 2：用有限差分“只靠加法”生成平方数

展示：

```text
n²:       0  1  4  9  16 ...
Δ1:       1  3  5  7  ...
Δ2:       2  2  2  ...
```

并让用户手摇一次推进一行。

### Demo 3：同一道乘法的三种机械实现

比较：

- repeated addition；
- stepped drum；
- pinwheel + carriage shift。

目标不是速度竞赛，而是理解“乘法如何被机构分解”。

## 研究问题

- “数字”在机械计算机中究竟是什么：位置、角度、齿数还是状态？
- 进位为什么是机械计算最关键、也最容易复杂化的问题之一？
- 为什么有限差分特别适合机械制表？
- 为什么机械计算机很早就出现了 input / store / operation / output 的分层？
- 机械限制如何塑造算法，而不是算法单向决定机器？

## 第一阶段

- [ ] `docs/PRIOR_ART.md`：已有模拟器、博物馆和历史资料地图；
- [ ] `mechanisms/decimal-wheel`；
- [ ] `mechanisms/carry-chain`；
- [ ] `demos/visible-carry`；
- [ ] `demos/finite-difference`；
- [ ] 一篇“为什么 Difference Engine 不需要通用乘法器”；
- [ ] 一篇“Curta 为什么不是一个长得奇怪的电子计算器前身，而是一种机械算法机器”。

## 项目原则

**先把机械逻辑讲明白，再追求漂亮的齿轮动画。**

如果一个 demo 把所有齿轮隐藏掉但仍能清楚展示状态转换，它比一个视觉很酷却解释不了进位的 3D 模型更接近本项目目标。
