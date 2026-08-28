export type EvidenceLevel = 'KNOWN' | 'INFERRED' | 'TEACHING' | 'UNKNOWN';
export const evidenceLabels: Record<EvidenceLevel, { en: string; zh: string; noteEn: string; noteZh: string }> = {
  KNOWN: { en: 'KNOWN FROM SOURCES', zh: '史料支持的已知事实', noteEn: 'Directly supported by a machine, drawing, manual, or reliable reconstruction.', noteZh: '由实物、原图、手册或可靠重建直接支持。' },
  INFERRED: { en: 'FUNCTIONAL INFERENCE', zh: '有根据的功能推断', noteEn: 'The overall relationship is supported, but the exact physical path is not shown here.', noteZh: '整体功能关系有依据，但这里没有声称具体物理路径。' },
  TEACHING: { en: 'TEACHING ABSTRACTION', zh: '教学抽象', noteEn: 'A deliberately simplified model used to make a behavior stepable.', noteZh: '为了让行为可以单步观察而刻意简化的模型。' },
  UNKNOWN: { en: 'NOT ESTABLISHED HERE', zh: '本项目尚未确认', noteEn: 'Do not read this as a factual reconstruction of hidden parts.', noteZh: '不要把它理解为隐藏零件的事实复原。' },
};
export function evidenceBadge(level: EvidenceLevel, locale: 'en' | 'zh'): string {
  const label = evidenceLabels[level];
  return `<span class="evidence evidence-${level.toLowerCase()}" title="${locale === 'zh' ? label.noteZh : label.noteEn}">${locale === 'zh' ? label.zh : label.en}</span>`;
}
export function evidencePanel(locale: 'en' | 'zh'): string {
  const labels = (Object.keys(evidenceLabels) as EvidenceLevel[]).map((level) => evidenceBadge(level, locale)).join('');
  return `<details class="evidence-panel"><summary>${locale === 'zh' ? '这个图是真的结构吗？先看证据边界' : 'Is this a real internal diagram? Check the evidence boundary first.'}</summary><p>${locale === 'zh' ? '本页把功能关系和实体零件分开。箭头通常表示“影响”，不表示已确认的连杆或齿轮连接。' : 'This page separates functional relationships from physical parts. An arrow usually means “influences”, not a confirmed rod or gear connection.'}</p><div class="evidence-legend">${labels}</div></details>`;
}
