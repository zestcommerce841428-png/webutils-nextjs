# CI/CD Pipeline Documentation

## Overview
This project uses a comprehensive CI/CD pipeline with GitHub Actions and Vercel for automated testing, building, and deployment.

## Pipeline Architecture

### 1. GitHub Actions Workflows

#### CI/CD Pipeline (`ci-cd.yml`)
Runs on every push and pull request to `main` and `develop` branches.

**Jobs:**
- **Lint and Type Check**: ESLint and TypeScript validation
- **Build**: Compiles Next.js application
- **Security Scan**: npm audit for vulnerabilities
- **Deploy Preview**: Automatic preview deployments for PRs
- **Deploy Production**: Automatic production deployment for main branch

#### Code Quality (`code-quality.yml`)
Additional code quality checks.

**Jobs:**
- **Code Quality Analysis**: Prettier formatting, bundle size analysis
- **Dependency Review**: Security scanning for dependencies in PRs

### 2. Vercel Integration

Vercel automatically:
- ✅ Deploys every commit to `main` → Production
- ✅ Creates preview URLs for every PR
- ✅ Runs builds with caching for faster deployments
- ✅ Provides instant rollbacks if needed
- ✅ CDN distribution globally

## Workflow Triggers

### Automatic Triggers
- **Push to `main`**: Full CI/CD → Production deployment
- **Push to `develop`**: CI checks only
- **Pull Request**: CI checks + Preview deployment
- **Manual**: Can be triggered via GitHub UI

### Pipeline Stages

```
┌─────────────┐
│   Commit    │
└──────┬──────┘
       │
       ├──────────────────┐
       │                  │
┌──────▼─────┐   ┌────────▼────────┐
│ Lint/Type  │   │  Security Scan  │
│   Check    │   │                 │
└──────┬─────┘   └────────┬────────┘
       │                  │
       └──────┬───────────┘
              │
       ┌──────▼──────┐
       │    Build    │
       └──────┬──────┘
              │
       ┌──────▼──────┐
       │   Deploy    │
       │  (Vercel)   │
       └─────────────┘
```

## Deployment Environments

### Production
- **URL**: https://webutils-nextjs.vercel.app
- **Branch**: `main`
- **Trigger**: Automatic on push to main
- **Protection**: Requires all CI checks to pass

### Preview
- **URL**: Auto-generated per PR (e.g., `webutils-nextjs-pr-123.vercel.app`)
- **Branch**: Any PR branch
- **Trigger**: Automatic on PR creation/update
- **Purpose**: Test changes before merging

### Development
- **URL**: http://localhost:3001
- **Branch**: Any local branch
- **Trigger**: `npm run dev`
- **Purpose**: Local development and testing

## Environment Variables

Set in Vercel Dashboard (vercel.com):
- `NODE_ENV=production` (automatic)
- Add custom env vars as needed

## Build Configuration

### Next.js Build
```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

### Build Performance
- **Build Time**: ~25-40 seconds
- **Cache**: Enabled (npm + Next.js)
- **Output**: Static + Server components
- **Turbopack**: Enabled for faster builds

## Status Badges

Add these to README.md:

```markdown
![CI/CD](https://github.com/zestcommerce841428-png/webutils-nextjs/workflows/CI/CD%20Pipeline/badge.svg)
![Code Quality](https://github.com/zestcommerce841428-png/webutils-nextjs/workflows/Code%20Quality%20Checks/badge.svg)
```

## Monitoring & Logs

### GitHub Actions
- View workflow runs: `Actions` tab on GitHub
- Check build logs: Click on any workflow run
- Debug failures: Download artifacts if available

### Vercel Dashboard
- View deployments: https://vercel.com/dashboard
- Check logs: Click on any deployment
- Monitor analytics: Built-in analytics dashboard

## Rollback Procedure

### Via Vercel Dashboard:
1. Go to project dashboard
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

### Via Git:
```bash
git revert <commit-hash>
git push origin main
```

## Best Practices

1. **Always create PRs** - Never push directly to main
2. **Wait for CI** - Ensure all checks pass before merging
3. **Review Preview** - Test preview deployment before merging
4. **Monitor Deployments** - Check Vercel dashboard after deploy
5. **Semantic Commits** - Use conventional commit messages

## Continuous Improvement

- Pipeline runs on every commit
- Builds are cached for speed
- Security scans on every PR
- Automatic dependency updates (optional: Dependabot)

## Troubleshooting

### Build Failures
- Check GitHub Actions logs
- Run `npm run build` locally
- Verify all dependencies installed

### Deployment Issues
- Check Vercel deployment logs
- Verify environment variables
- Check build output in Actions

### Type Errors
- Run `npx tsc --noEmit` locally
- Fix TypeScript errors before pushing
- Ensure all imports are correct

## Manual Deployment

If needed, deploy manually:

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

## Security

- Automatic security audits on every PR
- Dependency vulnerability scanning
- Security headers configured in vercel.json
- No secrets in code (use environment variables)

## Performance

- Edge network deployment
- Automatic CDN caching
- Image optimization
- Code splitting
- Lazy loading

---

**Pipeline Status**: ✅ Active and Running
**Last Updated**: 2026-06-14
