@echo off
echo Starting dev server...
start /B npm run dev
timeout /t 5 > nul

echo Running test...
node test-simple.js

pause 