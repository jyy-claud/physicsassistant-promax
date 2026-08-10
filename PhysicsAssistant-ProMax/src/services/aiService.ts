import type { Question } from '../types';
export type AIRequest = { mode:'知识解释'|'公式解释'|'题目解析'|'学习建议'; prompt:string; question?:Question };
export async function askAI(req: AIRequest) {
  await new Promise(r => setTimeout(r, 500));
  if (req.question) return `【${req.question.knowledgePoint}】\n${req.question.analysis}\n\n公式：${req.question.formula}\n\n建议：${req.question.mistakeReason}`;
  const hints: Record<AIRequest['mode'], string> = { '知识解释':'先建立物理图像：明确研究对象、坐标系与关键过程，再用公式量化。', '公式解释':'请先确认每个变量的物理意义、适用条件和单位，再代入数值。', '题目解析':'推荐四步：读题圈量 → 画图/受力分析 → 列关系式 → 检查量纲与极限。', '学习建议':'以“概念 20 分钟 + 精选练习 25 分钟 + 错题复盘 10 分钟”完成一个高质量学习循环。' };
  return `${hints[req.mode]}\n\n针对“${req.prompt}”，你可以把具体题目或卡住的步骤发给我，我会继续拆解。`;
}
