export type ControlClaimType = 'H' | 'R' | 'H/R';
export type ControlEvidenceStrength = 'E1' | 'E2' | 'E3' | 'E4';
export interface BilingualText { en: string; zh: string; }

export interface ControlEvidenceProfile {
  id: 'thomas-1868-pamphlet' | 'thomas-1867-object' | 'thomas-ca1873-object' | 'thomas-ca1820-object' | 'odhner-us1510100' | 'felt-us960528' | 'turck-us1154897' | 'ziehm-us1110734' | 'felt-controlled-key-manuals' | 'comptometer-model-f-objects' | 'controlled-key-model-mapping-e3' | 'pascaline-complement';
  family: BilingualText;
  dateOrModel: string;
  claimType: ControlClaimType;
  evidenceStrength: ControlEvidenceStrength;
  sourceLabel: string;
  sourceUrl: string;
  documentedRoles: readonly BilingualText[];
  notEstablished: readonly BilingualText[];
}

export const CONTROL_EVIDENCE_PROFILES: readonly ControlEvidenceProfile[] = [
  {
    id: 'thomas-1868-pamphlet',
    family: { en: 'Thomas 1868 instruction pamphlet—exposed opening only', zh: 'Thomas 1868 操作说明——仅公开一幅展开页' },
    dateOrModel: 'MA.318961.02 / nmah_904757; IIIF NMAH-AHB2018q019415; 1 canvas, unnumbered opening',
    claimType: 'H',
    evidenceStrength: 'E1',
    sourceLabel: "Thomas, Instructions pour se Servir de l'Arithmomètre (1868), exposed title/legend opening",
    sourceUrl: 'https://ids.si.edu/ids/manifest/NMAH-AHB2018q019415',
    documentedRoles: [
      { en: 'A setting sliders mark digits; B selects the operation; C windows show results; D windows show multiplier and quotient', zh: 'A 设定滑钮标记数字；B 选择运算；C 窗显示结果；D 窗显示乘数与商' },
      { en: 'N is the operating crank; O independently zeros D; P independently zeros C', zh: 'N 是操作曲柄；O 独立清零 D；P 独立清零 C' },
      { en: 'O and P also lift and slide movable plate/carriage M', zh: 'O 与 P 还用于抬起并滑动活动板/位架 M' },
    ],
    notEstablished: [
      { en: 'multiplication/division step sequence, repeated-turn counts, shift order, overshoot, add-back, remainder termination, or counter direction from the sole exposed opening', zh: '从唯一公开展开页推断乘除步骤、重复转数、移位顺序、超越、加回、余数终止或计数器方向' },
      { en: 'the repository division/register phase names or event order as Thomas terminology or timing', zh: '把本仓除法/寄存器阶段名或事件顺序视为 Thomas 术语或时序' },
    ],
  },
  {
    id: 'thomas-1867-object',
    family: { en: 'Thomas arithmometer', zh: 'Thomas 算术机' },
    dateOrModel: 'identified 1867 object; NMAH nmah_690683',
    claimType: 'H',
    evidenceStrength: 'E1',
    sourceLabel: 'Smithsonian/NMAH, Thomas Arithmometer, nmah_690683',
    sourceUrl: 'https://americanhistory.si.edu/collections/object/nmah_690683',
    documentedRoles: [
      { en: 'eight setting levers, ADD/MULT versus SUB/DIV selector, operating crank, and a carriage with seven positions', zh: '8 个设定杆、加乘/减除选择器、操作曲柄，以及具有 7 个位置的位架' },
      { en: '9-window revolution register turns clockwise for subtraction/division and counterclockwise for addition/multiplication; result register has 16 windows', zh: '9 窗转数寄存器在减除时顺时针、加乘时逆时针；结果寄存器有 16 窗' },
      { en: 'right knob zeros the revolution register; thumbscrews can enter values in both registers', zh: '右钮清零转数寄存器；两寄存器均可用拇指轮输入数值' },
    ],
    notEstablished: [
      { en: 'one canonical linkage, timing, procedure, or zeroing geometry across Thomas revisions', zh: '跨 Thomas 修订版统一的连杆、时序、流程或清零几何' },
      { en: 'an independently cataloged result-zeroing control on this 1867 object, or 1868 pamphlet procedure applicability', zh: '该 1867 实物上独立编目的结果清零控制，或 1868 说明流程对其适用性' },
    ],
  },
  {
    id: 'thomas-ca1873-object',
    family: { en: 'Thomas arithmometer associated with 1868 pamphlet', zh: '与 1868 说明书关联的 Thomas 算术机' },
    dateOrModel: 'ca. 1873; MA.335215 / nmah_690686; serial 1068',
    claimType: 'H',
    evidenceStrength: 'E1',
    sourceLabel: 'Smithsonian/NMAH, Thomas Arithmometer, MA.335215',
    sourceUrl: 'https://americanhistory.si.edu/collections/object/nmah_690686',
    documentedRoles: [
      { en: 'ten setting levers, ADD/MULT versus SUB/DIV selector, operating crank, movable carriage, 11 multiplier/quotient and 20 result windows', zh: '10 个设定杆、加乘/减除选择器、操作曲柄、活动位架、11 个乘数/商窗与 20 个结果窗' },
      { en: 'right black knob zeros the revolution register and left knob zeros the result register; both registers also have entry thumbscrews', zh: '右侧黑钮清零转数寄存器，左钮清零结果寄存器；两寄存器另有输入拇指轮' },
      { en: 'catalog states that a separately stored instruction book received with this instrument is dated 1868', zh: '目录明确记载随该仪器接收、另存的说明书日期为 1868 年' },
    ],
    notEstablished: [
      { en: 'that every procedure in the incompletely exposed 1868 pamphlet applies unchanged to this ca. 1873 object or to the 1867 object', zh: '未完整公开的 1868 说明书中所有流程均原样适用于约 1873 实物或 1867 实物' },
      { en: 'revolution-register direction, division overshoot/add-back procedure, or hidden zeroing/carriage linkage from this catalog record', zh: '从该目录推断转数寄存器方向、除法超越/加回流程或隐藏清零/位架连杆' },
    ],
  },
  {
    id: 'thomas-ca1820-object',
    family: { en: 'oldest surviving Thomas object boundary', zh: '最早留存 Thomas 实物边界' },
    dateOrModel: 'ca. 1820; nmah_690692; early ribbon-operated object',
    claimType: 'H',
    evidenceStrength: 'E1',
    sourceLabel: 'Smithsonian/NMAH, oldest surviving Thomas Arithmometer, nmah_690692',
    sourceUrl: 'https://americanhistory.si.edu/collections/object/nmah_690692',
    documentedRoles: [
      { en: 'three setting levers plus a multiplication lever, paired red/black result-window sets, and individual result-digit zeroing thumbscrews', zh: '3 个设定杆加 1 个乘法杆、成对红黑结果窗，以及逐位结果清零拇指轮' },
      { en: 'a red ribbon operates this early object; it has no revolution register', zh: '该早期实物由红色拉带驱动，且没有转数寄存器' },
    ],
    notEstablished: [
      { en: 'later crank, dual-register, selector, zeroing, carriage, multiplication, or division procedure on this early object', zh: '把后期曲柄、双寄存器、选择器、清零、位架、乘除流程套用于该早期实物' },
      { en: 'identity between this survivor, the 1820 patent drawings, and later commercial Thomas revisions', zh: '该留存实物、1820 专利图与后续商用 Thomas 修订版之间的同一性' },
    ],
  },
  {
    id: 'odhner-us1510100',
    family: { en: 'Odhner calculating machine patent', zh: 'Odhner 计算机专利' },
    dateOrModel: 'US 1,510,100 (1924), Figs. 1–8',
    claimType: 'H',
    evidenceStrength: 'E1',
    sourceLabel: 'Valentin Jakob Odhner, US1510100A, Calculating Machine',
    sourceUrl: 'https://patents.google.com/patent/US1510100A/en',
    documentedRoles: [
      { en: 'crank and calculating discs have a defined zero-position locking relation', zh: '曲柄与计算盘具有明确的零位锁定关系' },
      { en: 'a guide keeps the crank lock inactive during rotation except at zero', zh: '导向装置在旋转期间保持曲柄锁无效，零位除外' },
      { en: 'the crank-lock relation also locks or liberates disc-setting/cam parts', zh: '曲柄锁关系还会锁定或释放设定盘/凸轮部件' },
    ],
    notEstablished: [
      { en: 'use of the illustrated embodiment by every Odhner-family production machine', zh: '所有 Odhner 系量产机都采用图示实施例' },
      { en: 'the repository interlock event order as patent timing', zh: '把本仓互锁事件顺序视为专利时序' },
    ],
  },
  {
    id: 'felt-us960528',
    family: { en: 'Duplex Comptometer canceling patent', zh: 'Duplex Comptometer 取消机构专利' },
    dateOrModel: 'US 960,528 (1910), Figs. 1–18',
    claimType: 'H',
    evidenceStrength: 'E1',
    sourceLabel: 'Dorr E. Felt, US960528A, Calculating-Machine',
    sourceUrl: 'https://patents.google.com/patent/US960528A/en',
    documentedRoles: [
      { en: 'canceling mechanism is designed for a specified Duplex Comptometer context', zh: '取消机构面向特定 Duplex Comptometer 场景' },
      { en: 'canceling also releases surplus carry-mechanism strain that could jam/lock the machine after improper manipulation', zh: '取消动作还释放错误操作可能累积并导致卡死的进位机构余张力' },
    ],
    notEstablished: [
      { en: 'a generic partial-stroke correction mechanism', zh: '通用的半行程纠错机构' },
      { en: 'identical canceling/carry geometry across all Comptometers', zh: '所有 Comptometer 都有相同的取消/进位几何' },
    ],
  },
  {
    id: 'turck-us1154897',
    family: { en: 'Felt & Tarrant key-driven patent', zh: 'Felt & Tarrant 按键驱动专利' },
    dateOrModel: 'US 1,154,897 (1915), Figs. 1–8',
    claimType: 'H',
    evidenceStrength: 'E1',
    sourceLabel: 'Joseph A. Turck, US1154897A, Calculating-Machine',
    sourceUrl: 'https://patents.google.com/patent/US1154897A/en',
    documentedRoles: [
      { en: 'the register responds immediately to a value-key manipulation', zh: '寄存器直接响应数值键操作' },
      { en: 'no intervening power-providing or power-control key/lever is required', zh: '不需要中间的动力键或动力控制杆' },
    ],
    notEstablished: [
      { en: 'universal Comptometer actuator, carry, or canceling geometry', zh: '通用于所有 Comptometer 的驱动、进位或取消几何' },
      { en: 'simultaneous multi-column timing in the repository model', zh: '本仓模型中的多列同时动作时序' },
    ],
  },
  {
    id: 'ziehm-us1110734',
    family: { en: 'Ziehm Controlled-Key patented design', zh: 'Ziehm Controlled-Key 专利设计' },
    dateOrModel: 'US 1,110,734 (1914), specification pp. 1, 4; claims 11, 16, 19',
    claimType: 'H',
    evidenceStrength: 'E1',
    sourceLabel: 'Kurt F. Ziehm, US1110734A, Calculating-Machine',
    sourceUrl: 'https://patents.google.com/patent/US1110734A/en',
    documentedRoles: [
      { en: 'partial depression and release arrests accumulation in that order and locks keys in other columns', zh: '按键部分下压后松开，会阻止该数位累加并锁住其他列的按键' },
      { en: 'fully depressing the formerly partial key gives the intended accumulation; release key 134 then releases all orders', zh: '把原先未按到底的键完全按下会完成预期累加；随后释放键 134 解除各列锁定' },
      { en: 'pressing release before completing the partial key does not permanently release the lock', zh: '若未先补完整键程便按释放键，锁定不会永久解除' },
    ],
    notEstablished: [
      { en: 'the repository event names, sequence boundaries, exactly-once commit phase, or arithmetic timing as patent timing', zh: '本仓事件名、序列边界、恰好一次提交阶段或算术时序等同专利时序' },
      { en: 'direct patent-to-production mapping for every Model E/F machine or the manual button color/name', zh: '专利与每台 Model E/F 量产机的直接对应，或说明书中的按钮颜色/名称' },
    ],
  },
  {
    id: 'felt-controlled-key-manuals',
    family: { en: 'Felt & Tarrant Controlled-Key operating procedure', zh: 'Felt & Tarrant Controlled-Key 操作流程' },
    dateOrModel: 'Easy Instructions ca. 1920, printed p. 8 / PDF p. 5; Methods 1921, printed pp. IX–XI / PDF pp. 7–8',
    claimType: 'H',
    evidenceStrength: 'E1',
    sourceLabel: 'Felt & Tarrant, Easy Instructions / Methods of Operating the Comptometer',
    sourceUrl: 'https://www.jaapsch.net/mechcalc/pdf/methods1921.pdf',
    documentedRoles: [
      { en: 'in addition, complete or retry the last partially operated key, touch the red Correction/Release Button, then continue from the key that signaled the lock', zh: '加法中补完整或重按最后一个部分操作的键，触碰红色纠错/释放按钮，再从发出锁定信号的键继续' },
      { en: 'all columns except the partial-stroke column lock; multiple partial columns must each be corrected before release succeeds', zh: '除出现部分键程的列外其余各列锁定；若多列均有部分键程，须逐列纠正后才能成功释放' },
      { en: 'multiplication/division guidance says cancel and redo rather than reuse the addition correction recipe', zh: '乘除法指导要求清除并重做，而非沿用加法纠错步骤' },
    ],
    notEstablished: [
      { en: 'identical wording/procedure in every edition or model, hidden trigger/linkage geometry, registration threshold, or physical timing', zh: '所有版本/型号均有相同措辞与流程、隐藏触发/连杆几何、登记阈值或物理时序' },
      { en: 'that integrity recovery is the same control as accumulator clearing/zeroing', zh: '完整性恢复与累加器清除/归零属于同一控制' },
    ],
  },
  {
    id: 'comptometer-model-f-objects',
    family: { en: 'identified Model F objects and Controlled-Key section', zh: '已识别 Model F 实物与 Controlled-Key 剖件' },
    dateOrModel: 'NMAH MA.335357 (1915), MA.333576 (1917); SMG 1921-16',
    claimType: 'H',
    evidenceStrength: 'E1',
    sourceLabel: 'Smithsonian/NMAH Model F records; Science Museum Group 1921-16',
    sourceUrl: 'https://americanhistory.si.edu/collections/object/nmah_690479',
    documentedRoles: [
      { en: 'identified Model F full-keyboard non-printing objects expose keyboard, subtraction levers, result windows and a separate zeroing handle', zh: '已识别的 Model F 全键盘非打印实物显示键盘、减法杆、结果窗与独立归零手柄' },
      { en: 'object patent plates end at 15 September 1914; SMG identifies a Model F controlled-key section', zh: '实物专利铭牌最后日期为 1914 年 9 月 15 日；SMG 确认一件 Model F controlled-key 剖件' },
    ],
    notEstablished: [
      { en: 'that the last plate date proves US 1,110,734 implements the hidden lock in either NMAH object', zh: '铭牌末日期即可证明两件 NMAH 实物的隐藏锁由 US 1,110,734 实现' },
      { en: 'internal recovery geometry or button-by-button procedure from object photographs', zh: '从实物照片推断内部恢复几何或逐按钮流程' },
    ],
  },
  {
    id: 'controlled-key-model-mapping-e3',
    family: { en: 'specialist Model E/F chronology orientation', zh: '专家整理的 Model E/F 年代定位' },
    dateOrModel: 'specialist patent/manual index; production mapping unverified',
    claimType: 'H',
    evidenceStrength: 'E3',
    sourceLabel: 'Jaap Scherphuis, Comptometer manuals/patent orientation',
    sourceUrl: 'https://www.jaapsch.net/mechcalc/comptometer_books.htm',
    documentedRoles: [
      { en: 'navigation to directly scanned Felt & Tarrant editions and Ziehm patent leads', zh: '用于导航至 Felt & Tarrant 原始扫描版本与 Ziehm 专利线索' },
    ],
    notEstablished: [
      { en: 'primary proof that one patent was introduced in one exact commercial Model E/F revision', zh: '某项专利在某一确切 Model E/F 商用修订中引入的一手证明' },
      { en: 'production chronology inferred only from specialist labels or matching dates', zh: '仅凭专家标签或日期相合推断量产年代关系' },
    ],
  },
  {
    id: 'pascaline-complement',
    family: { en: 'Pascaline museum/reconstruction boundary', zh: 'Pascaline 博物馆/复原边界' },
    dateOrModel: 'Pascaline family; ACONIT/Inria + CMU reconstruction',
    claimType: 'H/R',
    evidenceStrength: 'E2',
    sourceLabel: 'ACONIT/Inria La Pascaline; CMU Pascaline reconstruction',
    sourceUrl: 'https://aconit.inria.fr/omeka/exhibits/show/histoire-machines/prehistoire/pascaline.html',
    documentedRoles: [
      { en: 'the described/reconstructed sautoir carry is directional', zh: '资料描述/复原的 sautoir 进位具有方向性' },
      { en: 'subtraction is explained through complementary representation/operator procedure, not simple reversal', zh: '减法通过补数表示/操作流程解释，而非简单反转' },
    ],
    notEstablished: [
      { en: 'source-specific subtraction train geometry or universal digit convention', zh: '特定减法传动几何或通用数字约定' },
      { en: 'the repository carry arrows as Pascaline linkages', zh: '把本仓进位箭头视为 Pascaline 连杆' },
    ],
  },
] as const;

export function getControlEvidenceProfile(id: ControlEvidenceProfile['id']): ControlEvidenceProfile {
  const profile = CONTROL_EVIDENCE_PROFILES.find(item => item.id === id);
  if (!profile) throw new Error(`unknown control evidence profile: ${id}`);
  return profile;
}
