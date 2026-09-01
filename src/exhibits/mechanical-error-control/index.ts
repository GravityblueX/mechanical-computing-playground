export interface BilingualErrorControlText { en: string; zh: string; }
export type ErrorControlClaimType = 'H' | 'R';
export type ErrorControlEvidenceStrength = 'E1' | 'E2' | 'E3' | 'E4';
export type MechanicalErrorClass = 'inertia/load' | 'carry scheduling' | 'backlash/transmission';

export interface MechanicalErrorControlProfile {
  id: 'thomas-1865-error-control' | 'odhner-us1377269-error-control' | 'talamini-marchant-us1867603-error-control' | 'bush-frontlash-1983-3002-04';
  family: BilingualErrorControlText;
  dateOrModel: string;
  claimType: ErrorControlClaimType;
  evidenceStrength: ErrorControlEvidenceStrength;
  sourceLabel: string;
  sourceUrl: string;
  errorClass: MechanicalErrorClass;
  documentedProblem: readonly BilingualErrorControlText[];
  documentedControl: readonly BilingualErrorControlText[];
  notEstablished: readonly BilingualErrorControlText[];
}

export const MECHANICAL_ERROR_CONTROL_PROFILES: readonly MechanicalErrorControlProfile[] = [
  {
    id: 'thomas-1865-error-control', family: { en: 'Thomas stepped-drum carry', zh: 'Thomas 阶梯鼓进位' }, dateOrModel: 'French Brevet 68923 (1865)', claimType: 'H', evidenceStrength: 'E1', sourceLabel: 'Charles-Xavier Thomas de Colmar, Brevet No. 68923', sourceUrl: 'https://arithmometre.org/Brevets/PageBrevet1865FR.html', errorClass: 'inertia/load',
    documentedProblem: [
      { en: 'rapid movement could carry a dial one or two teeth too far by acquired motion', zh: '快速运动的惯性可能使表盘多走一到两齿' },
      { en: 'simultaneous older vertical carry loads could lift the dial plate, weaken engagement, and give false results', zh: '旧式多个垂直进位负载同时作用时可能顶起表盘板、削弱啮合并产生错误结果' },
      { en: 'dependent carries required one-after-another action and the carry relation could not safely remain halfway', zh: '相互依赖的进位需要逐一动作，进位关系也不能停在半途' },
    ],
    documentedControl: [
      { en: 'moderation-cylinder/Malta-cross stopping relation, horizontal carry conditioning, successive cylinder phasing, and full-position double springs', zh: '调速圆柱/马耳他十字止动、水平进位触发、阶梯鼓依次错相与完全就位的双弹簧关系' },
    ],
    notEstablished: [{ en: 'safe crank speed, measured loads/failure rate, or universal Thomas production geometry', zh: '安全摇速、实测载荷/故障率或通用于 Thomas 量产机的几何结构' }],
  },
  {
    id: 'odhner-us1377269-error-control', family: { en: 'Valentin Odhner rotary transfer', zh: 'Valentin Odhner 旋转传递' }, dateOrModel: 'US 1,377,269 (1921)', claimType: 'H', evidenceStrength: 'E1', sourceLabel: 'Valentin Jakob Odhner, US1377269A, Transfer Mechanism', sourceUrl: 'https://patents.google.com/patent/US1377269A/en', errorClass: 'carry scheduling',
    documentedProblem: [{ en: 'rapid rotation could throw the adjusted transfer arm back so carry pins did not act and miscalculation occurred', zh: '快速旋转可能把已就位的传递臂撞回，使进位销不动作并导致误算' }],
    documentedControl: [{ en: 'a revised fulcrum/contact relation minimizes the destabilizing turning moment; conical contact is described to increase contact and reduce wear', zh: '改进支点/接触关系减小使传递臂脱位的转矩；锥面接触用于增大接触并减少磨损' }],
    notEstablished: [{ en: 'failure probability, safe RPM, residual error, or universal production adoption', zh: '失效概率、安全转速、残余误差或所有量产机采用情况' }],
  },
  {
    id: 'talamini-marchant-us1867603-error-control', family: { en: 'Talamini/Marchant rotary scheduling', zh: 'Talamini/Marchant 旋转进位调度' }, dateOrModel: 'US 1,867,603 (1932)', claimType: 'H', evidenceStrength: 'E1', sourceLabel: 'Louis Talamini / Marchant, US1867603A, Calculating Machine', sourceUrl: 'https://patents.google.com/patent/US1867603A/en', errorClass: 'carry scheduling',
    documentedProblem: [{ en: 'a carry-created crossing must condition the next order before its later rotary opportunity arrives', zh: '前一次进位造成的越界必须先触发下一位，然后更高位的旋转机会才能到来' }],
    documentedControl: [{ en: 'successively displaced carry opportunities and overlapping positioning/driving phases', zh: '依次错开的进位机会以及相互重叠的就位/驱动阶段' }],
    notEstablished: [{ en: 'Thomas stepped-cylinder geometry, universal implementation, or a universal performance gain', zh: 'Thomas 阶梯鼓几何、普遍量产采用或普遍性能增益' }],
  },
  {
    id: 'bush-frontlash-1983-3002-04', family: { en: 'Bush Differential Analyzer frontlash', zh: 'Bush 微分分析机 frontlash' }, dateOrModel: 'ca. 1930; catalog 1983.3002.04; record nmah_693235', claimType: 'H', evidenceStrength: 'E1', sourceLabel: 'Smithsonian/NMAH, Frontlash Unit from the Bush Differential Analyzer', sourceUrl: 'https://americanhistory.si.edu/collections/object/nmah_693235', errorClass: 'backlash/transmission',
    documentedProblem: [{ en: 'the catalog identifies backlash in a drive between the output shaft of one unit and the input shaft of an adjacent unit', zh: '目录指出一个单元输出轴与相邻单元输入轴之间的传动存在回差问题' }],
    documentedControl: [{ en: 'the museum-described frontlash unit compensated for that backlash', zh: '博物馆所述 frontlash unit 用于补偿该回差' }],
    notEstablished: [{ en: 'numerical backlash or residual error, tolerance, efficiency, response time, torque amplification, or exact full-machine placement/wiring', zh: '回差或残余误差数值、公差、效率、响应时间、扭矩放大或整机中的确切位置/连接' }],
  },
] as const;

export function getMechanicalErrorControlProfile(id: MechanicalErrorControlProfile['id']): MechanicalErrorControlProfile {
  const profile = MECHANICAL_ERROR_CONTROL_PROFILES.find(item => item.id === id);
  if (!profile) throw new Error(`unknown mechanical error-control profile: ${id}`);
  return profile;
}
