#!/bin/bash

# Innovality Real Estate CRM - Automated Deployment Script
# Company: Innovality IT Pvt. Ltd.

echo "🏢 Innovality Real Estate CRM - Deployment Script"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}➜${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Git is installed
print_step "Checking if Git is installed..."
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi
print_success "Git is installed"

# Check if Node.js is installed
print_step "Checking if Node.js is installed..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi
print_success "Node.js is installed ($(node --version))"

# Check if npm is installed
print_step "Checking if npm is installed..."
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi
print_success "npm is installed ($(npm --version))"

echo ""
echo "=================================================="
echo "📋 Pre-Deployment Setup"
echo "=================================================="
echo ""

# Initialize Git repository
print_step "Initializing Git repository..."
if [ ! -d .git ]; then
    git init
    print_success "Git repository initialized"
else
    print_warning "Git repository already initialized"
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    print_step "Creating .gitignore file..."
    cat > .gitignore << EOF
node_modules/
.env
.env.local
.vercel
*.log
.DS_Store
EOF
    print_success ".gitignore created"
fi

# Add all files
print_step "Adding files to Git..."
git add .
print_success "Files added"

# Commit
print_step "Creating initial commit..."
if git diff-index --quiet HEAD 2>/dev/null; then
    print_warning "No changes to commit"
else
    git commit -m "Innovality Real Estate CRM - Production Ready"
    print_success "Commit created"
fi

echo ""
echo "=================================================="
echo "🔧 GitHub Repository Setup"
echo "=================================================="
echo ""

print_warning "Please complete the following steps:"
echo ""
echo "1. Go to: https://github.com/new"
echo "2. Repository name: innovality-real-estate-crm"
echo "3. Description: Professional Real Estate CRM by Innovality IT Pvt. Ltd."
echo "4. Visibility: Public (or Private)"
echo "5. Click 'Create repository'"
echo ""
read -p "Have you created the GitHub repository? (yes/no): " github_ready

if [ "$github_ready" != "yes" ]; then
    print_error "Please create the GitHub repository first, then run this script again."
    exit 1
fi

echo ""
read -p "Enter your GitHub username: " github_username
read -p "Enter the repository name (default: innovality-real-estate-crm): " repo_name
repo_name=${repo_name:-innovality-real-estate-crm}

# Add remote
print_step "Adding GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$github_username/$repo_name.git"
print_success "Remote added"

# Set default branch to main
print_step "Setting default branch to main..."
git branch -M main
print_success "Default branch set"

# Push to GitHub
print_step "Pushing to GitHub..."
echo ""
print_warning "You may need to enter your GitHub credentials..."
git push -u origin main

if [ $? -eq 0 ]; then
    print_success "Code pushed to GitHub successfully!"
else
    print_error "Failed to push to GitHub. Please check your credentials and try again."
    exit 1
fi

echo ""
echo "=================================================="
echo "☁️  Vercel Deployment"
echo "=================================================="
echo ""

# Check if Vercel CLI is installed
print_step "Checking if Vercel CLI is installed..."
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI is not installed"
    read -p "Would you like to install Vercel CLI? (yes/no): " install_vercel
    
    if [ "$install_vercel" = "yes" ]; then
        print_step "Installing Vercel CLI..."
        npm install -g vercel
        print_success "Vercel CLI installed"
    else
        print_error "Vercel CLI is required for deployment. Exiting..."
        exit 1
    fi
else
    print_success "Vercel CLI is installed"
fi

echo ""
print_step "Logging in to Vercel..."
vercel login

echo ""
print_step "Deploying to Vercel..."
vercel --prod

echo ""
echo "=================================================="
echo "🎉 Deployment Instructions Complete!"
echo "=================================================="
echo ""
print_success "Your Innovality Real Estate CRM has been deployed!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Get your MongoDB Atlas connection string"
echo "   - Go to: https://cloud.mongodb.com"
echo "   - Create a free cluster"
echo "   - Get connection string"
echo ""
echo "2. Add environment variable in Vercel:"
echo "   - Go to: https://vercel.com/dashboard"
echo "   - Select your project"
echo "   - Go to Settings → Environment Variables"
echo "   - Add: MONGODB_URI = your_connection_string"
echo "   - Redeploy the project"
echo ""
echo "3. Seed your database:"
echo "   export MONGODB_URI='your_connection_string'"
echo "   npm run seed"
echo ""
echo "🌐 Your live URLs will be shown above!"
echo ""
echo "🏢 Innovality IT Pvt. Ltd."
echo "   Professional Real Estate CRM Solution"
echo ""
