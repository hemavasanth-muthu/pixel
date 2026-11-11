@echo off
title Pixel Cinema - Launch Studio App
echo ========================================================
echo   Launching Pixel Cinema ^& Production Task App...
echo ========================================================
cd /d "%~dp0"
echo Starting local development server...
start http://localhost:3000
npm run dev
pause

