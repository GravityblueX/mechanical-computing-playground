export interface SourceAtlasText { en: string; zh: string; }
export type SourceAtlasTrack = 'difference-engine-no-2' | 'bush-differential-analyzer' | 'curta' | 'analytical-engine';
export type SourceAtlasClaimType = 'H' | 'R';
export type SourceAtlasEvidenceStrength = 'E1' | 'E2' | 'E3';
export type SourceAtlasAccessKind = 'direct archive record' | 'direct catalog' | 'institutional reconstruction' | 'bibliographic-only' | 'direct primary facsimile' | 'specialist-hosted primary facsimile' | 'specialist transcription' | 'reconstruction documentation';

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
  documentRole?: 'patent' | 'operator manual' | 'service manual' | 'historical publication' | 'archive drawing' | 'emulator documentation';
  accessHost?: string;
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
  {
    id: 'curta-us2525352', track: 'curta', generation: { en: 'Herzstark patented embodiment, filed 1948/granted 1950', zh: 'Herzstark 专利实施例，1948 申请/1950 授权' }, sourceTitle: 'Calculating Machine', institution: 'United States Patent Office', accessHost: 'Google Patents / Google patent PDF host', sourceUrl: 'https://patents.google.com/patent/US2525352A/en', recordIdentifier: 'US 2,525,352; 2 sheets; 5 claims', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct primary facsimile', inspectedDate: '2026-09-01', documentRole: 'patent', fullFacsimileInspected: true, pageFigureAnchors: ['PDF sheets 1–2; specification pp. 1–4; Figures 1–11'], researchNoteAnchor: 'research/curta-source-map.md#1-curt-herzstark-patent-us-2525352',
    supports: [{ en: 'the patented miniature design places result and revolution counting mechanisms around a common driving member; Figures 1–11 and specification pages 1–4 were inspected', zh: '该专利微型设计把结果与转数计数机构布置在共同驱动构件周围；已检查图 1–11 及说明书第 1–4 页' }],
    notEstablished: [{ en: 'identity with every production Type I or Type II machine, exact repository cylinder geometry, operator procedure, or production revision history', zh: '与每一台量产 Type I/II 完全一致、本站圆筒几何、操作程序或量产修订史' }],
  },
  {
    id: 'curta-operator-guide', track: 'curta', generation: { en: 'Contina operator guide covering Models I and II', zh: '涵盖 Model I 与 II 的 Contina 操作指南' }, sourceTitle: 'Your CURTA Calculator', institution: 'Contina, Manufactory of Office and Calculating Machines Ltd., Vaduz/Liechtenstein', accessHost: 'mycurta.com specialist mirror', sourceUrl: 'https://www.mycurta.com/Documents/Curta-User-Guide-Your-CURTA-Calculator-210810.pdf', recordIdentifier: 'English operator guide; 2-page scan; viewer page 1/2 inspected', claimType: 'H', evidenceStrength: 'E1', accessKind: 'specialist-hosted primary facsimile', inspectedDate: '2026-09-01', documentRole: 'operator manual', fullFacsimileInspected: false, pageFigureAnchors: ['viewer page 1 of 2'], researchNoteAnchor: 'research/curta-source-map.md#2-directly-inspected-operator-and-service-facsimiles',
    supports: [{ en: 'operator-facing handle zero-stop, plus/minus position, carriage movement/locking, setting/result/counter roles, clearing control, and stated capacities I 8×6×11 / II 11×8×15', zh: '面向操作者的曲柄零位、加减位置、滑架移动/锁定、设定/结果/计数角色、清零控制，以及所述 I 8×6×11 / II 11×8×15 容量' }],
    notEstablished: [{ en: 'service linkage geometry, equality of all hidden Type I/II parts, issue date/edition not printed on the inspected page, or identity with the repository interlock state machine', zh: '维修连杆几何、Type I/II 所有隐藏零件相同、已检查页未印出的版本日期，或与本站互锁状态机等同' }],
  },
  {
    id: 'curta-type1-service-1967', track: 'curta', generation: { en: 'Curta Model I service document, 1967', zh: 'Curta Model I 维修文档，1967' }, sourceTitle: 'Service-Manual: Curta Calculating Machine, Model I 8×6×11', institution: 'Contina AG, Mauren, Liechtenstein', accessHost: 'mycurta.com specialist mirror', sourceUrl: 'https://www.mycurta.com/Documents/Curta_1_Servivce_Manual_engl.pdf', recordIdentifier: 'English service manual; 59-page scan; issued autumn 1967; cover inspected', claimType: 'H', evidenceStrength: 'E1', accessKind: 'specialist-hosted primary facsimile', inspectedDate: '2026-09-01', documentRole: 'service manual', fullFacsimileInspected: false, pageFigureAnchors: ['viewer cover 1/59'], researchNoteAnchor: 'research/curta-source-map.md#2-directly-inspected-operator-and-service-facsimiles',
    supports: [{ en: 'document identity as a Contina AG English service manual specifically for Model I 8×6×11, issued autumn 1967', zh: '文档身份：Contina AG 英文维修手册，明确对应 Model I 8×6×11，1967 年秋发布' }],
    notEstablished: [{ en: 'operator instructions, Type II construction, full hidden linkage interpretation, or that every Model I production revision is unchanged', zh: '操作指南、Type II 结构、完整隐藏连杆解释，或所有 Model I 量产修订均不变' }],
  },
  {
    id: 'ae-menabrea-lovelace-1843', track: 'analytical-engine', generation: { en: 'Scientific Memoirs vol. III publication, 1843', zh: '《Scientific Memoirs》第三卷出版物，1843' }, sourceTitle: 'Sketch of the Analytical Engine invented by Charles Babbage, Esq.', institution: 'Richard and John E. Taylor (original publisher)', accessHost: 'Project Gutenberg text preserving printed pages + Wikisource scan images', sourceUrl: 'https://en.wikisource.org/wiki/Scientific_Memoirs/3/Sketch_of_the_Analytical_Engine_invented_by_Charles_Babbage%2C_Esq.', recordIdentifier: 'Scientific Memoirs III, article XXIX; printed pp. 666–731; PG #75107', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct primary facsimile', inspectedDate: '2026-09-01', documentRole: 'historical publication', fullFacsimileInspected: true, pageFigureAnchors: ['printed p. 677: Mill/Store transfer', 'printed p. 679: operation/variable-card table', 'printed p. 704: operation versus variable/distributive roles'], researchNoteAnchor: 'research/analytical-engine-information-flow.md#1-menabrealovelace-1843-direct-facsimile-page-anchors',
    supports: [{ en: 'inspected printed pages distinguish Mill work from stored/variable columns and distinguish operation-card state from variable-card supply/result-location roles', zh: '已检查的印刷页区分 Mill 运算与存储/变量列，并区分操作卡状态与变量卡供数/结果定位角色' }],
    notEstablished: [{ en: 'one frozen final design, exact card holes/readers/synchronization, a complete built Engine, or the repository (ab+c)d event timing', zh: '唯一冻结的最终设计、确切卡孔/读卡器/同步、完整建成的机器，或本站 (ab+c)d 事件时序' }],
  },
  {
    id: 'ae-hpb-1888-transcription', track: 'analytical-engine', generation: { en: 'H. P. Babbage British Association report, 1888', zh: 'H. P. Babbage 英国科学协会报告，1888' }, sourceTitle: 'The Analytical Engine', institution: 'British Association proceedings (historical publication)', accessHost: 'Fourmilab specialist transcription', sourceUrl: 'https://www.fourmilab.ch/babbage/hpb.html', recordIdentifier: 'paper read at Bath, 12 September 1888; items 10–20 inspected in transcription', claimType: 'H', evidenceStrength: 'E3', accessKind: 'specialist transcription', inspectedDate: '2026-09-01', documentRole: 'historical publication', fullFacsimileInspected: false, pageFigureAnchors: [], researchNoteAnchor: 'research/analytical-engine-information-flow.md#2-h-p-babbage-1888-transcription-boundary',
    supports: [{ en: 'transcribed Number/Directive/Operation roles and the reported (ab+c)d flow in numbered items 10–20', zh: '转录文本中的 Number/Directive/Operation 角色及编号 10–20 所报告的 (ab+c)d 流程' }],
    notEstablished: [{ en: 'historical printed page numbers, facsimile typography, exact roller synchronization, or that the repository fixture values/order are historical', zh: '历史印刷页码、影印版式、确切滚筒同步，或本站示例数值/顺序属于历史事实' }],
  },
  {
    id: 'ae-bab-a-125', track: 'analytical-engine', generation: { en: 'Analytical Engine design sheet, December 1843', zh: '分析机设计图纸，1843 年 12 月' }, sourceTitle: 'Plan of consecutive mill counting apparatus for General Plan 28', institution: 'Science Museum Group', sourceUrl: 'https://collection.sciencemuseumgroup.org.uk/documents/aa110000267/plan-of-consecutive-mill-counting-apparatus-for-general-plan-28-plan-note', recordIdentifier: 'BAB/A/125 / aa110000267; one sheet, 65×94 cm', claimType: 'H', evidenceStrength: 'E1', accessKind: 'direct archive record', inspectedDate: '2026-09-01', documentRole: 'archive drawing', researchNoteAnchor: 'research/analytical-engine-information-flow.md#3-science-museum-drawing-records',
    supports: [{ en: 'record identity, December 1843 date, extent/dimensions, and catalogued consecutive Mill counting-apparatus subject', zh: '记录身份、1843 年 12 月日期、张数/尺寸及目录所述连续 Mill 计数机构主题' }],
    notEstablished: [{ en: 'a complete built Analytical Engine, exact Store–Mill linkage, card-reader timing, or repository event sequence', zh: '完整建成的分析机、确切 Store–Mill 连杆、读卡时序或本站事件顺序' }],
  },
  {
    id: 'ae-walker-fourmilab', track: 'analytical-engine', generation: { en: 'modern executable interpretation', zh: '现代可执行解释' }, sourceTitle: 'Analytical Engine Emulator authenticity and programming-card documentation', institution: 'Fourmilab / John Walker', sourceUrl: 'https://www.fourmilab.ch/babbage/authentic.html', recordIdentifier: 'authentic.html + cards.html; inspected 2026-09-01', claimType: 'R', evidenceStrength: 'E2', accessKind: 'reconstruction documentation', inspectedDate: '2026-09-01', documentRole: 'emulator documentation', researchNoteAnchor: 'research/analytical-engine-information-flow.md#4-walkerfourmilab-reconstruction-boundary',
    supports: [{ en: 'the emulator author documents choosing one executable interpretation and merging historically separate card streams into one textual stream', zh: '模拟器作者说明其选择一种可执行解释，并把历史上分离的卡流合并为单一文本流' }],
    notEstablished: [{ en: 'nineteenth-century punched-card syntax, exact historical reader order, a built machine, or identity with this repository P/M reducer', zh: '十九世纪打孔卡语法、确切历史读卡顺序、建成机器，或与本站 P/M reducer 等同' }],
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
