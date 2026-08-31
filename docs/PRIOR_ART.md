# Prior Art / 已有模拟器、实物与历史资料地图

机械计算已经有很多优秀复原、模拟器、专利、手册和博物馆资料。本项目不应把“能算出结果”当作原创目标，也不应该只围绕最著名的几台机器形成视野。

证据规则见 [`docs/EVIDENCE_POLICY.md`](EVIDENCE_POLICY.md)。本文件是**查重与入口地图**，不是每一个机械细节的最终证据表。

## 1. Computer History Museum — Babbage Engine

- Overview：<https://www.computerhistory.org/babbage/overview/>
- Engines：<https://www.computerhistory.org/babbage/engines>
- How it Works：<https://www.computerhistory.org/babbage/howitworks/>

CHM 的 Babbage Engine 专题系统解释 Difference Engine / Analytical Engine、有限差分、机械结构和现代复原。

### 对本项目的意义

- 历史事实、机器结构、Difference Engine 的工作原理应优先引用成熟资料；
- 不需要再写一篇“巴贝奇是谁”的泛科普；
- 更值得做的是把有限差分、进位、列联动和信息流拆成可逐步操作的机制模型；
- 当 UI 开始声称某个具体 engine revision 的机械时序时，需要继续追到原图、Babbage 文献和 reconstruction documentation，而不能只引用概览页。

## 2. John Walker / Fourmilab Analytical Engine Emulator

- 目录与文档：<https://fourmilab.ch/babbage/contents.html>
- Emulator authenticity 讨论：<https://www.fourmilab.ch/babbage/authentic.html>

这是非常重要的 Analytical Engine 模拟/研究工作，包含 programming cards、术语、函数库和 emulator。

### 本项目决策

不要重新从零定义一套“Analytical Engine 指令集”。若做 Analytical Engine 展示，应：

1. 理解 Walker 的模型与史料依据；
2. 明确哪些部分来自 Babbage 设计，哪些存在解释空间；
3. 把重点放在 Store / Mill / cards / control flow 的机制可视化；
4. 明确“类似现代 CPU 的某概念”只是比较维度，不等于历史结构身份。

## 3. 现有 Analytical Engine Node emulator

- <https://github.com/cakenggt/analytical-engine>

该项目沿 John Walker web emulator 方向提供 Mill、Store、CardReader、Printer、Curve Drawing Apparatus 等结构。

### 不重复

如果目标只是“执行 Analytical Engine card program”，直接研究/复用已有 emulator；本项目只有在逐步信息流、证据标注、操作解释或跨机器比较上有增量时才另写状态模型。

## 4. Difference Engine simulator

- <https://github.com/aroman/difference-engine>

已有 Python Difference Engine simulator，可根据多项式生成有限差分并模拟推进。

### 我们应该做什么不同

不是再做一个命令行 `f(x) -> values`，而是展示：

- 每一列当前数字；
- 一次教学 crank 导致哪些数学状态先后变化；
- carry 在抽象模型中如何传播；
- 为什么有限差分把高阶多项式计算变成重复加法；
- 哪些是数学依赖，哪些才是 Babbage 具体机械结构 claim。

## 5. Curta simulators 与机械资料

- npm `curta`：<https://www.npmjs.com/package/curta>
- CurtaSim：<https://www.rand-emonium.com/curtasim/>
- Jaap's Mechanical Calculators Page / Curta：<https://www.jaapsch.net/mechcalc/curta.htm>

Curta 已经有软件模拟器和详细机械计算爱好者资料。

### 本项目不应该做

只画一个 Curta UI，然后实现 `turn()` 得到结果。

### 值得做

- 一次 crank 内部发生什么；
- carriage shift 如何改变数量级；
- 加法/减法模式切换的机械意义；
- result counter / revolution counter / setting register 如何分工；
- Curta 与桌面 stepped-drum / pinwheel 机器在操作算法上的关系与压缩。

但 `research/curta-source-map.md` 还需要继续追专利、手册和具体型号，不应把爱好者资料直接升级成所有几何细节的 E1 证据。

## 6. Smithsonian — 机械计算器家族地图

- Calculating Machines 总览：<https://www.si.edu/spotlight/calculating-machines>
- Stepped Drum：<https://www.si.edu/spotlight/calculating-machines/stepped-drum-calculating-machines>
- Pinwheel：<https://www.si.edu/spotlight/calculating-machines/pinwheel-calculating-machines>
- Direct Multiplication：<https://www.si.edu/spotlight/calculating-machines/direct-multiplication-calculating-machines>

Smithsonian 的价值在于它把机械计算从少数“伟大发明家”扩展到**机制家族与实际机器对象**。

本项目应该利用这种分类研究：

- digit representation；
- carry；
- variable engagement；
- carriage shift；
- repeated crank；
- direct multiplication；
- operator protocol；
- result / revolution registers。

博物馆 overview 通常是 H/E2 级的可靠入口；如果要声称某型号内部具体齿数、连杆和时序，应继续追对象记录、专利/手册或技术复原。

## 7. Pascaline：carry 不是抽象箭头

- ACONIT / Inria virtual museum：<https://aconit.inria.fr/omeka/exhibits/show/histoire-machines/prehistoire/pascaline.html>
- CMU Pascaline reconstruction：<https://www.cs.cmu.edu/~dst/Pascaline/>

Pascaline 的 sautoir 是本仓库 carry 研究的重要具体案例：它提醒我们真实 carry 可能包含储能、延迟释放和方向性，而不是一串永远啮合的 digit gears。

详见 [`research/carry-is-the-hard-part.md`](../research/carry-is-the-hard-part.md)。

### 不重复

不要为了“展示 Pascaline”重做整台复原。优先做 carry architecture comparison，并保持 generic carry event 与 Pascaline 实体机构分离。

## 8. Comptometer：key-driven computation

- Smithsonian overview：<https://www.si.edu/spotlight/adding-machines/full-keyboard-hill-to-felt-tarrant>
- early wooden-box Comptometer：<https://americanhistory.si.edu/collections/object/nmah_690456>
- Model A Comptometer：<https://americanhistory.si.edu/collections/object/nmah_690484>

Comptometer 对本项目的增量不是“又一台加法器”，而是一个新的操作协议：**keypress 本身就是把数送进 accumulator 的机械动作**。

Model A 的 multi-column / add-receive-carry 行为又进一步提出 carry timing 和 simultaneous input 问题。

详见 [`research/key-driven-computation.md`](../research/key-driven-computation.md)。

### 不重复

先建 key-driven mechanism model，不做完整键盘皮肤。

## 9. Millionaire / Otto Steiger：direct multiplication

- Smithsonian direct multiplication overview：<https://www.si.edu/spotlight/calculating-machines/direct-multiplication-calculating-machines>
- Millionaire object：<https://www.si.edu/object/nmah_694168>
- Otto Steiger US 538,710 (1895)：<https://patents.google.com/patent/US538710A/en>
- Otto Steiger US 558,913 (1896)：<https://patents.google.com/patent/US558913A/en>

这是当前 multiplication track 最重要的查漏结果。

stepped drum 和 pinwheel 虽然 actuator 不同，但 operator-level multiplication 往往仍依赖按 multiplier digit 重复 crank。Millionaire 代表更强的架构变化：机器控制机构直接选择对应 multiple，乘法表的一部分进入了机械控制几何。

详见 [`research/multiplication-mechanisms.md`](../research/multiplication-mechanisms.md)。

### 本项目增量

比较的不只是“谁有几颗齿”，而是：

```text
repetition 在操作者手里？
在 variable engagement 里？
还是 multiplication-table control 里？
```

## 10. Odhner patents / pinwheel primary evidence

- W. T. Odhner US 514,725 (1894)：<https://patents.google.com/patent/US514725A/en>
- later Odhner locking work, US 1,510,100 (1924)：<https://patents.google.com/patent/US1510100A/en>

原始专利适合回答：

- adjustable pins 如何被描述；
- setting/registration mechanism；
- 某些 locking / invalid-operation 问题。

但专利描述的是设计/权利要求文本，**不能单独证明所有功能都按图量产或每个后续型号相同**。需要与 museum object、manual、surviving machine 等交叉。

## 11. Mechanical Integrators / Differential Analyzers

- Smithsonian：<https://www.si.edu/spotlight/mechanical-integrators>

连续机械计算不应该被笼统写成“analog computer”。至少区分：

- planimeter；
- curve integrator；
- differential analyzer；
- 后续 specialized analog machinery。

本项目的 explanatory increment 应是：变量如何以连续物理量存在、怎样耦合、怎样积分、怎样读出和怎样累积误差。

## 12. JavaScript emulator collections

- `jsemu`：<https://github.com/fcambus/jsemu>

其中收录 Difference Engine、Analytical Engine、Z1/Z3 adder 等早期计算机器模拟。

### 开工前先查

如果某台机器已有成熟交互模拟器，本仓优先：

```text
link existing simulator
→ inspect what internal state it exposes
→ identify missing mechanism explanation
→ build isolated mechanism/comparison
```

而不是：

```text
rewrite whole machine
```

## 13. 本项目真正值得写的共用层

### Deterministic mechanism core

统一表达能够被不同机器复用的状态关系，例如：

- wheel/register state；
- input motion；
- carry event；
- transfer ratio；
- latch / detent；
- carriage offset；
- operation phase；
- human operation；
- invalid/interlocked state。

### Evidence-aware interpretation layer

相同的功能事件可以由不同真实机构实现。代码层应该能表示：

```text
CARRY_PROPAGATE
```

而历史解释层再说明它在某个 Pascaline / Comptometer / other machine 中具体对应什么，依据是什么。

### 跨机器同题实验

同一个运算：

```text
314 × 27
```

分别展示：

- pure repeated addition；
- stepped drum；
- pinwheel；
- direct multiplication / Millionaire-style control；
- Curta（当 source map 足够具体时）。

同样，一次加法也可以比较：

- stylus-driven dial；
- lever + crank；
- key-driven accumulation。

这比第 N 个单机 emulator 更能体现项目价值。

## 14. 查重不只是查“有没有模拟器”

在开工前同时问：

- [ ] 这台机器是否已有在线模拟器？
- [ ] 是否已有开源 emulator？
- [ ] 是否有 museum reconstruction / artifact record？
- [ ] 是否有 original patent / manual / drawing？
- [ ] 它提供了一个本仓库还没有的 mechanism 吗？
- [ ] 它提供了一个新的 operator protocol 吗？
- [ ] 它改变了数字的 physical representation 吗？
- [ ] 它改变了 algorithm 在 human / mechanism 之间的分工吗？
- [ ] 我们能否只写机制模块，而不是重写整机？
- [ ] UI 想画到多具体？现有证据能支持到那个精度吗？
- [ ] 动画和状态机是否分离？
- [ ] 是否能自动测试功能关系？
- [ ] 是否已经把 mathematical / historical / reconstruction / pedagogical claim 分开？

如果唯一目标是“这个模拟器也能算”，就不要写。

如果唯一理由是“它很老、很有名、齿轮很多”，也不要写。

真正值得加入的理由应该是：

> **它让我们看见一种之前没看见的计算表示、机械约束或人机算法分工。**