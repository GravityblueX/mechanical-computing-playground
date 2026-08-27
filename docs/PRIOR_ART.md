# Prior Art / 已有模拟器与历史资料地图

机械计算已经有很多优秀复原、模拟器和博物馆资料。本项目不应把“能算出结果”当作原创目标。

## 1. Computer History Museum — Babbage Engine

- Overview：<https://www.computerhistory.org/babbage/overview/>
- Engines：<https://www.computerhistory.org/babbage/engines>
- How it Works：<https://www.computerhistory.org/babbage/howitworks/>

CHM 的 Babbage Engine 专题已经非常系统地解释 Difference Engine / Analytical Engine、有限差分、机械结构和现代复原。

### 对本项目的意义

- 历史事实、机器结构、Difference Engine 的工作原理应优先引用成熟资料；
- 不需要再写一篇“巴贝奇是谁”的泛科普；
- 我们更适合把有限差分、进位、列联动做成可逐步操作的机制模型。

## 2. John Walker / Fourmilab Analytical Engine Emulator

- 目录与文档：<https://fourmilab.ch/babbage/contents.html>
- Emulator authenticity 讨论：<https://www.fourmilab.ch/babbage/authentic.html>

这是非常重要的 Analytical Engine 模拟/研究工作，包含 programming cards、术语、函数库和 emulator。

### 本项目决策

不要重新从零定义一套“Analytical Engine 指令集”。若做 Analytical Engine 展示，应：

1. 先理解 Walker 的模型与史料依据；
2. 明确哪些部分是 Babbage 设计中确定的，哪些存在历史解释空间；
3. 把重点放在 Store / Mill / cards / control flow 的机制可视化。

## 3. 现有 Analytical Engine Node emulator

- <https://github.com/cakenggt/analytical-engine>

这个项目是对 John Walker web emulator 的 Node 方向移植/实现，已经提供 Mill、Store、CardReader、Printer、Curve Drawing Apparatus 等结构。

### 不重复

如果目标只是“执行 Analytical Engine card program”，直接研究/复用现有 emulator；本项目只有在交互机制、逐步信息流或跨机器比较上有增量时才另写状态模型。

## 4. Difference Engine simulator

- <https://github.com/aroman/difference-engine>

已有 Python Difference Engine simulator，可根据多项式生成有限差分并模拟推进。

### 我们应该做什么不同

不是再做一个命令行 `f(x) -> values`，而是展示：

- 每一列当前数字；
- 一次 crank 导致哪些列先后变化；
- carry 如何传播；
- 为什么有限差分把高阶多项式计算变成重复加法。

## 5. Curta simulators

- npm `curta`：<https://www.npmjs.com/package/curta>
- CurtaSim（Apple // simulation）：<https://www.rand-emonium.com/curtasim/>
- Jaap's Mechanical Calculators Page / Curta：<https://www.jaapsch.net/mechcalc/curta.htm>

Curta 已经有软件模拟器和非常详细的机械计算爱好者资料。

### 本项目不应该做

只画一个 Curta UI，然后实现 `turn()` 得到结果。

### 值得做

- 一次 crank 内部发生什么；
- carriage shift 如何改变数量级；
- 加法/减法模式切换的机械意义；
- Curta 与桌面 stepped-drum / pinwheel 机器在信息流上的差异。

## 6. JavaScript emulator collections

- `jsemu` 列表：<https://github.com/fcambus/jsemu>

其中已经收录 Difference Engine、Analytical Engine、Z1/Z3 adder 等早期计算机器模拟。

### 开工前先查

如果某台机器已经有成熟交互模拟器，本仓优先：

```text
link existing simulator
→ explain mechanism
→ build isolated mechanism demo
```

而不是：

```text
rewrite whole machine
```

## 7. 机械计算史资料

- Computer History Museum Calculators：<https://www.computerhistory.org/brochures/calculators/>

机械计算器远不止 Babbage / Curta。Schickard、Pascal、Leibniz、Thomas de Colmar、Odhner、Comptometer 等机器代表不同的输入、进位和乘法机制。

### 本项目应该避免“英雄史”

重点应从“伟大发明家列表”转向：

- carry mechanism；
- stepped drum；
- pinwheel；
- key-driven accumulator；
- carriage shift；
- automatic sequencing；
- continuous mechanical integration。

## 8. 真实性问题本身就是研究对象

Analytical Engine 从未按完整设计建成，因此 emulator 的“真实性”不能像模拟一台有大量历史软件的 1980s 电脑那样简单验证。

本项目应给模型标注证据等级：

```text
A: preserved physical machine / direct measurement
B: original drawing/manual + later faithful reconstruction
C: historically documented but interpretation required
D: pedagogical simplification
```

UI 上最好也能显示“这是教学抽象，不是 1:1 机械复刻”。

## 9. 本项目真正值得写的共用层

### `mechanism-core`

统一表达：

- wheel position；
- input motion；
- carry event；
- transfer ratio；
- latch / detent；
- carriage offset；
- operation phase。

### 可视化层

核心状态模型与 2D/3D 动画分离。这样可以用测试证明：

```text
999 + 1 -> 000 + carry-out
```

而不是靠肉眼判断齿轮动画“看起来对”。

### 跨机器同题实验

同一个运算：

```text
314 × 27
```

分别展示：

- repeated addition；
- stepped drum；
- pinwheel；
- Curta；
- 如果合适，再比较电子 ALU。

这比第 N 个单机 emulator 更能体现项目价值。

## 10. 开工前强制查重清单

- [ ] 这台机器是否已有在线模拟器？
- [ ] 是否已有开源 emulator？
- [ ] 是否有博物馆的高质量结构说明？
- [ ] 我们要展示的机制是什么？
- [ ] 能否只写机制模块，而不是重写整机？
- [ ] 哪些行为有原始史料依据？
- [ ] 哪些是现代教学抽象？
- [ ] 动画和状态机是否分离？
- [ ] 是否能做自动测试验证状态转换？

如果唯一目标是“这个模拟器也能算”，那就先不要写。
