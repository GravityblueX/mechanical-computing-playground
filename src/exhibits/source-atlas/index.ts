export interface SourceAtlasText { en: string; zh: string; }
export type SourceAtlasTrack = 'difference-engine-no-2' | 'bush-differential-analyzer';
export type SourceAtlasClaimType = 'H' | 'R';
export type SourceAtlasEvidenceStrength = 'E1' | 'E2';
export type SourceAtlasAccessKind = 'direct archive record' | 'direct catalog' | 'institutional reconstruction' | 'bibliographic-only';

export interface NamedMachineSourceAnchor {
  id: string;
  track: SourceAtlasTrack;
  generation: SourceAtlasText;
  sourceTitle: string;
  institution: string;
  sourceUrl: string;
  recordIdentifier: string;
  claimType: SourceAtlasClaimType;
  evidenceStrength: SourceAtlasEvidenceStrength;
  accessKind: SourceAtlasAccessKind;
  inspectedDate: '2026-09-01';
  supports: readonly SourceAtlasText[];
  notEstablished: readonly SourceAtlasText[];
  researchNoteAnchor: string;
  fullFacsimileInspected?: boolean;
  pageFigureAnchors?: readonly string[];
}

const DE_OPEN = [{ en: 'exact tooth counts, linkage paths, synchronization, force/load, tolerances, manufacturing method, or repository event order', zh: '确切齿数、连杆路径、同步、力/负载、公差、制造方法或本站事件顺序' }];
const BUSH_OPEN = [{ en: 'the repository A+B → integrator → tracer wiring, scale values, timing, torque, efficiency, tolerances, or full-machine geometry', zh: '本站 A+B → 积分器 → 描迹器的连接、比例值、时序、扭矩、效率、公差或整机几何' }];

export const NAMED_MACHINE_SOURCE_ANCHORS: readonly NamedMachineSourceAnchor[] = [
  {
    id: 'babbage-papers-index', track: 'difference-engine-no-2', generation: { en: 'Babbage archive, 1821–1905', zh: 'Babbage 档案，1821–1905' }, sourceTitle: 'The Babbage Papers', institution: 'Science Museum Group', sourceUrl: 'https://collection.sciencemuseumgroup.org.uk/documents/aa110000003/the-babbage-papers', recordIdentifier: 'BAB / aa110000003', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct archive record', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/difference-engine-source-map.md#4-babbage-papers-drawing-and-notation-anchors',
    supports: [{ en: 'archive identity, 1821–1905 date span, open access, extent, and the existence of notebooks, engineering drawings, and motion notations', zh: '档案身份、1821–1905 年代范围、开放访问、规模，以及笔记本、工程图和运动记法的存在' }],
    notEstablished: DE_OPEN,
  },
  {
    id: 'bab-a-171', track: 'difference-engine-no-2', generation: { en: 'Babbage DE2 design', zh: 'Babbage 差分机二号设计' }, sourceTitle: 'Addition carriage and mode of driving the axes of Difference Engine No. 2', institution: 'Science Museum Group', sourceUrl: 'https://collection.sciencemuseumgroup.org.uk/documents/aa110000314/addition-carriage-and-mode-of-driving-the-axes-of-difference-engine-no-2', recordIdentifier: 'BAB/A/171 / aa110000314', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct archive record', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/difference-engine-source-map.md#4-babbage-papers-drawing-and-notation-anchors',
    supports: [{ en: 'one-sheet archive identity and catalogued calculation/addition-carriage drive subject', zh: '单张档案身份以及目录所述的计算/加法进位架驱动主题' }],
    notEstablished: [{ en: 'printer timing, printer geometry, exact drive linkage, or historical operating sequence', zh: '打印时序、打印机构几何、确切驱动连杆或历史操作顺序' }],
  },
  {
    id: 'bab-b-013', track: 'difference-engine-no-2', generation: { en: 'Babbage DE2 tracing, 1847–1848', zh: 'Babbage 差分机二号描图，1847–1848' }, sourceTitle: 'End view of inking printing paper and stereotyping apparatus; tracing of BAB/A/172', institution: 'Science Museum Group', sourceUrl: 'https://collection.sciencemuseumgroup.org.uk/documents/aa110000343', recordIdentifier: 'BAB/B/013 / aa110000343', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct archive record', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/difference-engine-source-map.md#4-babbage-papers-drawing-and-notation-anchors',
    supports: [{ en: 'tracing identity, 1847–1848 date, and catalogued inking/printing/paper/stereotyping subject', zh: '描图身份、1847–1848 年代及目录所述着墨/打印/纸张/铸版主题' }], notEstablished: [...DE_OPEN, { en: 'that the complete apparatus was built in Babbage’s lifetime', zh: '完整机构在 Babbage 生前建成' }],
  },
  {
    id: 'bab-b-014', track: 'difference-engine-no-2', generation: { en: 'Babbage DE2 tracing, 1847–1848', zh: 'Babbage 差分机二号描图，1847–1848' }, sourceTitle: 'Plan of inking, printing and stereotype apparatus; tracing of BAB/A/173', institution: 'Science Museum Group', sourceUrl: 'https://collection.sciencemuseumgroup.org.uk/documents/aa110000344', recordIdentifier: 'BAB/B/014 / aa110000344', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct archive record', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/difference-engine-source-map.md#4-babbage-papers-drawing-and-notation-anchors',
    supports: [{ en: 'tracing identity, 1847–1848 date, and catalogued plan subject', zh: '描图身份、1847–1848 年代及目录所述平面图主题' }], notEstablished: [...DE_OPEN, { en: 'that the complete apparatus was built in Babbage’s lifetime', zh: '完整机构在 Babbage 生前建成' }],
  },
  {
    id: 'bab-a-178-3', track: 'difference-engine-no-2', generation: { en: 'Babbage DE2 notation, August 1848', zh: 'Babbage 差分机二号记法，1848 年 8 月' }, sourceTitle: 'Motions of the printing apparatus', institution: 'Science Museum Group', sourceUrl: 'https://collection.sciencemuseumgroup.org.uk/documents/aa110000324', recordIdentifier: 'BAB/A/178/3 / aa110000324', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct archive record', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/difference-engine-source-map.md#4-babbage-papers-drawing-and-notation-anchors',
    supports: [{ en: 'one-sheet notation identity, date, dimensions, and catalogued printing-apparatus motion subject', zh: '单张记法的身份、日期、尺寸及目录所述打印机构运动主题' }], notEstablished: DE_OPEN,
  },
  {
    id: 'de2-reconstruction-1991-2002', track: 'difference-engine-no-2', generation: { en: 'modern institutional reconstruction', zh: '现代机构复原' }, sourceTitle: "Babbage's Difference Engine No 2, 2002", institution: 'Science Museum Group', sourceUrl: 'https://collection.sciencemuseumgroup.org.uk/objects/co62748', recordIdentifier: '1992-556 / co62748', claimType: 'R', evidenceStrength: 'E2', accessKind: 'institutional reconstruction', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/difference-engine-source-map.md#3-difference-engine-no-2-design-versus-reconstruction',
    supports: [{ en: 'Science Museum construction: calculating section completed 1991, printing mechanism added 2002; DE2 was not built in Babbage’s lifetime', zh: 'Science Museum 建造：计算部分 1991 年完成，打印机构 2002 年加入；差分机二号未在 Babbage 生前建成' }],
    notEstablished: [{ en: 'a Babbage-lifetime artifact or automatic identity between reconstructed choices and every original drawing detail', zh: 'Babbage 生前实物，或复原选择与每一项原图细节自动等同' }],
  },
  {
    id: 'smithsonian-da-group', track: 'bush-differential-analyzer', generation: { en: 'original MIT analyzer and later generations', zh: 'MIT 原始分析机及后续世代' }, sourceTitle: 'Differential Analyzer Parts and Documentation', institution: 'Smithsonian/NMAH', sourceUrl: 'https://americanhistory.si.edu/collections/object-groups/mechanical-integrators/differential-analyzers', recordIdentifier: 'NMAH object group', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct catalog', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/differential-analyzer.md#2-smithsoniannational-museum-of-american-history-records',
    supports: [{ en: 'group context distinguishes the ca. 1930 MIT analyzer, improved MIT machine, and postwar GE/UCLA components', zh: '馆藏组语境区分约 1930 年 MIT 分析机、改进型 MIT 机器及战后 GE/UCLA 部件' }], notEstablished: BUSH_OPEN,
  },
  {
    id: 'bush-input-1983-3002-01', track: 'bush-differential-analyzer', generation: { en: 'original MIT analyzer, ca. 1930', zh: 'MIT 原始分析机，约 1930' }, sourceTitle: 'Input Table Carriage from the Bush Differential Analyzer', institution: 'Smithsonian/NMAH', sourceUrl: 'https://www.si.edu/object/input-table-carriage-bush-differential-analyzer%3Anmah_693232', recordIdentifier: '1983.3002.01 / nmah_693232', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct catalog', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/differential-analyzer.md#2-smithsoniannational-museum-of-american-history-records',
    supports: [{ en: 'curve-following pointer motion was transported by a shaft to an appropriate machine part', zh: '沿曲线移动的指针运动由轴传送到机器的相应部分' }], notEstablished: BUSH_OPEN,
  },
  {
    id: 'bush-adder-1983-3002-02', track: 'bush-differential-analyzer', generation: { en: 'original MIT analyzer, ca. 1930', zh: 'MIT 原始分析机，约 1930' }, sourceTitle: 'Adder or Differential Gear from the Bush Differential Analyzer', institution: 'Smithsonian/NMAH', sourceUrl: 'https://www.si.edu/object/nmah_693233', recordIdentifier: '1983.3002.02 / nmah_693233', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct catalog', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/differential-analyzer.md#2-smithsoniannational-museum-of-american-history-records',
    supports: [{ en: 'a differential gear combined rotations of shafts a and b so shaft c represented their sum', zh: '差动齿轮组合 a、b 两轴转动，使 c 轴表示其和' }], notEstablished: BUSH_OPEN,
  },
  {
    id: 'bush-integrator-ma-314824', track: 'bush-differential-analyzer', generation: { en: 'original MIT analyzer, ca. 1930', zh: 'MIT 原始分析机，约 1930' }, sourceTitle: 'Integrator Unit from Bush Differential Analyzer', institution: 'Smithsonian/NMAH', sourceUrl: 'https://www.si.edu/object/integrator-unit-bush-differential-analyzer%3Anmah_1215155', recordIdentifier: 'MA.314824 / nmah_1215155', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct catalog', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/differential-analyzer.md#2-smithsoniannational-museum-of-american-history-records',
    supports: [{ en: 'the catalogued box contains two of six original integrators associated with the MIT analyzer', zh: '目录所载箱体包含与 MIT 分析机相关的六个原始积分器中的两个' }], notEstablished: BUSH_OPEN,
  },
  {
    id: 'bush-tracer-1983-3002-03', track: 'bush-differential-analyzer', generation: { en: 'original MIT analyzer, ca. 1930', zh: 'MIT 原始分析机，约 1930' }, sourceTitle: 'Carriage and Tracer for an Output Table from the Bush Differential Analyzer', institution: 'Smithsonian/NMAH', sourceUrl: 'https://www.si.edu/object/carriage-and-tracer-output-table-bush-differential-analyzer%3Anmah_693234', recordIdentifier: '1983.3002.03 / nmah_693234', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct catalog', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/differential-analyzer.md#2-smithsoniannational-museum-of-american-history-records',
    supports: [{ en: 'result-shaft rotation was transmitted to a tracer that drew results on an output table', zh: '结果轴转动被传送到描迹器，在输出台上绘制结果' }], notEstablished: BUSH_OPEN,
  },
  {
    id: 'bush-frontlash-1983-3002-04', track: 'bush-differential-analyzer', generation: { en: 'original MIT analyzer, ca. 1930', zh: 'MIT 原始分析机，约 1930' }, sourceTitle: 'Frontlash Unit from the Bush Differential Analyzer', institution: 'Smithsonian/NMAH', sourceUrl: 'https://www.si.edu/object/frontlash-unit-bush-differential-analyzer%3Anmah_693235', recordIdentifier: '1983.3002.04 / nmah_693235', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct catalog', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/differential-analyzer.md#2-smithsoniannational-museum-of-american-history-records',
    supports: [{ en: 'museum-described compensation for backlash in a drive between one unit’s output shaft and an adjacent unit’s input shaft', zh: '博物馆所述：补偿一个单元输出轴与相邻单元输入轴之间传动的回差' }],
    notEstablished: [{ en: 'numerical backlash or residual error, exact placement, full-machine wiring, tolerance, efficiency, response time, or torque amplification', zh: '回差或残余误差数值、确切位置、整机连接、公差、效率、响应时间或扭矩放大' }],
  },
  {
    id: 'bush-1931-paper', track: 'bush-differential-analyzer', generation: { en: 'Bush contemporary publication, 1931', zh: 'Bush 同时代论文，1931' }, sourceTitle: 'The Differential Analyzer. A New Machine for Solving Differential Equations', institution: 'Journal of the Franklin Institute / Elsevier DOI record', sourceUrl: 'https://doi.org/10.1016/S0016-0032(31)90616-9', recordIdentifier: 'DOI 10.1016/S0016-0032(31)90616-9; JFI 212(4), 447–488', claimType: 'H', evidenceStrength: 'E1', accessKind: 'bibliographic-only', inspectedDate: '2026-09-01', researchNoteAnchor: 'research/differential-analyzer.md#1-vannevar-bush-1931', fullFacsimileInspected: false, pageFigureAnchors: [],
    supports: [{ en: 'bibliographic identity, author, title, journal, volume/issue, date, and page range', zh: '书目信息：作者、标题、期刊、卷期、日期和页码范围' }],
    notEstablished: [{ en: 'any page quotation, figure-specific geometry, or claim about an unchanged later Differential Analyzer construction', zh: '任何逐页引文、图号级几何或后续微分分析机结构始终不变的说法' }],
  },
] as const;

export function sourceAnchorsForTrack(track: SourceAtlasTrack): readonly NamedMachineSourceAnchor[] {
  return NAMED_MACHINE_SOURCE_ANCHORS.filter(anchor => anchor.track === track);
}

export function getNamedMachineSourceAnchor(id: string): NamedMachineSourceAnchor {
  const anchor = NAMED_MACHINE_SOURCE_ANCHORS.find(item => item.id === id);
  if (!anchor) throw new Error(`unknown named-machine source anchor: ${id}`);
  return anchor;
}
