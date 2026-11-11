@echo off
title Pixel Cinema - Preview Production Build
echo ========================================================
echo   Launching Pixel Cinema Production Build...
echo ========================================================
cd /d "%~dp0"
start http://localhost:4173
npm run preview -- --port 4173
pause

