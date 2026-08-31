import { createCrankTrace, digitsToString, createDecimalRegister, reduceDecimalRegisterEvent } from './mechanism-core';
import { squarePreset, cubicPreset, transitionDifference, type DifferenceState } from './mechanisms/difference-column';
import { compare314x27 } from './exhibits/multiplication-compare';
import { createKeyDrivenAccumulator, createKeyStrokeTrace } from './mechanisms/key-driven-accumulator';
import { sampleFlow } from './exhibits/analytical-engine-flow';
import { createIntegrator, integrate, type IntegratorState } from './mechanisms/continuous-integrator';
import { evaluate, type StageAState } from './backprop/core/stage-a';
import { createPhaseMachine, runPhaseCycle, stepPhase, STAGE_A_PHASES, type PhaseMachineState } from './backprop/core/phase-machine';
import { mapStageA } from './backprop/mechanical-mapping';
import { evidenceBadge, evidencePanel } from './ui/evidence';
import './style.css';

type Locale = 'en' | 'zh';
type Copy = { en: string; zh: string };
const root = document.querySelector('main')!;
const savedLocale = localStorage.getItem('mechanical-locale');
let locale: Locale = savedLocale === 'en' || savedLocale === 'zh' ? savedLocale : navigator.language.startsWith('zh') ? 'zh' : 'en';
const t = (en: string, zh: string) => locale === 'zh' ? zh : en;
const copy = (value: Copy) => t(value.en, value.zh);

let carryTrace = createCrankTrace([9, 9, 0, 0]);
let carryIndex = 0;
let diff: DifferenceState = squarePreset();
let diffPreset = 'n²';
let diffEvents: string[] = [];
let integrator: IntegratorState = createIntegrator(1, 0.1);
let back: StageAState = evaluate({ x1: 2, x2: 3, w1: 0, w2: 0, target: 10, learningRate: 0.01 });
let phaseMachine: PhaseMachineState = createPhaseMachine(back);
let backPreset = 'stable';

const routes: Array<[string, Copy]> = [
  ['/', { en: 'Start here', zh: '从这里开始' }],
  ['/visible-carry', { en: 'Carry', zh: '进位' }],
  ['/finite-difference', { en: 'Differences', zh: '差分' }],
  ['/multiplication', { en: 'Multiplication', zh: '乘法' }],
  ['/curta', { en: 'Curta', zh: 'Curta' }],
  ['/analytical-engine', { en: 'Analytical Engine', zh: '分析机' }],
  ['/continuous', { en: 'Integration', zh: '积分' }],
  ['/hand-crank-backprop', { en: 'Learning', zh: '机器学习' }],
  ['/about', { en: 'About', zh: '关于' }],
];

const carryState = () => carryTrace.events.slice(0, carryIndex).reduce(reduceDecimalRegisterEvent, createDecimalRegister(carryTrace.initialState.digits));
const esc = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const eventName = (name: string) => ({ CRANK_BEGIN: t('crank begins', '曲柄开始'), WHEEL_STEP: t('number wheel moves', '数字轮转动'), CARRY_PENDING: t('carry is waiting', '进位待传递'), CARRY_PROPAGATED: t('carry passes left', '进位向左传递'), CARRY_OUT: t('carry leaves register', '最高位溢出'), CRANK_END: t('crank ends', '曲柄结束') }[name] ?? name);
const eventText = () => carryTrace.events.slice(0, carryIndex).map((event) => `${String(event.sequence).padStart(2, '0')} · ${eventName(event.type)}${event.type === 'WHEEL_STEP' ? ` · ${t('wheel', '第')} ${event.wheel.index + 1}${t('', ' 位')}: ${event.from}→${event.to}` : ''}`).join('\n') || t('No movement yet.', '还没有机械动作。');

function structureCard(title: Copy, body: Copy, level: 'KNOWN' | 'INFERRED' | 'TEACHING' | 'UNKNOWN') {
  return `<div class="structure-card">${evidenceBadge(level, locale)}<h3>${copy(title)}</h3><p>${copy(body)}</p></div>`;
}

function shell(title: Copy, subtitle: Copy, body: string) {
  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
  document.title = `${copy(title)} · ${t('Mechanical Computing Playground', '机械计算游乐场')}`;
  root.innerHTML = `<header class="site-header"><div><p class="eyebrow">${t('MECHANICAL COMPUTING PLAYGROUND', '机械计算游乐场')}</p><h1>${copy(title)}</h1><p class="lede">${copy(subtitle)}</p></div><button class="language" id="language-toggle" type="button">${t('中文', 'English')}</button><nav aria-label="${t('Exhibits', '展品导航')}">${routes.map(([href, label]) => `<a class="${location.hash === `#${href}` || (!location.hash && href === '/') ? 'current' : ''}" href="#${href}">${copy(label)}</a>`).join('')}</nav></header>${body}<footer>${t('Numbers are not magic here: every result comes from visible, testable steps.', '这里的数字不是魔法：每个结果都来自看得见、可测试的步骤。')}<br><small>${t('GRADE D means a teaching model, not a claim of exact historical construction.', '“D 级”表示教学模型，不代表对历史机器结构的精确复原。')}</small></footer>`;
  document.querySelector('#language-toggle')?.addEventListener('click', () => {
    locale = locale === 'en' ? 'zh' : 'en';
    localStorage.setItem('mechanical-locale', locale);
    render();
  });
}

function lesson(why: Copy, watch: Copy, learn: Copy) {
  return `<div class="lesson"><div><span>① ${t('YOUR MISSION', '你的任务')}</span><p>${copy(why)}</p></div><div><span>② ${t('DO THIS NOW', '现在只做这一步')}</span><p>${copy(watch)}</p></div><div><span>③ ${t('YOU WILL DISCOVER', '你会发现')}</span><p>${copy(learn)}</p></div></div>`;
}

function scene(icon: string, modernTitle: Copy, modernText: Copy, oldTitle: Copy, oldText: Copy) {
  return `<div class="scene"><div class="scene-now"><span class="scene-time">${t('YOU, TODAY', '今天的你')}</span><b>${icon} ${copy(modernTitle)}</b><p>${copy(modernText)}</p></div><div class="scene-bridge"><span>⇄</span><small>${t('same problem', '同一个问题')}</small></div><div class="scene-then"><span class="scene-time">${t('BEFORE ELECTRONICS', '没有电子芯片的年代')}</span><b>⚙ ${copy(oldTitle)}</b><p>${copy(oldText)}</p></div></div>`;
}

function overview() {
  shell(
    { en: 'Where did the answer come from?', zh: '计算器按一下就出答案——答案从哪来？' },
    { en: 'Modern calculators hide the work. Mechanical computers let us watch a number being made.', zh: '现代计算器把过程藏起来；机械计算让我们亲眼看到一个数字是怎样被“做”出来的。' },
    `<section class="hero-explainer"><div class="comparison"><div class="machine modern"><span class="machine-label">${t('MODERN CALCULATOR', '现代计算器')}</span><div class="screen">99 + 1</div><div class="mystery">?</div><div class="screen answer">100</div><p>${t('Tap a key. The inside is hidden.', '按一下键，内部过程看不见。')}</p></div><div class="versus">→</div><div class="machine mechanical"><span class="machine-label">${t('MECHANICAL VIEW', '机械视角')}</span><div class="mini-wheels"><i>0</i><i>0</i><i>9</i><i>9</i></div><div class="motion-arrow">↻ → ⚙ → ⚙ →</div><div class="mini-wheels result"><i>0</i><i>1</i><i>0</i><i>0</i></div><p>${t('Turn, carry, turn: every movement is visible.', '转动、进位、再转动：每个动作都看得见。')}</p></div></div></section>
    <section><h2>${t('Do not study it. Pick a familiar job.', '先别学原理。选一个你做过的实际任务。')}</h2><p class="plain">${t('Every room starts with something modern people already do. You get one mission and one button. The old machine is introduced only after the problem makes sense.', '每个展厅都从现代人做过的事情开始。你只会收到一个任务、一个该按的按钮；先明白问题，再认识老机器。')}</p><div class="journey"><a href="#/visible-carry"><b>1</b><span>🛒 ${t('Shop checkout', '超市结账')}</span><small>${t('A total rises from ¥99 to ¥100', '总价从 99 元变成 100 元')}</small></a><a href="#/finite-difference"><b>2</b><span>📦 ${t('Stacking boxes', '堆放纸箱')}</span><small>${t('Predict how many fit in a square display', '预测方阵展示需要多少箱')}</small></a><a href="#/multiplication"><b>3</b><span>🧾 ${t('Bulk order', '批量订货')}</span><small>${t('27 cartons, 314 items each', '27 箱，每箱 314 件')}</small></a><a href="#/hand-crank-backprop"><b>4</b><span>📱 ${t('Auto-brightness', '手机自动亮度')}</span><small>${t('A bad guess learns from your correction', '猜错后根据你的纠正学习')}</small></a></div></section>
    <section><h2>${t('A tiny symbol guide', '先认识这些简单符号')}</h2><div class="symbol-guide"><div><b>↻</b><span>${t('turn a crank', '转动曲柄')}</span></div><div><b>⚙</b><span>${t('a part moves another part', '一个零件带动另一个')}</span></div><div><b>→</b><span>${t('value or motion travels', '数值或动作向前传递')}</span></div><div><b>Δ</b><span>${t('difference between neighbors', '相邻数字之间的差')}</span></div><div><b>∫</b><span>${t('keep accumulating small amounts', '不断累积微小的量')}</span></div><div><b>∂</b><span>${t('how sensitive a result is', '结果对某个量有多敏感')}</span></div></div></section>`
  );
}

function carryDiagram(digits: number[]) {
  const activeIndex = [...carryTrace.events.slice(0, carryIndex)].reverse().find((e) => e.type === 'WHEEL_STEP');
  const active = activeIndex?.type === 'WHEEL_STEP' ? activeIndex.wheel.index : -1;
  return `<div class="carry-machine"><div class="place-labels"><span>${t('thousands', '千位')}</span><span>${t('hundreds', '百位')}</span><span>${t('tens', '十位')}</span><span>${t('ones', '个位')}</span></div><div class="wheels">${digits.map((digit, visualIndex) => { const index = digits.length - 1 - visualIndex; return `<div class="wheel-unit"><span class="wheel ${index === active ? 'active' : ''}">${digit}</span>${visualIndex < digits.length - 1 ? `<i class="carry-arrow">←<small>${t('carry', '进一')}</small></i>` : ''}</div>`; }).join('')}</div></div>`;
}

function visibleCarry() {
  const digits = [...carryState().digits].reverse();
  shell(
    { en: 'Why does 0099 + 1 need several movements?', zh: '为什么 0099 + 1 需要好几个机械动作？' },
    { en: 'A calculator shows 0100 instantly. A machine must physically pass two carries to the left.', zh: '计算器瞬间显示 0100；机械装置却必须把两次进位逐级向左传过去。' },
    `${evidencePanel(locale)}${scene('🛒', { en: 'The checkout total is ¥99', zh: '收银台现在是 99 元' }, { en: 'The cashier scans one ¥1 item. The display instantly becomes ¥100.', zh: '收银员又扫了一件 1 元商品，电子屏瞬间变成 100 元。' }, { en: 'A mechanical cash register must move real wheels', zh: '机械收银机必须真的转动数字轮' }, { en: 'The ones and tens wheels cannot change invisibly; each must roll and push the next wheel.', zh: '个位轮和十位轮不会凭空变化；它们必须依次转动，并推动左边的轮子。' })}${lesson({ en: 'Make this old checkout change ¥99 into ¥100.', zh: '帮这台老式收银机把 99 元变成 100 元。' }, { en: 'Press the orange “Do one movement” button once. Ignore everything else.', zh: '只按一次橙色的“执行一个动作”按钮，其他内容先不用管。' }, { en: 'The first thing that happens is not “100”: the rightmost 9 physically rolls to 0.', zh: '最先发生的不是直接得到 100，而是最右边的 9 真的转成了 0。' })}<section><div class="evidence-grid">${structureCard({ en: 'What we know', zh: '我们确定的事情' }, { en: 'A decimal register must preserve a digit and allow an increment to affect the next place when the digit wraps.', zh: '十进制寄存器必须保存一个数字；当某一位回绕时，增加量必须影响更高位。' }, 'KNOWN')}${structureCard({ en: 'What this picture means', zh: '这张图表示什么' }, { en: 'The ← arrow is a functional carry relation. It is not a claim that a rod runs exactly along the arrow.', zh: '← 箭头表示功能上的进位关系，不表示真的有一根连杆沿着箭头连接。' }, 'INFERRED')}${structureCard({ en: 'What we draw for teaching', zh: '为了教学画出的东西' }, { en: 'The four number wheels and highlighted step are a minimal state model, not a machine cutaway.', zh: '四个数字轮和高亮动作是最小状态模型，不是机器剖面。' }, 'TEACHING')}${structureCard({ en: 'What remains unknown', zh: '仍然不知道的事情' }, { en: 'This page does not establish the exact pawl, ratchet, spring, shaft, or linkage used by a specific historical register.', zh: '本页没有确认某一具体历史寄存器使用的棘爪、棘轮、弹簧、轴或连杆的确切结构。' }, 'UNKNOWN')}</div><div class="equation"><span>0099</span><b>+ 1</b><strong>= ${digitsToString(carryState().digits)}</strong></div>${carryDiagram(digits)}<div class="controls"><button id="carry-step">${t('Do one movement', '执行一个动作')}</button><button id="carry-crank">${t('Show the whole addition', '演示完整加法')}</button><button class="secondary" id="carry-reset">${t('Start again', '重新开始')}</button></div><div class="progress"><i style="width:${carryIndex / carryTrace.events.length * 100}%"></i></div><p class="status">${t('Movement', '动作')} ${carryIndex} / ${carryTrace.events.length}</p><details open><summary>${t('Movement log in plain language', '用白话记录每个动作')}</summary><pre>${esc(eventText())}</pre></details></section>`
  );
  document.querySelector('#carry-step')?.addEventListener('click', () => { carryIndex = Math.min(carryIndex + 1, carryTrace.events.length); visibleCarry(); });
  document.querySelector('#carry-crank')?.addEventListener('click', () => { carryIndex = carryTrace.events.length; visibleCarry(); });
  document.querySelector('#carry-reset')?.addEventListener('click', () => { carryIndex = 0; visibleCarry(); });
}

function finiteDifference() {
  const bars = diff.output.slice(-8).map((value, index, values) => `<i style="height:${Math.max(8, value / Math.max(...values, 1) * 100)}%"><span>${value}</span></i>`).join('');
  shell(
    { en: 'Can a machine make square numbers using only addition?', zh: '一台只会加法的机器，能生成平方数吗？' },
    { en: 'Yes. Differences turn a difficult-looking pattern into a repeated recipe.', zh: '可以。有限差分能把看似复杂的规律，变成反复执行的加法步骤。' },
    `${evidencePanel(locale)}${scene('📦', { en: 'You build square shop displays', zh: '你要搭正方形商品展台' }, { en: 'A 1×1 display needs 1 box, 2×2 needs 4, 3×3 needs 9. You must predict the next sizes.', zh: '1×1 需要 1 箱，2×2 需要 4 箱，3×3 需要 9 箱。你要继续预测后面的用量。' }, { en: 'A table-making machine prepares printed reference books', zh: '制表机器要编印查询手册' }, { en: 'Before spreadsheets, engineers and navigators needed long accurate tables. A Difference Engine automated recurring additions.', zh: '电子表格出现前，工程师和航海者需要大量准确表格；差分机用重复加法自动制表。' })}${lesson({ en: 'Produce the next square-display size.', zh: '算出下一个正方形展台需要多少箱。' }, { en: 'Press “Turn crank once” exactly once, then look only at “Numbers produced”.', zh: '只按一次“转动曲柄一次”，然后只看“已经生成”。' }, { en: 'The machine reaches the next square number without pressing ×; it reuses how much the sequence grew last time.', zh: '机器没有按乘号，却得到了下一个平方数；它重复利用了数列上一次增长了多少。' })}<section><div class="structure-callout">${evidenceBadge('TEACHING', locale)} ${t('This column diagram shows a mathematical update order, not the actual shaft-and-gear layout of a Difference Engine.', '这个列图展示的是数学更新顺序，不是差分机真实的轴、齿轮与连杆布局。')}</div><div class="formula-story"><div><small>${t('numbers we want', '想要的数字')}</small><b>0, 1, 4, 9, 16…</b></div><span>↓ ${t('difference', '相邻相减')}</span><div><small>${t('first differences', '一阶差分')}</small><b>1, 3, 5, 7…</b></div><span>↓ ${t('difference again', '再相减')}</span><div class="constant"><small>${t('second difference', '二阶差分')}</small><b>2, 2, 2, 2…</b></div></div><div class="bar-chart">${bars}</div><div class="state-grid">${diff.columns.map((value, order) => `<div><small>${order === 0 ? t('output now', '当前输出') : `Δ${order}`}</small><strong>${value}</strong><span>${order === diff.columns.length - 1 ? t('stays constant', '保持不变') : t('receives the number on its right', '接收右边的数字')}</span></div>`).join('')}</div><p><b>${t('Numbers produced:', '已经生成：')}</b> ${diff.output.join(' → ')}</p><p><b>${t('This crank did:', '这一轮执行：')}</b> ${diffEvents.join('，') || t('nothing yet', '尚未转动')}</p><div class="controls"><button id="diff-step">↻ ${t('Turn crank once', '转动曲柄一次')}</button><button class="secondary" id="diff-square">${t('Square-number preset', '平方数预设')}</button><button class="secondary" id="diff-cubic">${t('Cube-number preset', '立方数预设')}</button></div></section>`
  );
  document.querySelector('#diff-step')?.addEventListener('click', () => { const crank = transitionDifference(diff); diff = crank.after; diffEvents = crank.events.map((event) => `Δ${event.sourceOrder} → Δ${event.targetOrder}`); finiteDifference(); });
  document.querySelector('#diff-square')?.addEventListener('click', () => { diff = squarePreset(); diffPreset = 'n²'; diffEvents = []; finiteDifference(); });
  document.querySelector('#diff-cubic')?.addEventListener('click', () => { diff = cubicPreset(); diffPreset = 'n³'; diffEvents = []; finiteDifference(); });
}

function multiplication() {
  const result = compare314x27();
  shell(
    { en: 'What does “× 27” mean to a machine?', zh: '对一台机械来说，“× 27”到底意味着什么？' },
    { en: 'Multiplication becomes additions, crank turns, and a shift to the tens place.', zh: '乘法会被拆成加法、曲柄转动，以及向十位的移位。' },
    `${evidencePanel(locale)}${scene('🧾', { en: 'A warehouse receives a bulk order', zh: '仓库收到一张批量订单' }, { en: 'There are 27 cartons with 314 screws in each. Your phone says 8,478 immediately.', zh: '一共 27 箱，每箱 314 颗螺丝。手机立刻给出 8,478。' }, { en: 'A clerk uses a hand-cranked calculator', zh: '过去的职员使用手摇计算机' }, { en: 'The clerk cannot press ×. They perform 7 turns in the ones place, shift the carriage, then 2 turns in the tens place.', zh: '职员没有乘号可按：先在个位转 7 次，移动位架，再在十位转 2 次。' })}${lesson({ en: 'Check the warehouse total: 27 cartons × 314 screws.', zh: '核对订单总数：27 箱 × 每箱 314 颗。' }, { en: 'First read only the line “27 = 7×1 + 2×10”.', zh: '先只看“27 = 7×1 + 2×10”这一行。' }, { en: 'A multi-digit multiplication is two smaller jobs: handle 7 ones, then handle 2 tens after shifting place value.', zh: '多位数乘法其实是两个小任务：先处理 7 个一，再移位处理 2 个十。' })}<section><div class="structure-callout">${evidenceBadge('TEACHING', locale)} ${t('These lanes compare operation recipes. They are not cross-sections of stepped drums or pinwheels.', '这些轨道比较的是操作步骤，不是阶梯鼓轮或拨轮的内部剖面。')}</div><div class="equation"><span>314 × 27</span><strong>= ${result.value}</strong></div><div class="place-decomposition"><div>27</div><span>=</span><b>7 × 1</b><span>+</span><b>2 × 10</b></div><div class="mechanism-lanes"><div><h3>${t('Repeated addition', '重复加法')}</h3><div class="motion">${Array.from({ length: 7 }, () => '<i>+</i>').join('')}<em>… ×27</em></div><p>${t('Add 314 twenty-seven times.', '把 314 连加 27 次。')}</p></div><div><h3>${t('Stepped drum', '阶梯鼓轮')}</h3><div class="drum" aria-label="stepped drum">▂▄▆█ <b>↻</b></div><p>${t('A selected depth exposes a chosen number of steps.', '用选择的深度决定有多少级台阶参与啮合。')}</p></div><div><h3>${t('Pinwheel', '拨轮')}</h3><div class="pinwheel" aria-label="pinwheel">${Array.from({ length: 10 }, (_, i) => `<i class="${i < 7 ? 'on' : ''}">•</i>`).join('')}</div><p>${t('Expose 7 pins, then shift the carriage for 2 tens.', '先露出 7 根销齿，再移动位架处理 2 个十。')}</p></div><div><h3>${t('Direct multiplication', '直接乘法')}</h3><div class="motion"><b>7 → 2198</b><em>1 cycle</em></div><p>${t('Select the pre-encoded 7× multiple in one cycle; shift, then select 2× in one cycle.', '一个周期选择预编码的 7 倍数；移位后，再用一个周期选择 2 倍数。')}</p></div></div><div class="shift-demo"><span>314 × 7 = 2198</span><b>+</b><span class="shifted">314 × 2 × <mark>10</mark> = 6280</span><b>= 8478</b></div><p class="model-note">${t(`Direct path: ${result.directMultiplication.operationCycles} selection/operation cycles, ${result.directMultiplication.carriageShifts} carriage shift. The multiplier digit selects a multiple in the machine/control model instead of asking the operator for 27 repeated additions. Claim P: Steiger/Millionaire-informed functional model, not historical geometry.`, `直接乘法路径：${result.directMultiplication.operationCycles} 个选择/运算周期，${result.directMultiplication.carriageShifts} 次位架移位。乘数位在机器/控制模型中选择相应倍数，而不是让操作者重复加 27 次。声明类型 P：受 Steiger/Millionaire 研究启发的功能模型，不是历史几何复原。`)}</p><details><summary>${t('Direct-multiplication state/events', '直接乘法状态/事件')}</summary><pre>${result.directMultiplication.trace.events.map((event) => JSON.stringify(event)).join('\n')}</pre></details></section>`
  );
}

function curta() {
  shell(
    { en: 'A calculator you operate like a tiny machine tool', zh: '像操作微型机床一样使用计算器' },
    { en: 'Curta compresses number setting, repeated transfer, place shift, and counters into one hand-held cylinder.', zh: 'Curta 把数字设定、重复传递、位值移动和计数器压缩进一个手持圆筒。' },
    `${lesson({ en: 'It shows that calculation can be a physical procedure performed by your hands.', zh: '它说明计算可以是一套由双手执行的物理流程。' }, { en: 'Follow the path from setting sliders, through the crank, to two counters.', zh: '沿着设定滑块、曲柄、两个计数器的路径看。' }, { en: 'The human and machine share the algorithm: you choose shifts and turns; the mechanism handles transfer and carry.', zh: '人与机器共同完成算法：人决定移位和转数，机构负责传递与进位。' })}<section><div class="curta-diagram"><div class="curta-knob">↻<small>${t('crank', '曲柄')}</small></div><div class="curta-body"><div><span>${t('setting sliders', '设定滑块')}</span><b>3 1 4</b></div><div class="gear-stream">↓ ⚙ ↓ ⚙ ↓</div><div><span>${t('result counter', '结果计数器')}</span><b>8 4 7 8</b></div><div><span>${t('turn counter', '转数计数器')}</span><b>2 7</b></div></div><div class="curta-carriage">↔ <small>${t('shift place value', '移动十进制位值')}</small></div></div><ol class="human-steps"><li>${t('Set 314 on the sliders.', '用滑块设定 314。')}</li><li>${t('Turn 7 times at the ones position.', '在个位位置转动 7 次。')}</li><li>${t('Shift one decimal place.', '向十位移动一格。')}</li><li>${t('Turn 2 times; read 8478.', '再转动 2 次，读出 8478。')}</li></ol><p class="model-note">${t('Operational teaching model (Grade D), not a complete Curta emulator.', '这是操作教学模型（D 级），不是完整的 Curta 模拟器。')}</p></section>`
  );
}

function analytical() {
  const labels: Record<string, Copy> = {
    CARD_READ: { en: 'Read a punched card', zh: '读取打孔卡' }, CONTROL_DISPATCH: { en: 'Choose the operation', zh: '决定执行什么操作' }, STORE_TO_MILL: { en: 'Move a number to the Mill', zh: '把数字送入运算部件' }, MILL_TO_STORE: { en: 'Return the result to the Store', zh: '把结果送回存储部件' }, OUTPUT: { en: 'Print the answer', zh: '打印答案' },
  };
  shell(
    { en: 'How can cards control a general-purpose machine?', zh: '打孔卡怎样控制一台通用计算机器？' },
    { en: 'The Analytical Engine separates instructions, stored numbers, arithmetic, and output.', zh: '分析机把指令、存储的数字、算术运算和输出分成不同部分。' },
    `${lesson({ en: 'This is an early, striking example of information moving through specialized machine parts.', zh: '这是“信息在不同专用部件之间流动”的早期代表性构想。' }, { en: 'Follow one card from left to right; watch numbers travel Store ↔ Mill.', zh: '从左到右跟随一张卡片，并观察数字怎样在 Store 与 Mill 之间往返。' }, { en: 'Program, memory, arithmetic, and output can be physically separated—though modern CPU terms are only analogies.', zh: '程序、存储、运算和输出可以在物理上分开；但现代 CPU 术语在这里仅是类比。' })}<section><div class="flow-diagram"><div>▤<b>${t('Cards', '打孔卡')}</b><small>${t('instructions', '指令')}</small></div><span>→</span><div>⚙<b>${t('Control', '控制')}</b><small>${t('what next?', '下一步做什么？')}</small></div><span>→</span><div class="double"><i>▦<b>Store</b><small>${t('holds numbers', '保存数字')}</small></i><strong>↔</strong><i>⚙<b>Mill</b><small>${t('does arithmetic', '执行算术')}</small></i></div><span>→</span><div>▧<b>${t('Output', '输出')}</b><small>${t('print', '打印')}</small></div></div><ol class="timeline">${sampleFlow.map((event, index) => `<li><b>${index + 1}</b><span><strong>${copy(labels[event.phase])}</strong><small>${t(event.detail, { 'operation card selected': '选中操作卡', 'control directs the operation': '控制机构安排操作', 'operand enters Mill': '操作数进入 Mill', 'result returns to Store': '结果返回 Store', 'printer/output channel receives value': '打印/输出机构接收结果' }[event.detail] ?? event.detail)}</small></span></li>`).join('')}</ol><p class="model-note">${t('“CPU” and “memory” are helpful modern analogies, not historical identity.', '“CPU”和“内存”是帮助理解的现代类比，不代表二者在历史结构上完全相同。')}</p></section>`
  );
}

function continuous() {
  const points = Array.from({ length: 11 }, (_, index) => `${index * 34},${110 - index * integrator.input * 8}`).join(' ');
  shell(
    { en: 'What if a number is an angle, not a row of digits?', zh: '如果“数字”不是一排数码，而是一根轴的转角呢？' },
    { en: 'A differential analyzer computes with continuously rotating shafts and mechanical integration.', zh: '微分分析机用连续转动的轴表示数值，并通过机械积分进行计算。' },
    `${lesson({ en: 'Not all computers count discrete steps; some represent changing quantities continuously.', zh: '并非所有计算机都按离散步骤计数；有些机器用连续变化的物理量表示数字。' }, { en: 'Each click adds one small rectangle: input × time step.', zh: '每点一次，就累加一个小矩形：输入量 × 时间步长。' }, { en: 'Integration means accumulating many tiny contributions over time.', zh: '积分可以直观理解为：把许多微小贡献随时间不断累加。' })}<section><div class="integrator-layout"><div class="shaft"><span>↻</span><b>${t('input shaft', '输入轴')}</b><small>${t('speed/angle represents', '转速/角度表示')} ${integrator.input}</small></div><div class="integral-sign">∫</div><div class="shaft output"><span>${integrator.output.toFixed(2)}</span><b>${t('accumulated output', '累计输出')}</b><small>${t('after time', '经过时间')} ${integrator.time.toFixed(1)}</small></div></div><svg class="integral-chart" viewBox="0 0 340 120" role="img" aria-label="${t('Accumulation graph', '累积曲线图')}"><line x1="0" y1="110" x2="340" y2="110"/><line x1="0" y1="0" x2="0" y2="110"/><polyline points="${points}"/><text x="260" y="104">${t('time →', '时间 →')}</text></svg><div class="controls"><button id="integrate">+ ${t('Add one small time slice', '累加一个小时间片')}</button><button class="secondary" id="integrate-reset">${t('Start again', '重新开始')}</button></div><p class="plain">${t(`Current calculation: ${integrator.output.toFixed(2)} + ${integrator.input} × ${integrator.step} = ${(integrator.output + integrator.input * integrator.step).toFixed(2)}`, `当前计算：${integrator.output.toFixed(2)} + ${integrator.input} × ${integrator.step} = ${(integrator.output + integrator.input * integrator.step).toFixed(2)}`)}</p><p class="model-note">${t('Grade-D Euler teaching model. A real differential analyzer uses coupled mechanical integrators.', '这是 D 级 Euler 教学模型；真实微分分析机使用相互耦合的机械积分器。')}</p></section>`
  );
  document.querySelector('#integrate')?.addEventListener('click', () => { integrator = integrate(integrator); continuous(); });
  document.querySelector('#integrate-reset')?.addEventListener('click', () => { integrator = createIntegrator(1, 0.1); continuous(); });
}

function backprop() {
  const state = phaseMachine.state;
  const mapping = mapStageA(state);
  const phase = STAGE_A_PHASES[phaseMachine.phaseIndex] ?? 'READY';
  const phaseLabels: Record<string, Copy> = { LOAD_INPUT: { en: 'load examples', zh: '装入样本' }, FORWARD_MULTIPLY: { en: 'multiply inputs and weights', zh: '输入与权重相乘' }, FORWARD_ACCUMULATE: { en: 'add into an answer', zh: '累加得到答案' }, READ_OUTPUT: { en: 'read the guess', zh: '读取猜测结果' }, SET_TARGET: { en: 'show the correct target', zh: '给出正确目标' }, LOSS_COMPARE: { en: 'measure the error', zh: '测量误差' }, BACKPROP_OUTPUT: { en: 'send blame backward', zh: '把误差信号向后传' }, GRADIENT_READY: { en: 'read adjustment directions', zh: '读出调整方向' }, LEARNING_RATE_SCALE: { en: 'limit adjustment size', zh: '限制调整幅度' }, WEIGHT_UPDATE: { en: 'move the weight dials', zh: '移动权重旋钮' }, READY: { en: 'ready for another turn', zh: '可以开始下一轮' } };
  shell(
    { en: 'How does a machine learn from a wrong answer?', zh: '机器答错以后，究竟怎样“学习”？' },
    { en: 'It makes a guess, measures the error, sends responsibility backward, then adjusts its dials.', zh: '它先猜一个答案、测量误差、把责任向后传，再调整内部旋钮。' },
    `${evidencePanel(locale)}${scene('📱', { en: 'Your phone guesses the screen brightness', zh: '手机正在猜屏幕该有多亮' }, { en: 'It sets brightness to 0, but you wanted 10. You drag the slider to correct it.', zh: '它把亮度设成 0，但你想要 10，于是你拖动滑杆纠正它。' }, { en: 'Imagine the correction controls are physical dials', zh: '设想负责修正的是一组机械旋钮' }, { en: 'The machine compares “guessed 0” with “wanted 10”, sends the error backward, and turns its internal dials a little.', zh: '机器比较“猜成 0”和“希望是 10”，把误差向后传，再把内部旋钮调一点。' })}${lesson({ en: 'Teach the brightness controller to get closer to 10.', zh: '教这个亮度控制器，让它的猜测更接近 10。' }, { en: 'Press only “Complete one lesson” once. Then compare “machine guess” and “wrongness”.', zh: '只按一次“完成一轮学习”，然后比较“机器猜测”和“错误程度”。' }, { en: 'Learning means making a guess, seeing how wrong it was, and changing settings so the next guess is less wrong.', zh: '学习就是：先猜、再看错了多少、然后改设置，让下一次少错一点。' })}<section><div class="structure-callout">${evidenceBadge('TEACHING', locale)} ${t('The arrows show numerical influence during learning. They are not a claim that a historical machine used these exact gears or shafts.', '箭头表示学习过程中数值如何相互影响，不表示历史机器使用过这些确切齿轮或轴。')}</div><div class="learning-loop"><div class="node"><small>x₁=${state.x1}, x₂=${state.x2}</small><b>${t('example', '输入样本')}</b></div><span class="forward">→ × ${state.w1.toFixed(2)}, ${state.w2.toFixed(2)} →</span><div class="node output-node"><small>${state.output.toFixed(2)}</small><b>${t('machine guess', '机器猜测')}</b></div><span class="compare">⇄</span><div class="node target-node"><small>${state.target}</small><b>${t('correct answer', '正确答案')}</b></div><div class="backward">← ${t('error travels backward', '误差向后传递')} · ${mapping.errorShaft.toFixed(2)} ←</div></div><div class="phase-banner"><small>${t('CURRENT STEP', '当前步骤')}</small><strong>${copy(phaseLabels[phase])}</strong></div><div class="state-grid"><div><small>${t('wrongness (loss)', '错误程度（损失）')}</small><strong>${state.loss.toFixed(3)}</strong><span>${t('smaller is better', '越小越好')}</span></div><div><small>${t('dial 1 direction', '旋钮 1 调整方向')}</small><strong>${mapping.gradientShafts[0].toFixed(2)}</strong><span>∂L/∂w₁</span></div><div><small>${t('dial 2 direction', '旋钮 2 调整方向')}</small><strong>${mapping.gradientShafts[1].toFixed(2)}</strong><span>∂L/∂w₂</span></div><div><small>${t('adjustment limiter', '调整幅度限制')}</small><strong>${state.learningRate}</strong><span>${t('learning rate', '学习率')}</span></div></div><div class="controls"><button id="back-step">↻ ${t('Move one learning step', '推进一个学习步骤')}</button><button id="back-cycle">${t('Complete one lesson', '完成一轮学习')}</button><button id="back-many">${t('Learn 8 times', '连续学习 8 次')}</button><button class="danger" id="back-overshoot">${t('Try turning too far', '试试用力过猛')}</button><button class="secondary" id="back-reset">${t('Reset', '重置')}</button></div><p>${t('Preset:', '当前预设：')} <b>${backPreset === 'stable' ? t('careful adjustments', '谨慎调整') : t('overshoot: adjustments are too large', '过冲：每次调整过大')}</b></p><details><summary>${t('Show the exact mathematics and phase log', '显示精确数学和步骤日志')}</summary><p>y = w₁x₁ + w₂x₂ · loss = ½(y − target)²</p><pre>${phaseMachine.events.map((event) => copy(phaseLabels[event.phase])).join('\n') || t('No step yet.', '尚未开始。')}</pre></details><p class="model-note">${t('Counterfactual Grade-D teaching machine. Real mechanical-learning research exists, but this hand-crank interface is not a historical reconstruction.', '这是反事实的 D 级教学机器。现实中确有机械学习研究，但这个手摇界面不是历史复原。')}</p></section>`
  );
  document.querySelector('#back-step')?.addEventListener('click', () => { phaseMachine = stepPhase(phaseMachine); backprop(); });
  document.querySelector('#back-cycle')?.addEventListener('click', () => { phaseMachine = runPhaseCycle(phaseMachine); backprop(); });
  document.querySelector('#back-many')?.addEventListener('click', () => { for (let i = 0; i < 8; i += 1) phaseMachine = runPhaseCycle(phaseMachine); backprop(); });
  document.querySelector('#back-overshoot')?.addEventListener('click', () => { backPreset = 'overshoot'; back = evaluate({ x1: 1, x2: 1, w1: 0, w2: 0, target: 1, learningRate: 1.1 }); phaseMachine = createPhaseMachine(back); backprop(); });
  document.querySelector('#back-reset')?.addEventListener('click', () => { backPreset = 'stable'; back = evaluate({ x1: 2, x2: 3, w1: 0, w2: 0, target: 10, learningRate: 0.01 }); phaseMachine = createPhaseMachine(back); backprop(); });
}

function about() {
  const keySeven = createKeyStrokeTrace(createKeyDrivenAccumulator(3), 0, 7, 'teaching-key-7');
  shell(
    { en: 'What this playground promises', zh: '这个游乐场向你保证什么' },
    { en: 'Understand the movement before admiring the machine.', zh: '先理解动作，再欣赏机器。' },
    `<section><div class="promise-grid"><div><b>👁</b><h2>${t('Visible', '看得见')}</h2><p>${t('Important state is shown in text and diagrams, not hidden in animation.', '重要状态会用文字和图示呈现，不藏在动画里。')}</p></div><div><b>↻</b><h2>${t('Stepable', '可以单步')}</h2><p>${t('You can stop after each mechanical or learning action.', '你可以在每个机械动作或学习步骤后停下来。')}</p></div><div><b>✓</b><h2>${t('Tested', '经过测试')}</h2><p>${t('The displayed result comes from deterministic core logic and replayable events.', '显示结果来自确定性核心逻辑和可重放事件。')}</p></div><div><b>⚖</b><h2>${t('Historically honest', '尊重史实')}</h2><p>${t('Teaching simplifications are marked Grade D and never presented as exact reconstruction.', '教学简化会标记为 D 级，不冒充精确历史复原。')}</p></div></div><h2>${t('Suggested path for a first visit', '第一次参观的推荐路线')}</h2><ol class="human-steps"><li><a href="#/visible-carry">${t('Carry: discover that 99 + 1 is several movements.', '进位：发现 99 + 1 其实包含多个动作。')}</a></li><li><a href="#/finite-difference">${t('Differences: make squares using only addition.', '差分：只用加法生成平方数。')}</a></li><li><a href="#/multiplication">${t('Multiplication: replace × with cranks and shifts.', '乘法：把 × 换成曲柄和移位。')}</a></li><li><a href="#/hand-crank-backprop">${t('Learning: watch error change internal settings.', '机器学习：看误差怎样改变内部参数。')}</a></li></ol><h2>${t('Two human-operation protocols', '两种人机操作协议')}</h2><div class="comparison"><div class="machine"><b>${t('Lever / crank', '拨杆 / 曲柄')}</b><p>SET_VALUE → CRANK → ACCUMULATE</p><small>${t('Setting and arithmetic request are separate actions.', '设值与发出运算请求是两个动作。')}</small></div><div class="versus">≠</div><div class="machine"><b>${t('Key-driven', '按键驱动')}</b><p>KEY_STROKE → ACCUMULATE</p><small>${t('The human keypress itself is the arithmetic operation cycle.', '人的按键动作本身就是算术运算周期。')}</small></div></div><p class="model-note">${t('Claim P/M: this generic key-driven accumulator is informed by Comptometer history, but it is not a reconstruction of any particular Comptometer model. Carries are serialized for inspection.', '声明 P/M：这个通用按键累加器受 Comptometer 历史启发，但不是任何特定 Comptometer 型号的复原。进位按教学模型串行展示。')}</p><details><summary>${t('Inspect units-key 7 state/events', '查看个位键 7 的状态/事件')}</summary><pre>${keySeven.events.map((event) => JSON.stringify(event)).join('\n')}</pre></details></section>`
  );
}

function render() {
  const path = location.hash.slice(1) || '/';
  if (path === '/visible-carry') visibleCarry();
  else if (path === '/finite-difference') finiteDifference();
  else if (path === '/multiplication') multiplication();
  else if (path === '/curta') curta();
  else if (path === '/analytical-engine') analytical();
  else if (path === '/continuous') continuous();
  else if (path === '/hand-crank-backprop') backprop();
  else if (path === '/about') about();
  else overview();
}

addEventListener('hashchange', render);
addEventListener('keydown', (event) => {
  if (event.key === ' ' && location.hash === '#/visible-carry') {
    event.preventDefault();
    carryIndex = Math.min(carryIndex + 1, carryTrace.events.length);
    visibleCarry();
  }
});
render();
