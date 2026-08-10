# PhysicsAssistant-ProMax

大学物理智能学习助手 Pro Max。使用 React、TypeScript、Vite、Tailwind CSS、Zustand、Recharts 和 React Router 构建，第一阶段数据完全保存在浏览器 LocalStorage，后续可将 `services` 层替换为 Node.js + SQLite。

## 已实现

- 学习概览、章节知识中心、智能题库、公式中心与学习计划
- 期末模拟答题、自动保存、提交评分和成绩显示
- 错题自动沉淀、错因与复习建议
- Mock AI 教师服务（`src/services/aiService.ts`）
- 响应式科技蓝学习界面

## 数据依据

课程章节覆盖质点运动学、动力学、刚体、热学、静电场、恒定磁场、电磁感应与波动光学；另设近代物理学习模块。题库通过前端种子扩展为 120 道练习题，便于后续替换为教学组审核后的真实题目。

## Windows 启动

双击 `start.bat`，或在项目根目录运行：

```powershell
npm install
npm run dev
```

浏览器打开终端中显示的本地地址（通常为 `http://localhost:5173`）。

## 扩展 SQLite / Node.js

保留 `services` 边界：新建 API 服务后，将 `aiService.ts` 及 `useLearningStore.ts` 的读取/写入函数替换为 fetch 调用即可。建议表：users、questions、formulas、attempts、mistakes、study_plans。
