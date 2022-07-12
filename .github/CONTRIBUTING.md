## Contributing to Denky

The following is a set of guidelines for contributing to Denky Bot, which are hosted in the denkylabs Organization on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## How Can I Contribute?

**The issue tracker is only for bug reports and enhancement suggestions. If you have a question, please ask it in the [Discord server](https://discord.gg/bVWdscg) instead of opening an issue – you will get redirected there anyway.**
**Support for custom hosted instances will not be provided. Issues with self-hosted instances opened in this repository will be closed immediately.**

### Reporting Bugs

This section guides you through submitting a bug report for Denky Bot. Following these guidelines helps maintainers and the community understand your report 📝, reproduce the behavior 💻 💻, and find related reports 🔎.

> Note: If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### How Do I Submit A (Good) Bug Report?

Explain the problem and include additional details to help maintainers reproduce the problem:

- **Use a clear and descriptive title for the issue to identify the problem.**
- **Describe the exact steps which reproduce the problem in as many details as possible.** For example, start by explaining how you ran a command or tried to use a feature. When listing steps, don't just say what you did, but try to explain how you did it.
- **Describe the behavior you observed after following the steps and point out what exactly is the problem with that behavior.**
- **Explain which behavior you expected to see instead and why.**

### Contribuiting Code

## Setup
To get ready to work on the codebase, please do the following:

1. Fork & clone the repository, and make sure you're on the main branch
2. Run `yarn --immutable` (install)
3. Run `yarn build` to transpile the project using sucrase
4. Code your heart out!
5. Run `yarn lint:fix` to run ESLint and prettier to ensure the styleguide is followed and if any changes are valid
6. [Submit a pull request](https://github.com/denkylabs/denkybot/compare)

#### JavaScript Styleguide
We use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to enforce a consistent coding style, so having that set up in your editor of choice is a great boon to your development process. After making changes, please, run `yarn lint:fix` or `npm run lint:fix` to keep consistency with other files.