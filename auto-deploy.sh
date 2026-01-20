#!/bin/bash

# =============================================================================
# Innovality Real Estate CRM - ONE-COMMAND DEPLOYMENT
# =============================================================================
# This script deploys your CRM to Vercel in under 5 minutes
# Company: Innovality IT Pvt. Ltd.
# =============================================================================

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Emojis
ROCKET="🚀"
CHECK="✅"
CROSS="❌"
WARN="⚠️"
INFO="ℹ️"
STAR="⭐"

# Banner
clear
echo -e "${PURPLE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║          INNOVALITY REAL ESTATE CRM DEPLOYER               ║"
echo "║                                                            ║"
echo "║              One-Command Deployment Script                 ║"
echo "║                                                            ║"
echo "║              Innovality IT Pvt. Ltd.                       ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${CYAN}This script will deploy your CRM to Vercel automatically.${NC}"
echo -e "${CYAN}Estimated time: 5 minutes${NC}"
echo ""
read -p "Press ENTER to start deployment..."
echo ""

# =============================================================================
# STEP 1: Pre-flight Checks
# =============================================================================
echo -e "${BLUE}${ROCKET} Step 1/6: Running pre-flight checks...${NC}"
echo ""

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}${CHECK} Found ${NODE_VERSION}${NC}"
else
    echo -e "${RED}${CROSS} Not found${NC}"
    echo -e "${YELLOW}Please install Node.js from: https://nodejs.org/${NC}"
    exit 1
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}${CHECK} Found v${NPM_VERSION}${NC}"
else
    echo -e "${RED}${CROSS} Not found${NC}"
    exit 1
fi

# Check Git
echo -n "Checking Git... "
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version | cut -d' ' -f3)
    echo -e "${GREEN}${CHECK} Found v${GIT_VERSION}${NC}"
else
    echo -e "${RED}${CROSS} Not found${NC}"
    echo -e "${YELLOW}Please install Git from: https://git-scm.com/${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}${CHECK} All prerequisites met!${NC}"
echo ""
sleep 1

# =============================================================================
# STEP 2: Install Vercel CLI
# =============================================================================
echo -e "${BLUE}${ROCKET} Step 2/6: Setting up Vercel CLI...${NC}"
echo ""

if command -v vercel &> /dev/null; then
    echo -e "${GREEN}${CHECK} Vercel CLI already installed${NC}"
else
    echo "Installing Vercel CLI..."
    npm install -g vercel
    echo -e "${GREEN}${CHECK} Vercel CLI installed${NC}"
fi

echo ""
sleep 1

# =============================================================================
# STEP 3: Vercel Login
# =============================================================================
echo -e "${BLUE}${ROCKET} Step 3/6: Logging into Vercel...${NC}"
echo ""
echo -e "${YELLOW}${WARN} Your browser will open for authentication${NC}"
echo -e "${YELLOW}${WARN} Please login with GitHub, GitLab, Bitbucket, or Email${NC}"
echo ""
read -p "Press ENTER to open browser and login..."

vercel login

echo ""
echo -e "${GREEN}${CHECK} Logged into Vercel successfully${NC}"
echo ""
sleep 1

# =============================================================================
# STEP 4: Deploy to Vercel
# =============================================================================
echo -e "${BLUE}${ROCKET} Step 4/6: Deploying to Vercel...${NC}"
echo ""
echo -e "${CYAN}Deploying your CRM (this may take 1-2 minutes)...${NC}"
echo ""

# Deploy and capture output
DEPLOY_OUTPUT=$(vercel --prod --yes 2>&1)
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'https://[^\s]+\.vercel\.app' | head -1)

if [ -z "$DEPLOY_URL" ]; then
    echo -e "${RED}${CROSS} Deployment failed${NC}"
    echo "$DEPLOY_OUTPUT"
    exit 1
fi

echo ""
echo -e "${GREEN}${CHECK} Deployment successful!${NC}"
echo ""
sleep 1

# =============================================================================
# STEP 5: MongoDB Setup Guide
# =============================================================================
echo -e "${BLUE}${ROCKET} Step 5/6: MongoDB Atlas Setup${NC}"
echo ""
echo -e "${CYAN}To complete the setup, you need a MongoDB database.${NC}"
echo ""
echo -e "${YELLOW}${INFO} Quick MongoDB Atlas Setup (FREE):${NC}"
echo ""
echo "1. Go to: https://www.mongodb.com/cloud/atlas/register"
echo "2. Sign up (it's free)"
echo "3. Create a FREE cluster (M0 tier)"
echo "4. Create database user with password"
echo "5. Allow network access from anywhere (0.0.0.0/0)"
echo "6. Get connection string (looks like):"
echo "   mongodb+srv://username:password@cluster.mongodb.net/innovality-crm"
echo ""
read -p "Press ENTER when you have your MongoDB connection string ready..."
echo ""

# Get MongoDB URI from user
echo -e "${CYAN}Please paste your MongoDB connection string:${NC}"
read -r MONGODB_URI

# =============================================================================
# STEP 6: Add Environment Variable
# =============================================================================
echo ""
echo -e "${BLUE}${ROCKET} Step 6/6: Adding environment variable...${NC}"
echo ""

# Add environment variable to Vercel
echo "$MONGODB_URI" | vercel env add MONGODB_URI production

echo ""
echo -e "${GREEN}${CHECK} Environment variable added${NC}"
echo ""

# Trigger redeployment
echo "Triggering redeployment with database connected..."
vercel --prod --yes > /dev/null 2>&1

echo ""
echo -e "${GREEN}${CHECK} Redeployment triggered${NC}"
echo ""

# =============================================================================
# SUCCESS!
# =============================================================================
sleep 1
clear
echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║          ${STAR}  DEPLOYMENT SUCCESSFUL!  ${STAR}                     ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${CYAN}${CHECK} Your Innovality Real Estate CRM is now LIVE!${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${PURPLE}${STAR} Your Live URLs:${NC}"
echo ""
echo -e "  ${BLUE}Landing Page:${NC}"
echo -e "  ${GREEN}$DEPLOY_URL/landing.html${NC}"
echo ""
echo -e "  ${BLUE}CRM Dashboard:${NC}"
echo -e "  ${GREEN}$DEPLOY_URL/index.html${NC}"
echo ""
echo -e "  ${BLUE}Live Demo:${NC}"
echo -e "  ${GREEN}$DEPLOY_URL/demo.html${NC}"
echo ""
echo -e "  ${BLUE}API Endpoint:${NC}"
echo -e "  ${GREEN}$DEPLOY_URL/api${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}${INFO} Next Steps:${NC}"
echo ""
echo "1. Visit your URLs above to verify deployment"
echo "2. Run this command to seed sample data:"
echo -e "   ${CYAN}export MONGODB_URI='$MONGODB_URI'${NC}"
echo -e "   ${CYAN}npm run seed${NC}"
echo ""
echo "3. Share your live demo with customers!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}🏢 Innovality IT Pvt. Ltd.${NC}"
echo -e "${CYAN}Professional Real Estate CRM Solution${NC}"
echo ""
echo -e "${PURPLE}${STAR} Deployment completed in under 5 minutes! ${STAR}${NC}"
echo ""

# Open browser to deployed site
if command -v open &> /dev/null; then
    open "$DEPLOY_URL/landing.html"
elif command -v xdg-open &> /dev/null; then
    xdg-open "$DEPLOY_URL/landing.html"
elif command -v start &> /dev/null; then
    start "$DEPLOY_URL/landing.html"
fi

exit 0
