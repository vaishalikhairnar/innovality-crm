@echo off
REM Innovality Real Estate CRM - Windows Deployment Script
REM Company: Innovality IT Pvt. Ltd.

echo ========================================
echo Innovality Real Estate CRM
echo Automated Deployment for Windows
echo ========================================
echo.

REM Check if Git is installed
echo Checking if Git is installed...
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo [OK] Git is installed
echo.

REM Check if Node.js is installed
echo Checking if Node.js is installed...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js is installed
node --version
echo.

REM Check if npm is installed
echo Checking if npm is installed...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    pause
    exit /b 1
)
echo [OK] npm is installed
npm --version
echo.

echo ========================================
echo GitHub Repository Setup
echo ========================================
echo.

echo Please complete these steps:
echo.
echo 1. Go to: https://github.com/new
echo 2. Repository name: innovality-real-estate-crm
echo 3. Description: Professional Real Estate CRM by Innovality IT Pvt. Ltd.
echo 4. Click 'Create repository'
echo.
set /p github_ready="Have you created the repository? (yes/no): "

if /i NOT "%github_ready%"=="yes" (
    echo Please create the repository first and run this script again.
    pause
    exit /b 1
)

echo.
set /p github_username="Enter your GitHub username: "
set /p repo_name="Enter repository name (press Enter for default): "
if "%repo_name%"=="" set repo_name=innovality-real-estate-crm

echo.
echo Initializing Git repository...
git init
git add .
git commit -m "Innovality Real Estate CRM - Production Ready"
echo.

echo Adding GitHub remote...
git remote remove origin 2>nul
git remote add origin https://github.com/%github_username%/%repo_name%.git
git branch -M main
echo.

echo Pushing to GitHub...
echo You may need to enter your GitHub credentials...
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to push to GitHub
    pause
    exit /b 1
)

echo [OK] Code pushed to GitHub successfully!
echo.

echo ========================================
echo Vercel Deployment
echo ========================================
echo.

echo Checking if Vercel CLI is installed...
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Vercel CLI is not installed.
    set /p install_vercel="Install Vercel CLI? (yes/no): "
    if /i "!install_vercel!"=="yes" (
        echo Installing Vercel CLI...
        npm install -g vercel
    ) else (
        echo Vercel CLI is required. Exiting...
        pause
        exit /b 1
    )
)
echo [OK] Vercel CLI is ready
echo.

echo Logging in to Vercel...
vercel login
echo.

echo Deploying to Vercel (production)...
vercel --prod
echo.

echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo [SUCCESS] Your Innovality Real Estate CRM is deployed!
echo.
echo Next Steps:
echo.
echo 1. Set up MongoDB Atlas:
echo    - Go to: https://cloud.mongodb.com
echo    - Create free cluster
echo    - Get connection string
echo.
echo 2. Add environment variable:
echo    - Go to Vercel dashboard
echo    - Settings - Environment Variables
echo    - Add: MONGODB_URI = your_connection_string
echo    - Redeploy
echo.
echo 3. Seed database:
echo    set MONGODB_URI=your_connection_string
echo    npm run seed
echo.
echo Your live demo is ready!
echo.
echo Innovality IT Pvt. Ltd.
echo Professional Real Estate CRM
echo.
pause
