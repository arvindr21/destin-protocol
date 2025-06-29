# GitHub Actions Workflows

This directory contains GitHub Actions workflows that automate validation and quality checks for the DESTIN Protocol repository.

## Workflows Overview

### 1. Schema Validation (`schema-validation.yml`)

**Purpose**: Validates JSON schemas and sample files for correctness and consistency.

**Triggers**:

- Push/PR changes to `protocol-data/` directory
- Changes to `package.json` or `package-lock.json`
- Daily scheduled run at 2 AM UTC

**What it does**:

- Validates JSON schema syntax and structure
- Ensures schema index file is correct
- Validates sample files against their schemas
- Runs on Node.js 18 and 20

### 2. Markdown Lint (`markdown-lint.yml`)

**Purpose**: Ensures markdown files follow consistent formatting rules.

**Triggers**:

- Push/PR changes to any `.md` files
- Changes to markdown configuration files
- Weekly scheduled run on Sundays at 3 AM UTC

**What it does**:

- Lints all markdown files using `markdownlint-cli`
- Applies rules from `.markdownlint.json`
- Respects `.markdownlintignore` exclusions

### 3. Code Format Check (`code-format.yml`)

**Purpose**: Ensures code and configuration files follow consistent formatting.

**Triggers**:

- Push/PR changes to `.js`, `.json`, `.md` files
- Changes to Prettier configuration
- Weekly scheduled run on Saturdays at 4 AM UTC

**What it does**:

- Checks formatting using Prettier
- Validates JSON syntax
- Ensures consistent code style

### 4. Integration Tests (`integration-tests.yml`)

**Purpose**: Runs all validations together for comprehensive quality assurance.

**Triggers**:

- Push/PR to `main` or `develop` branches
- Manual workflow dispatch

**What it does**:

- Runs all validation scripts in sequence
- Provides comprehensive feedback
- Comments on PRs with results
- Uploads test artifacts for debugging

### 5. Commit Lint (`commitlint.yml`)

**Purpose**: Ensures commit messages follow conventional commit format.

**Triggers**:

- All pushes and pull requests

**What it does**:

- Validates commit message format
- Enforces conventional commit standards
- Checks header length (configurable in `commitlint.config.js`)

## Workflow Features

### Path-Based Triggers

Workflows only run when relevant files are changed, improving performance and reducing unnecessary runs.

### Matrix Testing

Key workflows run on multiple Node.js versions (18 and 20) to ensure compatibility.

### Scheduled Runs

Regular scheduled runs catch issues that might be missed during development.

### Artifact Uploads

All workflows upload results as artifacts for debugging and analysis.

### PR Integration

The integration test workflow automatically comments on PRs with results.

## Configuration

### Commit Message Length

Adjust the maximum commit message header length in `commitlint.config.js`:

```javascript
'header-max-length': [2, 'always', 200] // 200 characters
```

### Markdown Linting

Configure markdown rules in `.markdownlint.json`:

```json
{
  "MD013": false, // Disable line length checks
  "MD033": false // Disable HTML tag restrictions
}
```

### Code Formatting

Configure Prettier in `.prettierrc`:

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true
}
```

## Local Development

You can run the same validation scripts locally:

```bash
# Validate schemas
npm run validate-schemas

# Validate sample files
npm run validate-samples

# Lint markdown
npm run lint:markdown

# Check formatting
npm run format:check

# Fix formatting
npm run format
```

## Troubleshooting

### Workflow Failures

1. Check the workflow logs for specific error messages
2. Download artifacts for detailed validation results
3. Run the failing validation locally to debug

### Performance Issues

- Workflows use path-based triggers to avoid unnecessary runs
- Node.js dependency caching is enabled
- Consider adjusting scheduled run frequencies if needed

### False Positives

- Review and adjust validation rules in configuration files
- Use appropriate ignore files (`.markdownlintignore`, `.prettierignore`)
- Consider adding exceptions for specific cases

## Adding New Workflows

When adding new workflows:

1. Follow the existing naming convention (`workflow-name.yml`)
2. Use path-based triggers when possible
3. Include matrix testing for compatibility
4. Add artifact uploads for debugging
5. Update this README with documentation

## Security

- Workflows run in isolated environments
- No secrets are exposed in logs
- Dependencies are pinned to specific versions
- Regular security updates are applied
