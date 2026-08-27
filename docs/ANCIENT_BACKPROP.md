# 古法反向传播机 · Hand-Crank Backpropagation Machine

> 一个反事实工程史 + 可交互教学实验：**如果把反向传播当成机械过程，而不是屏幕上的公式，它到底需要哪些状态、传动、回传与调节？**

## 0. 先划清边界

这个展品**不是历史复原**。

没有证据表明 19 世纪机械计算机工程师真的造过现代意义上的反向传播神经网络。本项目把现代反向传播的计算结构翻译成机械计算语汇，用来解释：

- 前向传播是什么；
- loss 如何形成；
- 链式法则怎样把误差信号一级一级向回传播；
- 参数为什么要按梯度方向调整；
- 一次“训练”实际上包含多少状态变化。

因此页面必须明确标注：

```text
Historical reconstruction: NO
Pedagogical mechanical interpretation: YES
```

## 1. 已有真正的机械反向传播工作

不能把“机械神经网络 + 反向传播”当作本项目原创。

Shuaifeng Li 与 Xiaoming Mao 在 2024 年发表：

- **Training all-mechanical neural networks for task learning through in situ backpropagation**
- Nature Communications 15, 10528 (2024)
- DOI: https://doi.org/10.1038/s41467-024-54849-z
- 论文页面: https://www.nature.com/articles/s41467-024-54849-z
- 代码: https://github.com/mao-research-group/Mechanical-neural-networks

该工作研究真实的机械神经网络（MNN）：节点与弹性连接构成网络，输入是外力，输出是位移，连接的 spring constants 是可训练参数。论文通过机械系统的 forward field 与 adjoint field，在局部获得 loss 对连接刚度的梯度。

一个特别重要的结果是：梯度可以由每条 bond 的 forward elongation 与 adjoint elongation 的局部组合得到。

### 与我们的区别

他们在回答：

> 真实机械材料/网络能否物理地获得训练梯度？

我们主要回答：

> 一个普通人能不能通过手摇、齿轮、滑块和状态变化，**看见反向传播为什么成立、到底在回传什么？**

并且他们论文中的实体机械网络目前并不会自动改变自身 spring constants；实验获得梯度后，参数更新仍由数值模型执行，再制造/验证新结构。因此“全自动自学习纯机械机器”也不能被我们写成已经实现的事实。

## 2. 第一版不要训练 MNIST

第一版只做一个极小网络，必须能够把全部内部状态摊开。

建议分两级。

### Stage A — 单层线性机器

```text
x1 --[w1]--\
             >---- y ---- loss
x2 --[w2]--/
```

目标：先让用户理解

```text
y = w1*x1 + w2*x2
```

以及为什么

```text
∂L/∂w1
∂L/∂w2
```

与输入、输出误差有关。

这一阶段故意不引入 hidden layer，先把“梯度 = 参数微小变化对误差的影响”讲清楚。

### Stage B — 2 → 2 → 1

```text
x1 --[w11]--\        /--[v1]--\
              h1 ---             \
x2 --[w21]--/                    >--- y
                                 /
x1 --[w12]--\        /--[v2]--/
              h2 ---
x2 --[w22]--/
```

这一阶段展示真正的链式回传：

```text
output error
   ↓
hidden contribution
   ↓
input-side weight gradients
```

非线性激活先使用**明确标注为教学抽象**的 piecewise-linear / cam transfer model；不要为了一个 sigmoid 动画假装历史机械结构已经解决。

## 3. 机械语汇

第一版并不需要真实 3D 刚体物理。

把计算状态映射为机械部件：

| 数学对象 | 教学机械映射 |
|---|---|
| input | 输入滑块 / 刻度盘 |
| weight | 可调齿轮比 / 权重刻度轮 |
| multiply | differential / gear-ratio 教学模块 |
| sum | accumulator shaft |
| activation | cam / transfer profile（教学抽象） |
| target | 目标刻度 |
| error | 差动机构位移 |
| gradient | reverse shaft 上的带符号位移/转角 |
| learning rate | 调节器 / reduction ratio |
| parameter update | 权重轮的微小反向移动 |

注意：这张表是**表现层映射**，不是声称这些部件已经构成一台可制造的历史机器。

## 4. 一次训练必须像一次机械操作

建议把交互冻结成明确 phase：

```text
1. LOAD INPUT
2. FORWARD CRANK
3. READ OUTPUT
4. SET TARGET
5. ENGAGE ERROR DIFFERENTIAL
6. REVERSE / ADJOINT CRANK
7. READ GRADIENT SHAFTS
8. APPLY LEARNING-RATE GEAR
9. UPDATE WEIGHT DIALS
10. FORWARD CRANK AGAIN
```

用户可以选：

- `automatic`: 一次按钮完成一轮；
- `single-step`: 每一 phase 手动推进；
- `hand-crank`: 鼠标拖动/触摸旋转曲柄才能推进。

## 5. 必须显示什么

页面永远同时显示四层信息：

### 机械层

齿轮/滑块/shaft 的运动。

### 状态层

```text
x
w
hidden
output
target
loss
gradients
```

### 事件层

例如：

```text
FORWARD_MULTIPLY
ACCUMULATE
LOSS_COMPARE
BACKPROP_OUTPUT
BACKPROP_HIDDEN
WEIGHT_UPDATE
```

### 数学层（默认折叠）

用户点击“显示数学”才展开对应公式。

目标不是用动画把数学藏起来，而是让**机械动作和公式可以一一对照**。

## 6. 验收实验

### Experiment 1 — 一个权重真的会往正确方向走

固定：

```text
x = 1
target = 0.2
initial weight = 0.8
```

连续手摇若干次后：

- loss 单调下降（在所选学习率的稳定范围内）；
- weight 朝目标方向移动；
- 每轮的 gradient 与独立数值计算一致。

### Experiment 2 — 链式法则不是魔法

2 → 2 → 1 网络中，逐层显示：

```text
∂L/∂y
→ ∂L/∂h
→ ∂L/∂w
```

要求测试能够证明 UI 展示值与 reference implementation 一致。

### Experiment 3 — 学习率太大会“机械过冲”

允许用户把 learning-rate gear 调得过大，观察：

- loss 震荡；
- 参数来回越过目标；
- 甚至发散。

这比只告诉用户“learning rate 很重要”更直观。

## 7. 软件架构

不要把神经网络计算直接写进动画组件。

```text
backprop-core/
  pure deterministic math/state
        ↓
mechanical-mapping/
  state -> mechanism events
        ↓
web-exhibit/
  SVG / Canvas / WebGL visualization
```

### Core 最低测试

- forward reference values；
- analytic gradient vs finite difference；
- one-step weight update；
- multi-step loss decrease；
- phase order invariant；
- serialization/replay of one training cycle。

## 8. 与真正 mechanical neural network 的关系

后期可以加一个“现实世界”标签页：

```text
Hand-crank pedagogical machine
          vs
2024 in-situ mechanical backpropagation
```

明确比较：

- 我们：离散、显式、教学型、反事实机械计算机；
- Li & Mao：连续力学网络、spring stiffness 参数、forward/adjoint deformation、真实实验梯度。

如果后期想复现论文，应独立作为 `studies/mechanical-neural-network/`，优先运行其公开 MATLAB 代码，不在本仓重写一套相同算法。

## 9. 不做什么

- 不声称 Babbage / Leibniz / Curta 与神经网络有历史连续性；
- 不把“齿轮画面 + JavaScript 普通 backprop”伪装成真实机械实现；
- 不为了炫技先做 3D physics；
- 不训练大型数据集；
- 不重复 Li & Mao 的机械网络论文代码，除非为了可验证复现实验；
- 不把机械类比写成物理可制造性结论。

## 10. 第一批 AI 任务

### BP-A — 查重与数学边界

阅读本文件、`docs/PRIOR_ART.md`、Li & Mao 2024 论文与公开代码，产出：

`research/backprop-prior-art.md`

必须回答：哪些是真机械学习已有成果，哪些只是我们的教学反事实。

### BP-B — `backprop-core`

只实现 Stage A 单层线性机器的纯逻辑和 tests，不做 UI。

验收：analytic gradient 与 finite difference 在合理 epsilon 下匹配。

### BP-C — phase/event machine

把一轮训练拆成显式 phase/event，可序列化、重放。

### BP-D — Stage B chain rule

实现 2→2→1 网络，先只做状态表和测试。

### BP-E — Hand-crank exhibit

最后才做浏览器展示。

一句话目标：

> **不要告诉用户“误差被反向传播了”；让她亲手摇回去，看见每一级到底回去了什么。**
