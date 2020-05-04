# How To Contribute

## Welcome!

Thank you for considering contributing to `nucleus`. Below you'll find sections detailing how to become involved to best ensure your contributions are successful and accepted!

### Reporting bugs

Report bugs you've found on the [bug tracker](https://github.com/freshdesk/nucleus/issues). There is a default [bug template](.github/ISSUE_TEMPLATE.md) that will help you through the process.

### Submitting your work

Prior to working on a fix or a new feature, it is ideal to create an issue with a detailed description of the proposed change.

* Submit your changes as PRs against the `master` branch.
* Mention `Resolves #<github-issue-id>` in the body of your PR if you wish to automatically close the Issue when a PR is merged.
* Please tag your PR to a relevant project for automated tracking and transition in the project board.

#### Commit message / PR naming conventions

All commits should be tagged. Tags should come at the start of the commit message.

General format: `<tag-type> #<github-issue-id>`

* `cleanup`: commit that removes deprecated functionality
* `chore`: commit that refactors code or updates dependencies
* `test #<github-issue-id>`: commit that adds tests for a feature
* `feat #<github-issue-id>`: commit that adds features
* `fix #<github-issue-id>`: commit that fixes a bug

In general, all commits should fall into one of the above categories.

Branches can also be created following the same classification, `<tag-type>/#<github-issue-id>` followed by an optional identifier.

#### Development

Start by cloning the Git project to your local hard drive (Ensure that you have added your [SSH key to the ssh-agent](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#adding-your-ssh-key-to-the-ssh-agent)):

```
git clone git@github.com:freshdesk/nucleus.git
```

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

#### Tests

All PRs should have accompanying tests. For bug-fixes, this should include tests that demonstrate the bug being fixed and test that the solution works.

* Include tests that fail without your code, fix the code, validate if the tests pass and finally raise it as a PR.
* Update the documentation, examples, and guides when affected by your contribution.

#### Running tests

* To run tests locally use `yarn test`.

## Running the documentation application

* `yarn start`
* Visit the dummy application at [http://localhost:1508](http://localhost:1508).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## To create a new component
```
ember g nucleus-component component-name -description="Sample description"
```

- This will take care of creating the necessary files and folders for the new component.
- Will create a basic readme file for the component.
- Will create a dummy documentation page.
- Will add a route for the created documentation page.

#### To get started with the newly created component,
- Go to the the newly created component's folder
```
yarn link
```
- Then copy the component name that is displayed in the terminal
- Go to 'packages/@nucleus' folder
```
yarn link 'copied-component-name'
```
- From the root directory
```
npm run start
```
- You should be able to see the newly created component in the local documentation site.
