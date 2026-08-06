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

## 作为真实网站上线（账号 + 跨设备同步）

项目已内置 Supabase Auth、PostgreSQL 数据表、行级安全策略和 Vercel SPA 配置。按以下步骤即可在手机与任意浏览器使用：

1. 在 [Supabase](https://supabase.com) 创建项目，打开 **SQL Editor**，执行 `supabase/schema.sql` 的全部内容。
2. 在 Supabase 的 **Authentication > URL Configuration** 填入将来的站点地址，例如 `https://your-domain.vercel.app`；在 **Project Settings > API** 复制 Project URL 和 anon public key。
3. 将工程上传到你自己的 GitHub 仓库。
4. 在 [Vercel](https://vercel.com) 导入该 GitHub 仓库，Framework 选择 Vite；在 Vercel 的 Environment Variables 中添加：

   ```text
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=你的 anon public key
   ```

5. 点击 Deploy。Vercel 提供的 HTTPS 地址就是可公开访问的网站；也可在 Vercel 绑定自定义域名。

部署后，用户可通过邮箱注册、确认邮箱、登录，练习提交会同步到其独立的 `attempts` 记录中。网站带有 PWA manifest：手机浏览器打开后可选择“添加到主屏幕”，作为独立应用使用。

> 不要把 Supabase 的 `service_role` 密钥放入 Vercel 或前端；仅使用 anon public key。SQL 中的 RLS 策略会确保用户只能访问自己的记录。

## Windows 本地启动

双击 `start.bat`，或在项目根目录运行：

```powershell
npm install
npm run dev
```

浏览器打开终端中显示的本地地址（通常为 `http://localhost:5173`）。

## 开发环境变量

复制 `.env.example` 为 `.env.local` 并填入 Supabase 值后运行本地开发服务。没有配置时可通过登录页“先进入演示模式”使用本地功能。

## 扩展 SQLite / Node.js

保留 `services` 边界：新建 API 服务后，将 `aiService.ts` 及 `useLearningStore.ts` 的读取/写入函数替换为 fetch 调用即可。建议表：users、questions、formulas、attempts、mistakes、study_plans。
