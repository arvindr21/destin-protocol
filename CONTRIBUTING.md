# Contributing to DESTIN Protocol

Thank you for your interest in contributing to the DESTIN Protocol! We welcome contributions of all kinds—specification edits, new ideas, bug reports, documentation, and more.

## 📝 How to Contribute

### 1. Propose Changes or Improvements

- **Specification changes:** Major protocol changes should be proposed via a DESTIN Improvement Proposal (DIP). See the [DIP process](spec/destin-v0.1.md#113-destin-improvement-proposals-dips) for details.
- **Minor edits:** For typo fixes, clarifications, or small improvements, feel free to open a pull request directly.

### 2. File Issues

- Use [GitHub Issues](https://github.com/arvindr21/destin-protocol/issues) to report bugs, suggest features, or ask questions.
- Please check for existing issues before opening a new one.

### 3. Join Discussions

- Participate in [GitHub Discussions](https://github.com/arvindr21/destin-protocol/discussions) to share ideas and feedback.
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md) in all interactions.

## 🛠 Development Setup

This project uses automated checks to ensure code quality and consistency.

### Installation

After cloning the repository:

```bash
# Install dependencies (pre-commit hooks are installed automatically)
npm install
```

### Pre-commit Hooks

The following checks run automatically before each commit:

1. **Schema Validation** (`npm run validate-samples`)
   - Validates all JSON sample files against their schemas
   - Ensures protocol data integrity
   - **Blocks commits** if validation fails

2. **Markdown Linting** (`npm run lint`)
   - Checks markdown formatting and style
   - Enforces consistent documentation standards
   - **Warns but allows commits** if issues found

### Manual Checks

You can run these checks manually:

```bash
# Validate protocol samples
npm run validate-samples

# Check markdown formatting
npm run lint

# Fix common markdown issues (if available)
npm run lint:fix
```

### Common Linting Issues

- **Line length**: Keep lines under 80 characters
- **Code blocks**: Add language specifiers (e.g., ``json`, ``bash`)
- **Blank lines**: Add blank lines around headings and code blocks
- **Links**: Use proper markdown link syntax

## 📋 DESTIN Improvement Proposals (DIPs)

For significant protocol changes, follow the DIP process:

1. **Draft**: Create a detailed proposal with rationale and impact analysis
2. **Review**: Open for community feedback and technical review
3. **Vote**: Protocol council votes on the proposal
4. **Implementation**: Approved changes are integrated into the specification

See the [Protocol Governance section](spec/destin-v0.1.md#12-protocol-governance) for detailed DIP requirements.

## 🎯 Contribution Guidelines

- **Be respectful**: Follow our [Code of Conduct](CODE_OF_CONDUCT.md)
- **Be specific**: Provide clear, actionable feedback and suggestions
- **Be patient**: Protocol changes require careful consideration and review
- **Be collaborative**: Work with the community to improve proposals

## 📞 Getting Help

- **Questions**: Use [GitHub Discussions](https://github.com/arvindr21/destin-protocol/discussions)
- **Bugs**: File an [issue](https://github.com/arvindr21/destin-protocol/issues)
- **Ideas**: Start a discussion or propose a DIP

Thank you for helping make DESTIN better! 🚀

## 🧑‍💻 For New Contributors

- Read the [README.md](README.md) for an overview of the project and its structure.
- See [`spec/design-principles.md`](spec/design-principles.md) for the foundational ideas behind DESTIN.
- If you're unsure where to start, look for issues labeled `good first issue` or ask in Discussions.

## 🔧 Development Setup

### Pre-commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) to run automated checks before each commit. When you commit, the following checks will run:

1. **Schema Validation** (Required)
   - Validates all JSON samples against their schemas
   - **Blocks commit** if validation fails
   - Ensures protocol data integrity

2. **Markdown Linting** (Required)
   - Checks markdown formatting and style
   - **Blocks commit** if linting fails
   - Ensures consistent documentation quality

3. **Code Formatting** (Required)
   - Formats code and markdown files
   - **Blocks commit** if formatting fails
   - Ensures consistent code style

### Running Checks Manually

You can run these checks manually to catch issues before committing:

```bash
# Validate protocol samples
npm run validate-samples

# Check markdown formatting
npm run lint

# Format code and documentation
npm run format
```

### Fixing Linting Issues

If you encounter linting errors:

1. **Line length issues**: Break long lines at 80 characters
2. **Missing blank lines**: Add blank lines around headings and lists
3. **Trailing spaces**: Remove trailing whitespace
4. **Code block language**: Add language specifiers to code blocks

## 🛡 Code of Conduct

We are committed to a welcoming, inclusive, and respectful environment. By participating, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md) (to be added).

## 🏗 Project Structure

- **spec/**: Protocol specification and design principles
- **protocol-data/**: JSON schemas, samples, and validation tools
- **.github/**: Templates and CI
- **README.md**: Project entrypoint

## 📜 License

By contributing, you agree that your contributions will be licensed under the Apache 2.0 License.

---

We appreciate your help in making DESTIN a robust, open, and community-driven protocol!
