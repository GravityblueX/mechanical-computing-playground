import { createCrankTrace, digitsToString, createDecimalRegister, reduceDecimalRegisterEvent } from './mechanism-core';
import { squarePreset, cubicPreset, transitionDifference, type DifferenceState } from './mechanisms/difference-column';
import { compare314x27 } from './exhibits/multiplication-compare';
import { createKeyDrivenAccumulator, createKeyStrokeTrace } from './mechanisms/key-driven-accumulator';
import { reduceDirectMultiplierEvent, type DirectMultiplierEvent } from './mechanisms/direct-multiplier';
import { quotientValue, reduceDivisionEvent, traceOperatorDivision, type DivisionEvent } from './mechanisms/operator-division';
import { createSettingCrankInterlock, transitionInterlock, type InterlockEvent, type SettingCrankInterlockState } from './mechanisms/setting-crank-interlock';
import { createAnalyticalFlowTrace, stateAtAnalyticalEvent, type AnalyticalFlowEvent } from './exhibits/analytical-engine-flow';
import { createContinuousFlowTrace, stateAtContinuousEvent, type ContinuousFlowEvent } from './exhibits/continuous-flow';
import { createDifferenceOutputTrace, stateAtDifferenceOutputEvent, type DifferenceOutputTrace } from './exhibits/difference-output-flow';
import { CONTROL_EVIDENCE_PROFILES } from './exhibits/control-provenance';
import { CARRY_EVIDENCE_PROFILES } from './exhibits/carry-provenance';
import { createRotaryCarryScheduleTrace } from './mechanisms/rotary-carry-schedule';
import { OUTPUT_CONTRACT_PROFILES } from './exhibits/output-contracts';
import { PRINTING_LEDGER_PRESET, reducePrintingLedgerEvent, tracePrintingLedger, type PrintingLedgerEvent } from './mechanisms/printing-ledger';
import { evaluate, type StageAState } from './backprop/core/stage-a';
import { createPhaseMachine, runPhaseCycle, stepPhase, STAGE_A_PHASES, type PhaseMachineState } from './backprop/core/phase-machine';
import { mapStageA } from './backprop/mechanical-mapping';
import { evidenceBadge, evidencePanel } from './ui/evidence';
import './style.css';
import './direct-multiplier.css';

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
let differenceOutputTrace: DifferenceOutputTrace = createDifferenceOutputTrace(diff);
let differenceOutputIndex = 0;
let differenceKeyboardBound = false;
let directEventIndex = 0;
const divisionTrace = traceOperatorDivision(8478, 314, 1);
let divisionEventIndex = 0;
let controlState: SettingCrankInterlockState = createSettingCrankInterlock(314);
let controlEvents: InterlockEvent[] = [];
let controlMessage = '';
let controlCycle = 0;
const analyticalTrace = createAnalyticalFlowTrace();
let analyticalEventIndex = 0;
let analyticalKeyboardBound = false;
let continuousTrace = createContinuousFlowTrace();
let continuousEventIndex = 0;
let continuousKeyboardBound = false;
const printingLedgerTrace = tracePrintingLedger(PRINTING_LEDGER_PRESET);
let printingLedgerIndex = 0;
let outputKeyboardBound = false;
let back: StageAState = evaluate({ x1: 2, x2: 3, w1: 0, w2: 0, target: 10, learningRate: 0.01 });
let phaseMachine: PhaseMachineState = createPhaseMachine(back);
let backPreset = 'stable';

const routes: Array<[string, Copy]> = [
  ['/', { en: 'Start here', zh: '从这里开始' }],
  ['/visible-carry', { en: 'Carry', zh: '进位' }],
  ['/finite-difference', { en: 'Differences', zh: '差分' }],
  ['/multiplication', { en: 'Multiplication', zh: '乘法' }],
  ['/division', { en: 'Division', zh: '除法' }],
  ['/controls', { en: 'Controls', zh: '互锁' }],
  ['/output-contracts', { en: 'Output', zh: '输出' }],
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
    <section><h2>${t('Do not study it. Pick a familiar job.', '先别学原理。选一个你做过的实际任务。')}</h2><p class="plain">${t('Every room starts with something modern people already do. You get one mission and one button. The old machine is introduced only after the problem makes sense.', '每个展厅都从现代人做过的事情开始。你只会收到一个任务、一个该按的按钮；先明白问题，再认识老机器。')}</p><div class="journey"><a href="#/visible-carry"><b>1</b><span>🛒 ${t('Shop checkout', '超市结账')}</span><small>${t('A total rises from ¥99 to ¥100', '总价从 99 元变成 100 元')}</small></a><a href="#/finite-difference"><b>2</b><span>📦 ${t('Stacking boxes', '堆放纸箱')}</span><small>${t('Predict how many fit in a square display', '预测方阵展示需要多少箱')}</small></a><a href="#/multiplication"><b>3</b><span>🧾 ${t('Bulk order', '批量订货')}</span><small>${t('27 cartons, 314 items each', '27 箱，每箱 314 件')}</small></a><a href="#/division"><b>4</b><span>➗ ${t('Share a stock count', '分配库存')}</span><small>${t('Build 8478 ÷ 314 by operator steps', '用操作步骤做出 8478 ÷ 314')}</small></a><a href="#/controls"><b>5</b><span>🔒 ${t('Protect one cycle', '保护一次运算')}</span><small>${t('See why setting locks during a crank', '观察曲柄运转时为何锁住设定')}</small></a><a href="#/hand-crank-backprop"><b>6</b><span>📱 ${t('Auto-brightness', '手机自动亮度')}</span><small>${t('A bad guess learns from your correction', '猜错后根据你的纠正学习')}</small></a></div></section>
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
  const profileCard = (profile: (typeof CARRY_EVIDENCE_PROFILES)[number]) => `<details><summary><b>${copy(profile.family)}</b> · ${profile.dateOrModel} · ${profile.claimType}/${profile.evidenceStrength}</summary><p><a href="${profile.sourceUrl}" target="_blank" rel="noreferrer">${esc(profile.sourceLabel)}</a></p><b>${t('Documented carry responsibility', '资料支持的进位责任')}</b><ul>${profile.documentedRoles.map(item => `<li>${copy(item)}</li>`).join('')}</ul><p><b>${t('Operator implication:', '对操作者意味着：')}</b> ${copy(profile.operatorImplication)}</p><b>${t('Not established', '未确认')}</b><ul>${profile.notEstablished.map(item => `<li>${copy(item)}</li>`).join('')}</ul></details>`;
  const rotaryIds = new Set(['odhner-us514725', 'odhner-us1377269', 'talamini-marchant-us1867603']);
  const thomasIds = new Set(['thomas-1820-patent', 'thomas-1820-smithsonian', 'thomas-1865', 'thomas-de-bojano-1880', 'thomas-1880-revision-history']);
  const carryProfiles = CARRY_EVIDENCE_PROFILES.filter(profile => !rotaryIds.has(profile.id) && !thomasIds.has(profile.id)).map(profileCard).join('');
  const rotaryProfiles = CARRY_EVIDENCE_PROFILES.filter(profile => rotaryIds.has(profile.id)).map(profileCard).join('');
  const thomasProfiles = CARRY_EVIDENCE_PROFILES.filter(profile => thomasIds.has(profile.id)).map(profileCard).join('');
  const rotaryTrace = createRotaryCarryScheduleTrace(4, 3, 'visible-ordinal-carry');
  const rotarySchedule = rotaryTrace.events.filter(event => event.type === 'TRANSFER_OPPORTUNITY').map(event => event.type === 'TRANSFER_OPPORTUNITY' ? `<li><b>${t('slot', '序数槽')} ${event.slot}</b>: ${t('order', '第')} ${event.sourceOrder} → ${t('order', '第')} ${event.targetOrder}</li>` : '').join('');
  shell(
    { en: 'Why does 0099 + 1 need several movements?', zh: '为什么 0099 + 1 需要好几个机械动作？' },
    { en: 'A calculator shows 0100 instantly. A machine must physically pass two carries to the left.', zh: '计算器瞬间显示 0100；机械装置却必须把两次进位逐级向左传过去。' },
    `${evidencePanel(locale)}${scene('🛒', { en: 'The checkout total is ¥99', zh: '收银台现在是 99 元' }, { en: 'The cashier scans one ¥1 item. The display instantly becomes ¥100.', zh: '收银员又扫了一件 1 元商品，电子屏瞬间变成 100 元。' }, { en: 'A mechanical cash register must move real wheels', zh: '机械收银机必须真的转动数字轮' }, { en: 'The ones and tens wheels cannot change invisibly; each must roll and push the next wheel.', zh: '个位轮和十位轮不会凭空变化；它们必须依次转动，并推动左边的轮子。' })}${lesson({ en: 'Make this old checkout change ¥99 into ¥100.', zh: '帮这台老式收银机把 99 元变成 100 元。' }, { en: 'Press the orange “Do one movement” button once. Ignore everything else.', zh: '只按一次橙色的“执行一个动作”按钮，其他内容先不用管。' }, { en: 'The first thing that happens is not “100”: the rightmost 9 physically rolls to 0.', zh: '最先发生的不是直接得到 100，而是最右边的 9 真的转成了 0。' })}<section><div class="evidence-grid">${structureCard({ en: 'What we know', zh: '我们确定的事情' }, { en: 'A decimal register must preserve a digit and allow an increment to affect the next place when the digit wraps.', zh: '十进制寄存器必须保存一个数字；当某一位回绕时，增加量必须影响更高位。' }, 'KNOWN')}${structureCard({ en: 'What this picture means', zh: '这张图表示什么' }, { en: 'The ← arrow is a functional carry relation. It is not a claim that a rod runs exactly along the arrow.', zh: '← 箭头表示功能上的进位关系，不表示真的有一根连杆沿着箭头连接。' }, 'INFERRED')}${structureCard({ en: 'What we draw for teaching', zh: '为了教学画出的东西' }, { en: 'The four number wheels and highlighted step are a minimal state model, not a machine cutaway.', zh: '四个数字轮和高亮动作是最小状态模型，不是机器剖面。' }, 'TEACHING')}${structureCard({ en: 'What remains unknown', zh: '仍然不知道的事情' }, { en: 'This page does not establish the exact pawl, ratchet, spring, shaft, or linkage used by a specific historical register.', zh: '本页没有确认某一具体历史寄存器使用的棘爪、棘轮、弹簧、轴或连杆的确切结构。' }, 'UNKNOWN')}</div><div class="equation"><span>0099</span><b>+ 1</b><strong>= ${digitsToString(carryState().digits)}</strong></div>${carryDiagram(digits)}<div class="controls"><button id="carry-step">${t('Do one movement', '执行一个动作')}</button><button id="carry-crank">${t('Show the whole addition', '演示完整加法')}</button><button class="secondary" id="carry-reset">${t('Start again', '重新开始')}</button></div><div class="progress"><i style="width:${carryIndex / carryTrace.events.length * 100}%"></i></div><p class="status">${t('Movement', '动作')} ${carryIndex} / ${carryTrace.events.length}</p><details open><summary>${t('Movement log in plain language', '用白话记录每个动作')}</summary><pre>${esc(eventText())}</pre></details><h2>${t('The same carry problem has different architectures', '同一个进位问题，可以有不同架构')}</h2><div class="structure-callout">${t('Above: serialized P/M events make dependency inspectable. Below: source-separated historical responsibilities. No card claims that the arrows or event order reproduce its linkage or timing.', '上方：串行 P/M 事件让依赖关系可检查。下方：按来源分开的历史责任。没有任何资料卡声称箭头或事件顺序复原了其连杆或时序。')}</div><div class="comparison"><div class="machine"><b>${t('Pascaline question', 'Pascaline 的问题')}</b><p>${t('What stores and releases an automatic boundary transfer?', '什么机构储存并释放自动跨位传递？')}</p></div><div class="versus">≠</div><div class="machine"><b>${t('Felt Duplex question', 'Felt Duplex 的问题')}</b><p>${t('How is a carry preserved when the receiving column also has a key-driven movement?', '当接收位同时发生按键驱动运动时，怎样保住进位？')}</p></div></div>${carryProfiles}<h2>${t('Rotary carry is a schedule, not an all-at-once side effect', '旋转式进位是一套调度，不是同时发生的副作用')}</h2><div class="structure-callout"><b>P/M · ${t('ordinal dependency only', '仅表示依赖顺序')}</b><p>${t('A carry can make the receiving order cross its own boundary. That crossing must condition the next order before its later transfer opportunity arrives.', '一次进位可能让接收位再次越界；这次越界必须先使下一位就绪，然后更高位的进位机会才能到来。')}</p><ol>${rotarySchedule}</ol><p>${t('Slots are integer order markers—not degrees, milliseconds, tooth positions, safe RPM, or a failure-probability simulation.', '这些槽只是整数顺序标记，不是角度、毫秒、齿位、安全转速，也不是失效概率模拟。')}</p></div>${rotaryProfiles}<h2>${t('Stepped-drum carry has the same dependency question—not the same mechanism', '阶梯鼓进位面对相同的依赖问题，但不是同一种机构')}</h2><div class="comparison"><div class="machine"><b>${t('Thomas 1865 · H/E1', 'Thomas 1865 · H/E1')}</b><p>${t('Successively phased stepped cylinders make carries fall one after another. The patent also says older simultaneous vertical carry loads could lift the dial plate and produce false results.', '依次错相的阶梯鼓使进位一个接一个落下。专利还称，旧式多个垂直进位负载同时作用时可能顶起表盘板并产生错误结果。')}</p></div><div class="versus">≠</div><div class="machine"><b>${t('Talamini/Marchant 1932 · H/E1', 'Talamini/Marchant 1932 · H/E1')}</b><p>${t('An Odhner-type rotary drum displaces carry opportunities so a carry-created crossing can condition the next order.', 'Odhner 型旋转鼓把进位机会错开，使前一次进位造成的越界能够先触发下一位。')}</p></div></div><div class="structure-callout"><b>${t('Shared only at P/M dependency level', '仅在 P/M 依赖层面共用')}</b><p>${t('The ordinal slots above can explain “later transfer after earlier conditioning.” They are neither Thomas cylinder tooth phasing nor an Odhner/Marchant carry spiral.', '上方序数槽只能解释“先完成前一位触发，再发生后一位传递”。它们既不是 Thomas 阶梯鼓齿相位，也不是 Odhner/Marchant 进位螺旋。')}</p><p>${t('The 1880 patent proposed 10 parts per carry effect instead of 20. A specialist chronology reports no referenced surviving implementation; proposal is not production adoption.', '1880 年专利提出把每套进位机构从 20 个零件减至 10 个。专业年表称已收录留存机器中未见该实现；专利提案不等于量产采用。')}</p></div>${thomasProfiles}<p class="model-note">${t('Open: production-revision mapping, forces, spring constants, wear, tolerances, safe rate, measured failure envelopes, and exact historical timing. No source-specific geometry is drawn here.', '开放问题：量产修订版映射、力、弹簧常数、磨损、公差、安全速度、实测失效边界和确切历史时序。本页不绘制特定来源的几何结构。')}</p></section>`
  );
  document.querySelector('#carry-step')?.addEventListener('click', () => { carryIndex = Math.min(carryIndex + 1, carryTrace.events.length); visibleCarry(); });
  document.querySelector('#carry-crank')?.addEventListener('click', () => { carryIndex = carryTrace.events.length; visibleCarry(); });
  document.querySelector('#carry-reset')?.addEventListener('click', () => { carryIndex = 0; visibleCarry(); });
}

function finiteDifference() {
  const bars = diff.output.slice(-8).map((value, index, values) => `<i style="height:${Math.max(8, value / Math.max(...values, 1) * 100)}%"><span>${value}</span></i>`).join('');
  const outputState = stateAtDifferenceOutputEvent(differenceOutputTrace, differenceOutputIndex);
  const outputLog = differenceOutputTrace.events.slice(0, differenceOutputIndex).map((event) => {
    if (event.type === 'TABLE_VALUE_READY') return t(`${event.sequence} · row ${event.row}, value ${event.value}: calculation ready`, `${event.sequence} · 第 ${event.row} 行、数值 ${event.value}：计算完成`);
    if (event.type === 'CHECK_COPY_RECORDED') return t(`${event.sequence} · persistent check-copy records ${event.value}`, `${event.sequence} · 持久检查副本记录 ${event.value}`);
    return t(`${event.sequence} · master/stereotype output role records ${event.value}`, `${event.sequence} · 母版/铸版输出角色记录 ${event.value}`);
  }).join('\n') || t('No output responsibility exposed yet.', '还没有呈现输出责任。');
  shell(
    { en: 'Can addition generate a table—and carry its values into persistent output?', zh: '加法能生成表格，并把数值带入持久输出吗？' },
    { en: 'Finite differences compute the next value; printing/master roles change what happens after arithmetic.', zh: '有限差分算出下一值；检查副本与母版角色改变了算术之后的流程。' },
    `${evidencePanel(locale)}${scene('📦', { en: 'You build square shop displays', zh: '你要搭正方形商品展台' }, { en: 'A 1×1 display needs 1 box, 2×2 needs 4, 3×3 needs 9.', zh: '1×1 需要 1 箱，2×2 需要 4 箱，3×3 需要 9 箱。' }, { en: 'A table-making workflow needs a persistent reference', zh: '制表流程还需要持久的查询记录' }, { en: 'A correct internal number can still be corrupted by re-copying or typesetting.', zh: '内部数值即使正确，重新抄写或排版仍可能引入错误。' })}${lesson({ en: 'Generate a value, then distinguish calculation from persistent output.', zh: '生成一个数值，再区分“计算完成”与“持久输出”。' }, { en: 'Turn the arithmetic crank; then step the separate three-role output trace.', zh: '先推进算术，再单步查看独立的三角色输出流。' }, { en: 'Output changes the table-making trust boundary; this trace is not printer geometry.', zh: '输出改变制表的信任边界；这条事件流不是打印机构几何。' })}<section><div class="structure-callout"><b>M</b> ${t('finite-difference relation', '有限差分关系')} · <b>H/E1</b> BAB/A/173–176 ${t('drawing identities/subjects', '图纸身份/主题')} · <b>R</b> ${t('1991/2002 Science Museum reconstruction', '1991/2002 Science Museum 复原')} · <b>H</b> ${t('built Scheutz printing engines', '实际建成的 Scheutz 打印差分机')} · <b>P/M</b> ${t('this serialized output trace', '本序列化输出流')} · <b>OPEN</b> ${t('printer geometry/timing', '打印几何/时序')}</div><div class="formula-story"><div><small>${t('numbers we want', '想要的数字')}</small><b>0, 1, 4, 9, 16…</b></div><span>↓ ${t('difference', '相邻相减')}</span><div><small>${t('first differences', '一阶差分')}</small><b>1, 3, 5, 7…</b></div><span>↓ ${t('difference again', '再相减')}</span><div class="constant"><small>${t('second difference', '二阶差分')}</small><b>2, 2, 2, 2…</b></div></div><div class="bar-chart">${bars}</div><div class="state-grid">${diff.columns.map((value, order) => `<div><small>${order === 0 ? t('output now', '当前输出') : `Δ${order}`}</small><strong>${value}</strong><span>${order === diff.columns.length - 1 ? t('stays constant', '保持不变') : t('receives the number on its right', '接收右边的数字')}</span></div>`).join('')}</div><p><b>${t('Numbers produced:', '已经生成：')}</b> ${diff.output.join(' → ')}</p><p><b>${t('This crank did:', '这一轮执行：')}</b> ${diffEvents.join('，') || t('nothing yet', '尚未转动')}</p><div class="controls"><button id="diff-step">↻ ${t('Turn crank once', '转动曲柄一次')}</button><button class="secondary" id="diff-square">${t('Square-number preset', '平方数预设')}</button><button class="secondary" id="diff-cubic">${t('Cube-number preset', '立方数预设')}</button></div><h2>${t('From calculated value to persistent output', '从计算数值到持久输出')}</h2><div class="state-grid"><div><small>${t('source row / generated value', '来源行 / 生成数值')}</small><strong>${outputState.row} / ${outputState.generatedValue}</strong></div><div><small>${t('calculation ready', '计算完成')}</small><strong>${outputState.calculationReady ? t('yes', '是') : t('not yet', '尚未')}</strong></div><div><small>${t('persistent check-copy', '持久检查副本')}</small><strong>${outputState.checkCopyValue ?? '—'}</strong></div><div><small>${t('master / stereotype role', '母版 / 铸版角色')}</small><strong>${outputState.stereotypeMasterValue ?? '—'}</strong></div></div><div class="controls"><button id="diff-output-step" ${differenceOutputIndex >= differenceOutputTrace.events.length ? 'disabled' : ''}>${t('Step output role', '推进输出角色')}</button><button class="secondary" id="diff-output-reset">${t('Reset output flow', '重置输出流')}</button></div><p class="status">${t('Output event', '输出事件')} ${differenceOutputIndex} / ${differenceOutputTrace.events.length}</p><details open><summary>${t('Ordered P/M output-responsibility log', '有序 P/M 输出责任日志')}</summary><pre>${esc(outputLog)}</pre></details><p class="model-note">${t('The three output events expose responsibilities for inspection. They are not historical stop-motion phases or a simulation of BAB/A/173–176. Persistent output reduces re-copy risk; it does not eliminate every human or production error.', '三个输出事件只用于检查不同责任；它们不是历史上的停格式阶段，也不是 BAB/A/173–176 的模拟。持久输出减少重新抄写风险，但不消除所有人为或生产错误。')}</p></section>`
  );
  document.querySelector('#diff-step')?.addEventListener('click', () => { const crank = transitionDifference(diff); diff = crank.after; diffEvents = crank.events.map((event) => `Δ${event.sourceOrder} → Δ${event.targetOrder}`); differenceOutputTrace = createDifferenceOutputTrace(crank.before); differenceOutputIndex = 0; finiteDifference(); });
  const resetPreset = (next: DifferenceState, preset: string) => { diff = next; diffPreset = preset; diffEvents = []; differenceOutputTrace = createDifferenceOutputTrace(diff); differenceOutputIndex = 0; finiteDifference(); };
  document.querySelector('#diff-square')?.addEventListener('click', () => resetPreset(squarePreset(), 'n²'));
  document.querySelector('#diff-cubic')?.addEventListener('click', () => resetPreset(cubicPreset(), 'n³'));
  document.querySelector('#diff-output-step')?.addEventListener('click', () => { differenceOutputIndex = Math.min(differenceOutputIndex + 1, differenceOutputTrace.events.length); finiteDifference(); });
  document.querySelector('#diff-output-reset')?.addEventListener('click', () => { differenceOutputIndex = 0; finiteDifference(); });
  if (!differenceKeyboardBound) { differenceKeyboardBound = true; window.addEventListener('keydown', (event) => { if (location.hash === '#/finite-difference' && event.key === 'ArrowRight' && differenceOutputIndex < differenceOutputTrace.events.length) { event.preventDefault(); differenceOutputIndex += 1; finiteDifference(); } }); }
}

function multiplication() {
  const result = compare314x27();
  const directTrace = result.directMultiplication.trace;
  const directEvents = directTrace.events;
  const directCycleBoundaries = directEvents
    .map((event, index) => event.type === 'OPERATION_CYCLE' ? index + 1 : null)
    .filter((boundary): boundary is number => boundary !== null);
  directEventIndex = Math.min(directEventIndex, directEvents.length);
  const directState = directEvents
    .slice(0, directEventIndex)
    .reduce(reduceDirectMultiplierEvent, directTrace.initialState);
  const directEventText = (event: DirectMultiplierEvent): string => {
    if (event.type === 'MULTIPLIER_DIGIT_SELECTED') {
      return t(
        'Select digit ' + event.digit + ': encoded multiple ' + event.multiplicand + ' × ' + event.digit + ' = ' + event.selectedMultiple,
        '选择乘数位 ' + event.digit + '：编码倍数 ' + event.multiplicand + ' × ' + event.digit + ' = ' + event.selectedMultiple,
      );
    }
    if (event.type === 'CARRIAGE_SHIFTED') {
      return t(
        'Shift the carriage from ×' + 10 ** event.offsetBefore + ' to ×' + 10 ** event.offsetAfter,
        '把位架从 ×' + 10 ** event.offsetBefore + ' 移到 ×' + 10 ** event.offsetAfter,
      );
    }
    return t(
      'Transfer ' + event.contribution + ': accumulator ' + event.accumulatorBefore + ' → ' + event.accumulatorAfter,
      '传入 ' + event.contribution + '：累加器 ' + event.accumulatorBefore + ' → ' + event.accumulatorAfter,
    );
  };
  const directLog = directEvents
    .slice(0, directEventIndex)
    .map((event) => String(event.sequence + 1).padStart(2, '0') + ' · ' + directEventText(event))
    .join('\n') || t('No mechanism event yet.', '机构还没有动作。');
  shell(
    { en: 'What does “× 27” mean to a machine?', zh: '对一台机械来说，“× 27”到底意味着什么？' },
    { en: 'Multiplication becomes additions, crank turns, and a shift to the tens place.', zh: '乘法会被拆成加法、曲柄转动，以及向十位的移位。' },
    `${evidencePanel(locale)}${scene('🧾', { en: 'A warehouse receives a bulk order', zh: '仓库收到一张批量订单' }, { en: 'There are 27 cartons with 314 screws in each. Your phone says 8,478 immediately.', zh: '一共 27 箱，每箱 314 颗螺丝。手机立刻给出 8,478。' }, { en: 'A clerk uses a hand-cranked calculator', zh: '过去的职员使用手摇计算机' }, { en: 'The clerk cannot press ×. They perform 7 turns in the ones place, shift the carriage, then 2 turns in the tens place.', zh: '职员没有乘号可按：先在个位转 7 次，移动位架，再在十位转 2 次。' })}${lesson({ en: 'Check the warehouse total: 27 cartons × 314 screws.', zh: '核对订单总数：27 箱 × 每箱 314 颗。' }, { en: 'First read only the line “27 = 7×1 + 2×10”.', zh: '先只看“27 = 7×1 + 2×10”这一行。' }, { en: 'A multi-digit multiplication is two smaller jobs: handle 7 ones, then handle 2 tens after shifting place value.', zh: '多位数乘法其实是两个小任务：先处理 7 个一，再移位处理 2 个十。' })}<section><div class="structure-callout">${evidenceBadge('TEACHING', locale)} ${t('These lanes compare operation recipes. They are not cross-sections of stepped drums or pinwheels.', '这些轨道比较的是操作步骤，不是阶梯鼓轮或拨轮的内部剖面。')}</div><div class="equation"><span>314 × 27</span><strong>= ${result.value}</strong></div><div class="place-decomposition"><div>27</div><span>=</span><b>7 × 1</b><span>+</span><b>2 × 10</b></div><div class="mechanism-lanes"><div><h3>${t('Repeated addition', '重复加法')}</h3><div class="motion">${Array.from({ length: 7 }, () => '<i>+</i>').join('')}<em>… ×27</em></div><p>${t('Add 314 twenty-seven times.', '把 314 连加 27 次。')}</p></div><div><h3>${t('Stepped drum', '阶梯鼓轮')}</h3><div class="drum" aria-label="stepped drum">▂▄▆█ <b>↻</b></div><p>${t('A selected depth exposes a chosen number of steps.', '用选择的深度决定有多少级台阶参与啮合。')}</p></div><div><h3>${t('Pinwheel', '拨轮')}</h3><div class="pinwheel" aria-label="pinwheel">${Array.from({ length: 10 }, (_, i) => `<i class="${i < 7 ? 'on' : ''}">•</i>`).join('')}</div><p>${t('Expose 7 pins, then shift the carriage for 2 tens.', '先露出 7 根销齿，再移动位架处理 2 个十。')}</p></div><div><h3>${t('Direct multiplication', '直接乘法')}</h3><div class="motion"><b>7 → 2198</b><em>1 cycle</em></div><p>${t('Select the pre-encoded 7× multiple in one cycle; shift, then select 2× in one cycle.', '一个周期选择预编码的 7 倍数；移位后，再用一个周期选择 2 倍数。')}</p></div></div><div class="shift-demo"><span>314 × 7 = 2198</span><b>+</b><span class="shifted">314 × 2 × <mark>10</mark> = 6280</span><b>= 8478</b></div><p class="model-note">${t(`Direct path: ${result.directMultiplication.operationCycles} selection/operation cycles, ${result.directMultiplication.carriageShifts} carriage shift. The multiplier digit selects a multiple in the machine/control model instead of asking the operator for 27 repeated additions. Claim P: Steiger/Millionaire-informed functional model, not historical geometry.`, `直接乘法路径：${result.directMultiplication.operationCycles} 个选择/运算周期，${result.directMultiplication.carriageShifts} 次位架移位。乘数位在机器/控制模型中选择相应倍数，而不是让操作者重复加 27 次。声明类型 P：受 Steiger/Millionaire 研究启发的功能模型，不是历史几何复原。`)}</p><details><summary>${t('Direct-multiplication state/events', '直接乘法状态/事件')}</summary><pre>${result.directMultiplication.trace.events.map((event) => JSON.stringify(event)).join('\n')}</pre></details></section>`
  );

  const rawEventDetails = document.querySelector('section details:last-of-type');
  const workbench = document.createElement('div');
  workbench.className = 'direct-workbench';
  workbench.innerHTML = `<h3>${t('Step through the direct-multiplication path', '单步观察直接乘法路径')}</h3><div class='state-grid'><div><small>${t('multiplier selector', '乘数选择器')}</small><strong>${directState.selectedMultiplierDigit ?? '—'}</strong><span>${t('one selection per decimal digit', '每个十进制位选择一次')}</span></div><div><small>${t('selected table multiple', '乘法表选出的倍数')}</small><strong>${directState.selectedMultiplierDigit === null ? '—' : directState.selectedMultiple}</strong><span>${directState.selectedMultiplierDigit === null ? '314 × —' : '314 × ' + directState.selectedMultiplierDigit}</span></div><div><small>${t('carriage place', '位架数位')}</small><strong>×${10 ** directState.carriageOffset}</strong><span>${t('place value remains an explicit operation', '位值移位仍是显式操作')}</span></div><div><small>${t('accumulator', '累加器')}</small><strong>${directState.accumulator}</strong><span>${t('target: 8478', '目标：8478')}</span></div><div><small>${t('completed cycles', '已完成周期')}</small><strong>${directState.operationCycleCount} / ${result.directMultiplication.operationCycles}</strong><span>${t('human actions: ', '人工动作：')}${directState.humanOperationCount}</span></div></div><div class='controls'><button id='direct-step' ${directEventIndex >= directEvents.length ? 'disabled' : ''}>${t('Do one mechanism event', '执行一个机构动作')}</button><button id='direct-cycle' ${directEventIndex >= directEvents.length ? 'disabled' : ''}>${t('Complete one operating cycle', '完成一个操作周期')}</button><button class='secondary' id='direct-reset'>${t('Start again', '重新开始')}</button></div><div class='progress'><i style='width:${directEvents.length === 0 ? 100 : directEventIndex / directEvents.length * 100}%'></i></div><p class='status' aria-live='polite'>${t('Mechanism event', '机构动作')} ${directEventIndex} / ${directEvents.length}</p><details open><summary>${t('Replayable mechanism event log', '可重放的机构动作记录')}</summary><pre>${esc(directLog)}</pre></details>`;
  rawEventDetails?.replaceWith(workbench);

  document.querySelector('#direct-step')?.addEventListener('click', () => {
    directEventIndex = Math.min(directEventIndex + 1, directEvents.length);
    multiplication();
  });
  document.querySelector('#direct-cycle')?.addEventListener('click', () => {
    directEventIndex = directCycleBoundaries.find((boundary) => boundary > directEventIndex) ?? directEvents.length;
    multiplication();
  });
  document.querySelector('#direct-reset')?.addEventListener('click', () => {
    directEventIndex = 0;
    multiplication();
  });
}

function division() {
  const events = divisionTrace.events;
  const state = events.slice(0, divisionEventIndex).reduce(reduceDivisionEvent, structuredClone(divisionTrace.initialState));
  const name = (event: DivisionEvent) => {
    if (event.type === 'SUBTRACT_ONCE') return t(`Subtract ${event.contribution}: ${event.residualBefore} → ${event.residualAfter}`, `减去 ${event.contribution}：${event.residualBefore} → ${event.residualAfter}`);
    if (event.type === 'OVERSHOOT_DETECTED') return t(`Overshoot noticed at ${event.residual}`, `发现超越零点：${event.residual}`);
    if (event.type === 'CORRECT_ADD_BACK') return t(`Add back ${event.contribution}; undo quotient step`, `加回 ${event.contribution}；撤销一次商计数`);
    if (event.type === 'SHIFT_CARRIAGE_DOWN') return t(`Shift decimal place ${event.offsetBefore} → ${event.offsetAfter}`, `位架数位 ${event.offsetBefore} → ${event.offsetAfter}`);
    return t(`Complete: quotient ${event.quotient}, remainder ${event.remainder}`, `完成：商 ${event.quotient}，余数 ${event.remainder}`);
  };
  const log = events.slice(0, divisionEventIndex).map((event) => `${event.sequence.toString().padStart(2, '0')} · ${name(event)}`).join('\n') || t('No operator action yet.', '还没有操作动作。');
  shell(
    { en: 'How does an operator build a quotient?', zh: '操作者怎样一步步做出商？' },
    { en: 'Division emerges from repeated subtraction, carriage place, overshoot, correction, and counting.', zh: '商来自重复减法、位架位置、越界判断、纠正与计数。' },
    `${lesson({ en: 'Divide 8478 by 314 without a ÷ instruction.', zh: '不用“÷”指令计算 8478 ÷ 314。' }, { en: 'Step until the residual passes below zero, then watch the correction.', zh: '单步执行到余数越过零点，再观察纠正。' }, { en: 'The operator decides when to correct and shift; the counter records repeated operations by place.', zh: '操作者决定何时纠正和移位；计数器按数位记录重复操作。' })}<section><div class="structure-callout">${evidenceBadge('TEACHING', locale)} ${t('P/M generic operator procedure—not Thomas, Burkhardt, or Curta geometry.', 'P/M 通用操作者流程——不是 Thomas、Burkhardt 或 Curta 的几何复原。')}</div><div class="equation"><span>8478 ÷ 314</span><strong>${state.phase === 'COMPLETE' ? `= ${quotientValue(state)}` : '→ ?'}</strong></div><div class="state-grid"><div><small>${t('residual / result register', '余数 / 结果寄存器')}</small><strong>${state.residual}</strong></div><div><small>${t('divisor', '除数')}</small><strong>${state.divisor}</strong></div><div><small>${t('carriage place', '位架数位')}</small><strong>×${10 ** state.carriageOffset}</strong><span>${t('current subtraction: ', '当前减数：')}${state.currentContribution}</span></div><div><small>${t('quotient by place', '分位商计数')}</small><strong>${[...state.quotientDigits].reverse().join('')}</strong><span>${t('tens / units revolution counts', '十位 / 个位转数计数')}</span></div><div><small>${t('phase', '阶段')}</small><strong>${state.phase}</strong><span>${state.phase === 'CORRECTION_REQUIRED' ? t('operator must add back before shifting', '必须先加回纠正，才能移位') : t('human actions: ', '人工动作：') + state.humanOperationCount}</span></div></div><div class="controls"><button id="division-step" ${divisionEventIndex >= events.length ? 'disabled' : ''}>${t('Do one event', '执行一个事件')}</button><button class="secondary" id="division-reset">${t('Reset', '重置')}</button></div><div class="progress"><i style="width:${divisionEventIndex / events.length * 100}%"></i></div><p class="status" aria-live="polite">${t('Event', '事件')} ${divisionEventIndex} / ${events.length}</p><details open><summary>${t('Operator procedure log', '操作者流程记录')}</summary><pre>${esc(log)}</pre></details><p class="model-note">${t('No hidden quotient event exists. Ten subtraction attempts, one detected tens-place overshoot, one add-back correction, and a carriage shift produce 27. Thomas mode/counter roles and Curta operator procedures are separate historical evidence; this negative-residual/correction trace does not model their bell, crank direction, counter sign, or add-back linkage.', '不存在隐藏的“直接得商”事件。十次减法尝试、一次十位越界、一次加回纠正和一次位架移位共同产生 27。Thomas 模式/计数角色与 Curta 操作流程属于各自的历史证据；这里的负余数/纠正事件不模拟它们的铃、曲柄方向、计数符号或加回连杆。')}</p></section>`
  );
  document.querySelector('#division-step')?.addEventListener('click', () => { divisionEventIndex = Math.min(divisionEventIndex + 1, events.length); division(); });
  document.querySelector('#division-reset')?.addEventListener('click', () => { divisionEventIndex = 0; division(); });
}

function controls() {
  const eventLabel = (event: InterlockEvent) => {
    if (event.type === 'SETTING_CHANGED') return t(`setting ${event.valueBefore} → ${event.valueAfter}`, `设定值 ${event.valueBefore} → ${event.valueAfter}`);
    if (event.type === 'CRANK_CYCLE_COMPLETED') return t(`cycle count ${event.cycleCountBefore} → ${event.cycleCountAfter}`, `周期计数 ${event.cycleCountBefore} → ${event.cycleCountAfter}`);
    return ({
      SETTING_LOCKED: t('setting locks before motion', '运转前先锁定设定控制'),
      CRANK_RELEASED: t('crank released at home', '曲柄在原位解除锁定'),
      CRANK_CYCLE_BEGUN: t('crank becomes active', '曲柄进入运转状态'),
      CRANK_RETURNED_HOME: t('crank returns home', '曲柄返回原位'),
      CRANK_LOCKED: t('crank locks at home', '曲柄在原位锁定'),
      SETTING_RELEASED: t('setting becomes available', '设定控制恢复可用'),
    } as const)[event.type];
  };
  const log = controlEvents.map((event) => `${String(event.sequence).padStart(2, '0')} · ${eventLabel(event)}`).join('\n') || t('No control transition yet.', '还没有控制状态变化。');
  const active = controlState.phase === 'ACTIVE';
  const evidenceProfiles = CONTROL_EVIDENCE_PROFILES.map((profile) => `<details><summary><b>${copy(profile.family)}</b> · ${profile.dateOrModel} · ${profile.claimType}/${profile.evidenceStrength}</summary><p><a href="${profile.sourceUrl}" target="_blank" rel="noreferrer">${esc(profile.sourceLabel)}</a></p><b>${t('Documented role(s)', '资料直接支持的角色')}</b><ul>${profile.documentedRoles.map((role) => `<li>${copy(role)}</li>`).join('')}</ul><b>${t('Not established / open', '未确认 / 开放问题')}</b><ul>${profile.notEstablished.map((boundary) => `<li>${copy(boundary)}</li>`).join('')}</ul></details>`).join('');
  shell(
    { en: 'Why is a lock part of the calculation?', zh: '锁并不表示数字，为什么仍属于计算？' },
    { en: 'It prevents setting and operation from becoming valid at the same time.', zh: '它阻止设定与运转在同一时刻同时有效。' },
    `${lesson({ en: 'Protect one complete arithmetic cycle from a mid-operation setting change.', zh: '保护一个完整运算周期，不让设定值在途中改变。' }, { en: 'Change the setting, begin a cycle, then try changing it while active.', zh: '先改变设定、开始周期，再在运转中尝试改变设定。' }, { en: 'Permission and phase carry algorithmic meaning even though they contain no number.', zh: '权限与阶段即使不承载数字，也具有算法意义。' })}<section><div class="structure-callout">${evidenceBadge('TEACHING', locale)} ${t('P/M generic interlock informed by Odhner patent and Curta operator evidence—not either machine’s lock geometry.', 'P/M 通用互锁模型，受 Odhner 专利和 Curta 操作资料启发——不是任何一台机器的锁具几何复原。')}</div><div class="state-grid"><div><small>${t('setting / revision', '设定值 / 修订号')}</small><strong>${controlState.settingValue} / r${controlState.settingRevision}</strong></div><div><small>${t('crank position', '曲柄位置')}</small><strong>${controlState.crankPosition}</strong><span>${controlState.crankLocked ? t('locked', '已锁定') : t('released', '已释放')}</span></div><div><small>${t('setting control', '设定控制')}</small><strong>${controlState.settingLocked ? t('LOCKED', '锁定') : t('FREE', '可用')}</strong></div><div><small>${t('phase', '阶段')}</small><strong>${controlState.phase}</strong></div><div><small>${t('completed cycles', '已完成周期')}</small><strong>${controlState.completedCycleCount}</strong><span>${t('human operations: ', '人工动作：')}${controlState.humanOperationCount}</span></div></div><div class="controls"><button id="control-setting" ${controlState.settingLocked ? 'disabled' : ''}>${t('Change setting', '改变设定值')}</button><button id="control-begin" ${controlState.phase !== 'HOME_FREE' ? 'disabled' : ''}>${t('Begin crank cycle', '开始曲柄周期')}</button><button id="control-attempt" ${!active ? 'disabled' : ''}>${t('Try setting while active', '运转中尝试改设定')}</button><button id="control-complete" ${!active ? 'disabled' : ''}>${t('Complete and return home', '完成并返回原位')}</button><button class="secondary" id="control-reset">${t('Reset', '重置')}</button></div><p class="status" aria-live="polite">${controlMessage || t('At home: crank locked, setting free.', '原位状态：曲柄锁定，设定控制可用。')}</p><details open><summary>${t('Ordered control events', '有序控制事件')}</summary><pre>${esc(log)}</pre></details><p class="model-note">${t('If both controls stayed free, one nominal cycle could transfer parts of two settings. The lock preserves the operand and cycle boundary.', '如果两套控制同时自由，一个名义周期就可能传递两个设定值的不同部分。互锁保护的是操作数与周期边界。')}</p><h2>${t('Documented controls are family-specific', '历史控制必须逐机器家族辨认')}</h2><p class="structure-callout">${t('The P/M event sequence above is not reconstructed from any one profile below. These cards preserve source identity, claim/evidence labels, documented roles, and what each source does not establish.', '上方 P/M 事件顺序并非从下方任一资料复原而来。这些卡片保留来源身份、声明/证据标签、资料支持的角色，以及每项来源不能证明的内容。')}</p>${evidenceProfiles}</section>`
  );
  const apply = (type: 'CHANGE_SETTING' | 'BEGIN_CRANK_CYCLE' | 'COMPLETE_CRANK_CYCLE', value?: number) => {
    try {
      const result = transitionInterlock(controlState, type === 'CHANGE_SETTING'
        ? { type, value: value ?? controlState.settingValue + 1, cycleId: `control-${controlCycle++}` }
        : { type, cycleId: `control-${controlCycle++}` });
      const offset = controlEvents.length;
      controlEvents.push(...result.events.map((event) => ({ ...event, sequence: event.sequence + offset } as InterlockEvent)));
      controlState = result.state;
      controlMessage = '';
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      controlMessage = message === 'setting is locked while a crank cycle is active'
        ? t('Blocked: the setting is locked until the crank returns home.', '已阻止：曲柄返回原位前，设定控制保持锁定。')
        : message;
    }
    controls();
  };
  document.querySelector('#control-setting')?.addEventListener('click', () => apply('CHANGE_SETTING'));
  document.querySelector('#control-begin')?.addEventListener('click', () => apply('BEGIN_CRANK_CYCLE'));
  document.querySelector('#control-attempt')?.addEventListener('click', () => apply('CHANGE_SETTING'));
  document.querySelector('#control-complete')?.addEventListener('click', () => apply('COMPLETE_CRANK_CYCLE'));
  document.querySelector('#control-reset')?.addEventListener('click', () => { controlState = createSettingCrankInterlock(314); controlEvents = []; controlMessage = ''; controlCycle = 0; controls(); });
}

function curta() {
  shell(
    { en: 'A calculator you operate like a tiny machine tool', zh: '像操作微型机床一样使用计算器' },
    { en: 'Curta compresses number setting, repeated transfer, place shift, and counters into one hand-held cylinder.', zh: 'Curta 把数字设定、重复传递、位值移动和计数器压缩进一个手持圆筒。' },
    `${lesson({ en: 'It shows that calculation can be a physical procedure performed by your hands.', zh: '它说明计算可以是一套由双手执行的物理流程。' }, { en: 'Follow the path from setting sliders, through the crank, to two counters.', zh: '沿着设定滑块、曲柄、两个计数器的路径看。' }, { en: 'The human and machine share the algorithm: you choose shifts and turns; the mechanism handles transfer and carry.', zh: '人与机器共同完成算法：人决定移位和转数，机构负责传递与进位。' })}<section><div class="curta-diagram"><div class="curta-knob">↻<small>${t('crank', '曲柄')}</small></div><div class="curta-body"><div><span>${t('setting sliders', '设定滑块')}</span><b>3 1 4</b></div><div class="gear-stream">↓ ⚙ ↓ ⚙ ↓</div><div><span>${t('result counter', '结果计数器')}</span><b>8 4 7 8</b></div><div><span>${t('turn counter', '转数计数器')}</span><b>2 7</b></div></div><div class="curta-carriage">↔ <small>${t('shift place value', '移动十进制位值')}</small></div></div><ol class="human-steps"><li>${t('Set 314 on the sliders.', '用滑块设定 314。')}</li><li>${t('Turn 7 times at the ones position.', '在个位位置转动 7 次。')}</li><li>${t('Shift one decimal place.', '向十位移动一格。')}</li><li>${t('Turn 2 times; read 8478.', '再转动 2 次，读出 8478。')}</li></ol><p class="model-note">${t('Operational teaching model (Grade D), not a complete Curta emulator.', '这是操作教学模型（D 级），不是完整的 Curta 模拟器。')}</p></section>`
  );
}

function analytical() {
  const state = stateAtAnalyticalEvent(analyticalTrace, analyticalEventIndex);
  const current = analyticalEventIndex > 0 ? analyticalTrace.events[analyticalEventIndex - 1] : null;
  const eventLabel = (event: AnalyticalFlowEvent) => {
    if (event.type === 'NUMBER_ASSOCIATED') return t(`associate ${event.symbol}=${event.value} with ${event.location}`, `把 ${event.symbol}=${event.value} 放入 ${event.location}`);
    if (event.type === 'STORE_TO_MILL') return t(`transfer ${event.source}=${event.value} to Mill input ${event.inputIndex + 1}`, `把 ${event.source}=${event.value} 送入 Mill 输入 ${event.inputIndex + 1}`);
    if (event.type === 'OPERATION_SELECTED') return t(`select ${event.operation}`, `选择 ${event.operation} 运算`);
    if (event.type === 'MILL_OPERATION_COMPLETED') return t(`Mill: ${event.left} ${event.operation === 'ADD' ? '+' : '×'} ${event.right} = ${event.result}`, `Mill：${event.left} ${event.operation === 'ADD' ? '+' : '×'} ${event.right} = ${event.result}`);
    if (event.type === 'MILL_TO_STORE') return t(`store ${event.symbol}=${event.value} in ${event.target}`, `把 ${event.symbol}=${event.value} 存入 ${event.target}`);
    return t(`send ${event.value} from ${event.source} to output`, `把 ${event.source} 中的 ${event.value} 送往输出`);
  };
  const store = (['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7'] as const).map((location) => `<div><small>${location}</small><strong>${state.store[location] ?? '—'}</strong></div>`).join('');
  const log = analyticalTrace.events.slice(0, analyticalEventIndex).map((event) => `${String(event.sequence).padStart(2, '0')} · [${event.cardRole}] ${eventLabel(event)}`).join('\n') || t('No card-role transition yet.', '还没有卡片角色状态变化。');
  shell(
    { en: 'How do values move through Store, Mill, cards, and output?', zh: '数值怎样在 Store、Mill、卡片与输出之间流动？' },
    { en: 'Step through (ab+c)d without confusing a teaching trace with a finished historical machine.', zh: '逐步执行 (ab+c)d，同时不把教学事件流冒充为建成的历史机器。' },
    `${lesson({ en: 'Watch intermediate values p and q emerge before the final result.', zh: '观察中间值 p 和 q 如何先于最终结果出现。' }, { en: 'Advance one card-role event; inspect Store and Mill after each step.', zh: '每次推进一个卡片角色事件，再检查 Store 与 Mill。' }, { en: 'Historical roles, later emulator choices, and this P/M ordering are three different evidence layers.', zh: '历史角色、后世模拟器选择与本 P/M 排序属于三个不同证据层。' })}<section><div class="structure-callout">${evidenceBadge('TEACHING', locale)} ${t('(ab+c)d is documented in H. P. Babbage’s 1888 explanation. Values 2,3,4,5 and this serialized order are this repository’s P/M fixture.', '(ab+c)d 见于 H. P. Babbage 1888 年的说明；数值 2、3、4、5 与此序列化顺序是本仓库的 P/M 教学设定。')}</div><div class="equation"><span>(2×3+4)×5</span><strong>= ${state.output ?? '?'}</strong></div><h2>Store</h2><div class="state-grid">${store}</div><h2>Mill</h2><div class="state-grid"><div><small>${t('inputs', '输入')}</small><strong>${state.mill.inputs.length ? state.mill.inputs.join(', ') : '—'}</strong></div><div><small>${t('operation', '运算')}</small><strong>${state.mill.operation ?? '—'}</strong></div><div><small>${t('result', '结果')}</small><strong>${state.mill.result ?? '—'}</strong></div><div><small>${t('current card role', '当前卡片角色')}</small><strong>${current?.cardRole ?? '—'}</strong></div><div><small>${t('output', '输出')}</small><strong>${state.output ?? '—'}</strong></div></div><div class="controls"><button id="analytical-step" ${analyticalEventIndex >= analyticalTrace.events.length ? 'disabled' : ''}>${t('Step one event', '推进一个事件')}</button><button class="secondary" id="analytical-reset">${t('Reset', '重置')}</button></div><p class="status">${t('Event', '事件')} ${analyticalEventIndex} / ${analyticalTrace.events.length}</p><details open><summary>${t('Ordered teaching trace', '有序教学事件流')}</summary><pre>${esc(log)}</pre></details><p class="model-note">${t('Store/Mill and card roles are historically described; Science Museum drawing records prove evolving design sheets exist. Walker/Fourmilab is a later reconstruction/emulator whose unified syntax is not treated as primary evidence here. CPU/memory remain analogies, not identities.', 'Store/Mill 与卡片角色有历史文献依据；Science Museum 图纸记录证明设计稿曾持续演变。Walker/Fourmilab 是后世复原/模拟器，其统一语法不在此被当作一手史料。“CPU/内存”仍只是类比，不是历史结构身份。')}</p></section>`
  );
  document.querySelector('#analytical-step')?.addEventListener('click', () => { analyticalEventIndex = Math.min(analyticalEventIndex + 1, analyticalTrace.events.length); analytical(); });
  document.querySelector('#analytical-reset')?.addEventListener('click', () => { analyticalEventIndex = 0; analytical(); });
  if (!analyticalKeyboardBound) {
    analyticalKeyboardBound = true;
    window.addEventListener('keydown', (event) => {
      if (location.hash === '#/analytical-engine' && event.key === 'ArrowRight' && analyticalEventIndex < analyticalTrace.events.length) {
        event.preventDefault(); analyticalEventIndex += 1; analytical();
      }
    });
  }
}

function continuous() {
  const state = stateAtContinuousEvent(continuousTrace, continuousEventIndex);
  const label = (event: ContinuousFlowEvent) => {
    if (event.type === 'INPUTS_OBSERVED') return t(`observe input quantities A=${event.inputA}, B=${event.inputB}`, `观察输入量 A=${event.inputA}、B=${event.inputB}`);
    if (event.type === 'ADDER_RELATION_APPLIED') return t(`adder relation: ${event.inputA} + ${event.inputB} = ${event.sum}`, `加法关系：${event.inputA} + ${event.inputB} = ${event.sum}`);
    if (event.type === 'INTEGRATOR_EVENT') {
      const inner = event.integratorEvent;
      if (inner.type === 'INPUT_QUANTITY_OBSERVED') return t(`integrator observes rate ${inner.inputObserved}`, `积分器观察到输入率 ${inner.inputObserved}`);
      if (inner.type === 'INDEPENDENT_QUANTITY_ADVANCED') return t(`inspection coordinate ${inner.independentBefore} → ${inner.independentAfter}`, `检查坐标 ${inner.independentBefore} → ${inner.independentAfter}`);
      return t(`integrated quantity +${inner.contribution} → ${inner.integratedAfter}`, `积分量 +${inner.contribution} → ${inner.integratedAfter}`);
    }
    return t(`tracer exposes output ${event.integratedQuantity}`, `描迹输出呈现 ${event.integratedQuantity}`);
  };
  const log = continuousTrace.events.slice(0, continuousEventIndex).map((event) => `${String(event.sequence).padStart(2, '0')} · ${label(event)}`).join('\n') || t('No inspection event yet.', '还没有检查事件。');
  shell(
    { en: 'How can a continuously represented quantity be added, integrated, and traced?', zh: '连续表示的量怎样被相加、积分并描迹输出？' },
    { en: 'Museum-documented component roles inform a tiny P/M chain; the stop-motion order is only for inspection.', zh: '博物馆记录的部件角色启发了一个微型 P/M 链；停格式顺序只用于检查。' },
    `${lesson({ en: 'Follow two shaft quantities through addition, integration, and visible output.', zh: '跟随两个轴量经过相加、积分与可见输出。' }, { en: 'Step one inspection event, or complete one six-event teaching cycle.', zh: '每次推进一个检查事件，或完成一个六事件教学周期。' }, { en: 'Continuous physical coupling is not a sequence of historical browser clicks.', zh: '连续物理耦合并不是一串历史上的浏览器点击。' })}<section><div class="structure-callout">${t('H/E1 role anchors:', 'H/E1 角色锚点：')} ${t('Smithsonian records describe surviving input-table, adder/differential, integrator, and output-tracer components.', 'Smithsonian 记录描述了留存的输入台、加法/差动、积分器与输出描迹部件。')}<br>${t('M relation:', 'M 数学关系：')} c=a+b; Δy=c·Δx.<br>${t('P/M boundary:', 'P/M 边界：')} ${t('this exact wiring, values, interval, and serialized observation order.', '此处的确切连接、数值、间隔与序列化观察顺序。')}</div><div class="state-grid"><div><small>${t('input quantities A / B', '输入量 A / B')}</small><strong>${state.inputA} / ${state.inputB}</strong></div><div><small>${t('adder output / integrator input', '加法输出 / 积分器输入')}</small><strong>${state.adderOutput ?? '—'}</strong></div><div><small>${t('independent coordinate / interval', '独立坐标 / 检查间隔')}</small><strong>${state.integrator.independentQuantity} / ${state.integrator.inspectionInterval}</strong></div><div><small>${t('integrated quantity', '积分量')}</small><strong>${state.integrator.integratedQuantity}</strong><span>${t('samples: ', '样本数：')}${state.integrator.sampleCount}</span></div><div><small>${t('tracer output', '描迹输出')}</small><strong>${state.tracerOutput ?? '—'}</strong></div><div><small>${t('inspection phase', '检查阶段')}</small><strong>${state.phase}</strong></div></div><div class="controls"><button id="continuous-step" ${continuousEventIndex >= continuousTrace.events.length ? 'disabled' : ''}>${t('Step one event', '推进一个事件')}</button><button id="continuous-cycle" ${continuousEventIndex >= continuousTrace.events.length ? 'disabled' : ''}>${t('Complete cycle', '完成本周期')}</button><button class="secondary" id="continuous-reset">${t('Reset', '重置')}</button></div><p class="status">${t('Event', '事件')} ${continuousEventIndex} / ${continuousTrace.events.length}</p><details open><summary>${t('Ordered P/M inspection log', '有序 P/M 检查日志')}</summary><pre>${esc(log)}</pre></details><p class="model-note">${t('Open/unmodeled: disk-and-wheel geometry, torque amplifiers, shaft layout, backlash, scale factors, dimensions, and real timing. This is not a faithful Differential Analyzer simulation.', '开放/未建模：盘轮几何、扭矩放大器、轴布局、回差、比例因子、尺寸与真实时序。这不是“忠实的微分分析机模拟”。')}</p></section>`
  );
  document.querySelector('#continuous-step')?.addEventListener('click', () => { continuousEventIndex = Math.min(continuousEventIndex + 1, continuousTrace.events.length); continuous(); });
  document.querySelector('#continuous-cycle')?.addEventListener('click', () => { continuousEventIndex = continuousTrace.events.length; continuous(); });
  document.querySelector('#continuous-reset')?.addEventListener('click', () => { continuousTrace = createContinuousFlowTrace(); continuousEventIndex = 0; continuous(); });
  if (!continuousKeyboardBound) { continuousKeyboardBound = true; window.addEventListener('keydown', (event) => { if (location.hash === '#/continuous' && event.key === 'ArrowRight' && continuousEventIndex < continuousTrace.events.length) { event.preventDefault(); continuousEventIndex += 1; continuous(); } }); }
}

function outputContracts() {
  const state = printingLedgerTrace.events.slice(0, printingLedgerIndex).reduce(reducePrintingLedgerEvent, structuredClone(printingLedgerTrace.initialState));
  const eventLabel = (event: PrintingLedgerEvent) => event.type === 'ITEM_RECORDED'
    ? t(`add and print item ${event.amount}: ${event.accumulatorBefore} → ${event.accumulatorAfter}`, `累加并打印项目 ${event.amount}：${event.accumulatorBefore} → ${event.accumulatorAfter}`)
    : event.type === 'SUBTOTAL_RECORDED'
      ? t(`print subtotal ${event.line.value}; retain accumulator ${event.accumulatorAfter}`, `打印小计 ${event.line.value}；累加器保留 ${event.accumulatorAfter}`)
      : t(`print total ${event.line.value}; clear ${event.accumulatorBefore} → 0`, `打印总计 ${event.line.value}；清零 ${event.accumulatorBefore} → 0`);
  const record = state.printedLines.map(line => `${String(line.sequence + 1).padStart(2, '0')}  ${line.kind.padEnd(8)} ${line.value}`).join('\n') || t('Paper record is empty.', '纸面记录为空。');
  const log = printingLedgerTrace.events.slice(0, printingLedgerIndex).map(event => `${String(event.sequence).padStart(2, '0')} · ${eventLabel(event)}`).join('\n') || t('No ledger operation yet.', '还没有台账操作。');
  const profiles = OUTPUT_CONTRACT_PROFILES.map(profile => `<details><summary><b>${copy(profile.family)}</b> · ${profile.dateOrModel} · ${profile.claimType}/${profile.evidenceStrength}</summary><p><a href="${profile.sourceUrl}" target="_blank" rel="noreferrer">${esc(profile.sourceLabel)}</a></p><p><b>${t('Output medium / contract:', '输出介质 / 契约：')}</b> ${copy(profile.outputMedium)}</p><b>${t('Documented', '资料支持')}</b><ul>${profile.documentedBehaviors.map(item => `<li>${copy(item)}</li>`).join('')}</ul><b>${t('Not established', '未确认')}</b><ul>${profile.notEstablished.map(item => `<li>${copy(item)}</li>`).join('')}</ul></details>`).join('');
  shell(
    { en: 'When does an answer become a persistent record?', zh: '答案何时变成可留存的记录？' },
    { en: 'Subtotal retains working arithmetic; total clears it, while both printed lines persist.', zh: '小计保留工作算术状态；总计清除它，但两种打印行都会持续存在。' },
    `${lesson({ en: 'Separate a live accumulator from a paper-like record.', zh: '把实时累加器与纸面式持久记录分开。' }, { en: 'Step +12, +8, subtotal, +5, then total.', zh: '依次单步执行 +12、+8、小计、+5、总计。' }, { en: 'The same printed number can have different next-state semantics.', zh: '同一个打印数字可以具有不同的后续状态语义。' })}<section><div class="structure-callout">${evidenceBadge('TEACHING', locale)} ${t('P/M generic printing ledger—not a Burroughs reconstruction. It does not model type bars, carriage, ribbon, paper feed, or historical operation timing.', 'P/M 通用打印台账——不是 Burroughs 复原。它不模拟字杆、位架、色带、走纸或历史操作时序。')}</div><div class="state-grid"><div><small>${t('working accumulator', '工作累加器')}</small><strong>${state.accumulator}</strong></div><div><small>${t('persistent lines', '持久记录行')}</small><strong>${state.printedLines.length}</strong></div><div><small>${t('items entered', '已录入项目')}</small><strong>${state.itemCount}</strong></div><div><small>${t('next operation', '下一操作')}</small><strong>${printingLedgerTrace.actions[printingLedgerIndex]?.type ?? t('COMPLETE', '完成')}</strong></div></div><div class="comparison"><div class="machine"><b>${t('Working arithmetic state', '工作算术状态')}</b><p>${t('Subtotal keeps it; total clears it.', '小计保留；总计清零。')}</p></div><div class="versus">≠</div><div class="machine"><b>${t('Persistent record', '持久记录')}</b><pre>${esc(record)}</pre></div></div><div class="controls"><button id="output-step" ${printingLedgerIndex >= printingLedgerTrace.events.length ? 'disabled' : ''}>${t('Step next operation', '推进下一操作')}</button><button class="secondary" id="output-reset">${t('Reset', '重置')}</button></div><p class="status" aria-live="polite">${t('Operation', '操作')} ${printingLedgerIndex} / ${printingLedgerTrace.events.length}</p><details open><summary>${t('Ordered P/M ledger log', '有序 P/M 台账日志')}</summary><pre>${esc(log)}</pre></details><p class="model-note">${t('“Audit trail” is a modern comparison label here; the inspected early sources speak of listing, items, totals, and subtotals.', '这里的“审计轨迹”是现代比较标签；已检查的早期资料使用列单、项目、总计与小计等说法。')}</p><h2>${t('Historical output contracts differ by source', '历史输出契约因来源而异')}</h2><p class="structure-callout">${t('The generic ledger above is not the event timing or mechanism of any profile below. Difference Engine persistent output addresses mathematical-table transcription, not office transaction listing.', '上方通用台账不是下方任一资料的事件时序或机构。差分机持久输出处理数学表格转录问题，并非办公交易列单。')}</p>${profiles}</section>`
  );
  document.querySelector('#output-step')?.addEventListener('click', () => { printingLedgerIndex = Math.min(printingLedgerIndex + 1, printingLedgerTrace.events.length); outputContracts(); });
  document.querySelector('#output-reset')?.addEventListener('click', () => { printingLedgerIndex = 0; outputContracts(); });
  if (!outputKeyboardBound) { outputKeyboardBound = true; window.addEventListener('keydown', event => { if (location.hash === '#/output-contracts' && event.key === 'ArrowRight' && printingLedgerIndex < printingLedgerTrace.events.length) { event.preventDefault(); printingLedgerIndex += 1; outputContracts(); } }); }
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
  else if (path === '/division') division();
  else if (path === '/controls') controls();
  else if (path === '/output-contracts') outputContracts();
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
