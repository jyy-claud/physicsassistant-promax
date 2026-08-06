@echo off
chcp 65001 > nul
title PhysicsAssistant-ProMax
if not exist node_modules (
  echo 正在安装依赖，请稍候...
  call npm install
)
echo 正在启动大学物理智能学习助手 Pro Max...
call npm run dev
pause
