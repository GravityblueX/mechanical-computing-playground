# Roadmap

机械计算游乐场按“机制 → 组合 → 整机 → 比较”推进，避免一上来做巨大 3D 复刻。

## M0 — 机制核心

目标：建立可测试的离散机械状态模型。

- [x] `docs/MODEL.md`：mechanism state / transition / event 定义；
- [x] `src/mechanism-core.ts`：decimal wheel 与 carry chain 的确定性核心；
- [x] `test/mechanism-core.test.mjs`：M0 carry / phase / replay 验收测试；
- [ ] `mechanisms/decimal-wheel/`：面向展品的机制封装；
- [ ] `mechanisms/carry-chain/`：面向展品的机制封装；
- [ ] `mechanisms/carriage-shift/`；
- [ ] `schemas/mechanism.schema.json`；
- [ ] 统一 step / crank / phase / carry event 术语。

### M0 验收

至少自动测试：

```text
0009 + 1 -> 0010
0099 + 1 -> 0100
9999 + 1 -> overflow/carry-out
```

并能输出每一级 carry event，而不是只输出最终数字。

---

## M1 — Visible Carry

做第一个真正可玩的 demo：

`demos/visible-carry/`

要求：

- 4 位十进制；
- 单步推进；
- 显示当前 active wheel；
- 显示 carry pending / carry propagated；
- 可以调慢动画；
- UI 不是状态真相来源，核心逻辑有独立测试。

### 研究笔记

写 `studies/carry-is-the-hard-part.md`：比较“表示一个十进制数字”和“可靠传播进位”在机械复杂度上的差异。

---

## M2 — Finite Difference Engine

目标：不复刻整台 Difference Engine，也能让人真正理解它为什么只靠加法制表。

- [ ] `mechanisms/difference-column/`；
- [ ] `demos/finite-difference/`；
- [ ] 支持一阶到至少四阶差分；
- [ ] 每次 crank 逐列展示更新顺序；
- [ ] 可选择 `n²`、`n³`、用户输入初始 difference table；
- [ ] 明确区分数学抽象与 Babbage 实际机械设计。

### 验收

一个没有读过有限差分的人，在不看公式推导的情况下，能够通过 10 次 crank 观察出：

> 恒定高阶差分如何只通过重复加法生成多项式表。

---

## M3 — 两种乘法机械

### Stepped Drum

- [ ] 建概念模型；
- [ ] 展示输入数字如何决定参与啮合的齿数/步数；
- [ ] carriage shift；
- [ ] repeated crank multiplication。

### Pinwheel

- [ ] 建可变有效齿模型；
- [ ] 展示与 stepped drum 的结构差异；
- [ ] 同一道乘法比较操作序列。

### 验收

用同一个算例，例如 `314 × 27`，输出：

- crank count；
- carriage shifts；
- carry events；
- state transitions；
- 人类需要执行的操作步骤。

不是比较“谁更快”，而是比较算法如何被机构表达。

---

## M4 — Curta case study

在已有模拟器基础上做机制级解释。

- [ ] source map：专利/手册/机械计算资料/已有 simulator；
- [ ] setting register；
- [ ] result counter；
- [ ] revolution counter；
- [ ] carriage position；
- [ ] addition/subtraction crank mode；
- [ ] 从 mechanism-core 组合出教学模型。

### 禁止

如果工作退化成“画一个圆柱 UI + `turn()` 函数”，停止并复用已有 Curta simulator。

---

## M5 — Analytical Engine information flow

这里不追求重新写完整 emulator。

重点做一个“信息流剖面”：

```text
cards
  ↓
control / operation
  ↓
Mill ↔ Store
  ↓
printer / curve output
```

- [ ] 对照 John Walker/Fourmilab 与其他 emulator；
- [ ] 标注历史确定性/解释性；
- [ ] 逐步展示一小段 card program 的数据移动；
- [ ] 比较现代 CPU 术语时必须防止简单等同。

---

## M6 — 连续机械计算

后期进入 differential analyzer：

- mechanical integrator；
- shaft rotation as quantity；
- continuous vs discrete representation；
- error accumulation；
- feedback / coupling。

这一阶段可以单独决定是否需要 3D/physics engine。

---

## M7 — 古法反向传播机 / Hand-Crank Backpropagation

这是反事实教学展品，不是历史复原。完整定义见 [`docs/ANCIENT_BACKPROP.md`](docs/ANCIENT_BACKPROP.md)。

推进顺序：

- [ ] `research/backprop-prior-art.md`：核对 2024 mechanical neural network in-situ backpropagation 与其他 physical learning 工作；
- [ ] `backprop-core/`：Stage A 单层线性模型，纯逻辑 + tests；
- [ ] analytic gradient vs finite difference 验证；
- [ ] 把一轮训练拆成可序列化 phase/event；
- [ ] Stage B：2→2→1 chain rule 状态模型；
- [ ] `demos/hand-crank-backprop/`：最后才做浏览器可交互展品；
- [ ] 对比教学机械模型与真实 all-mechanical neural network，不混淆两者。

### M7 验收

用户不需要先看公式，就能通过一次次手摇观察：

```text
forward
→ output
→ error
→ reverse/adjoint signal
→ gradient
→ weight update
→ lower loss
```

同时点击“显示数学”后，每个机械 phase 都能对应到 reference implementation 中的具体量。

必须额外展示一个 learning rate 过大导致 overshoot / oscillation 的实验。

---

## 展示与发布

公开 demo 不依赖个人站仓库；使用每个项目自己的 GitHub Project Pages。隐私与发布边界见 [`docs/PUBLISHING.md`](docs/PUBLISHING.md)。

原则：

```text
GitHub Pages = 展厅
Git repository = 实验室
```

普通访客不应为了看一个进位或反向传播动画先 clone 仓库。

---

## AI 可直接领取的第一批任务

### Task A — 状态模型

读取 README + `docs/PRIOR_ART.md`，设计 `docs/MODEL.md`：只定义 decimal wheel、carry chain、crank phase，不做前端。

### Task B — Visible Carry 最小实现

优先 TypeScript 或 Python 写纯逻辑 + tests；UI 可后补。确保 0099→0100 的两级 carry 可观察。

### Task C — 有限差分教学实验

先写 `research/finite-difference-design.md`：用数学最小模型解释需要哪些列状态，明确哪些来自数学、哪些来自 Babbage 机械设计，再实现。

### Task D — Stepped drum vs pinwheel 查重

先查已有动画/模拟器/机械资料，产出 `research/multiplication-mechanisms.md`，说明两者的可视化增量在哪里，未经查重不写 3D。

### Task E — Existing simulator test bench

把 Difference Engine、Analytical Engine、Curta 的现有 simulator 跑一遍，记录：输入模型、输出模型、是否逐步、是否显示内部状态、许可证、最后维护时间。输出 `research/simulator-matrix.md`。

### Task F — 古法反向传播 Stage A

读取 `docs/ANCIENT_BACKPROP.md`。先做 prior-art review，再实现单层线性 `backprop-core` 与 gradient tests；**禁止直接开始画齿轮 UI**。

## Stop conditions

- 已有 simulator 完整覆盖目标，新增实现只有换 UI；
- 动画先于状态模型，导致无法自动测试；
- 把教学简化写成历史真实机械结构；
- 为追求 3D 效果引入复杂物理引擎但没有新的机制解释；
- 未查原始/博物馆资料就凭现代计算机类比推断机械结构；
- 把已有 mechanical neural network / physical learning 成果改名后当成本项目原创；
- 把普通 JavaScript backprop 套一张齿轮皮肤，就宣称“机械实现”。

这个仓库最终最好能做到：

> 输入一个算式，不只是告诉你答案，而是告诉你**这台机器为了得到这个答案，到底动了什么。**

以及：

> 给它一个误差，不只是告诉你“梯度是多少”，而是让你看见**误差怎样沿着机器一级一级倒着走回去。**
