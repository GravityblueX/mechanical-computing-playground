export type ControlClaimType = 'H' | 'R' | 'H/R';
export type ControlEvidenceStrength = 'E1' | 'E2' | 'E3' | 'E4';
export interface BilingualText { en: string; zh: string; }

export interface ControlEvidenceProfile {
  id: 'thomas-1867-object' | 'odhner-us1510100' | 'felt-us960528' | 'turck-us1154897' | 'pascaline-complement';
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
    id: 'thomas-1867-object',
    family: { en: 'Thomas arithmometer', zh: 'Thomas 算术机' },
    dateOrModel: 'identified 1867 object; NMAH nmah_690683',
    claimType: 'H',
    evidenceStrength: 'E1',
    sourceLabel: 'Smithsonian/NMAH, Thomas Arithmometer, nmah_690683',
    sourceUrl: 'https://americanhistory.si.edu/collections/object/nmah_690683',
    documentedRoles: [
      { en: 'mode lever separates addition/multiplication from subtraction/division', zh: '模式杆区分加法/乘法与减法/除法' },
      { en: 'revolution register direction differs between the two mode groups', zh: '两组模式下转数寄存器方向不同' },
      { en: 'identified Thomas examples document controls for zeroing result/revolution registers', zh: '特定 Thomas 实例记录了结果/转数寄存器的归零控制' },
    ],
    notEstablished: [
      { en: 'one canonical linkage, timing, or zeroing geometry across Thomas revisions', zh: '跨 Thomas 修订版统一的连杆、时序或归零几何' },
      { en: 'contents of uninspected pages in the 1868 instruction pamphlet', zh: '尚未检查的 1868 年说明书页面内容' },
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
