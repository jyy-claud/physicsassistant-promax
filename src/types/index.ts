export type Difficulty = '基础'|'进阶'|'挑战';
export interface Question { id:string; chapter:string; knowledgePoint:string; difficulty:Difficulty; type:'single'; question:string; options:string[]; answer:number; analysis:string; formula:string; mistakeReason:string; }
export interface Formula { id:string; category:string; name:string; expression:string; variables:string; condition:string; errors:string; related:string[]; }
export interface Knowledge { id:string; category:string; name:string; definition:string; formulas:string[]; derivation:string; example:string; traps:string[]; related:string[]; }
