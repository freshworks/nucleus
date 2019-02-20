# How To Contribute

## Welcome!

Thank you for considering contributing to `nucleus`. Below you'll find sections detailing how to become involved to best ensure your contributions are successful and accepted!

### Reporting bugs

Report bugs you've found on the [bug tracker](https://github.com/freshdesk/nucleus/issues). There is a default [bug template](.github/ISSUE_TEMPLATE.md) that will help you through the process.

### Submitting your work

Prior to working on a fix or a new feature, it is ideal to discuss the intention with other contributors of the strike team either via DM/Hangouts.

* Submit your changes as PRs against the `master` branch.

#### Development

Start by cloning the Git project to your local hard drive (Ensure that you have added your [SSH key to the ssh-agent](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#adding-your-ssh-key-to-the-ssh-agent)):

```
git clone git@github.com:freshdesk/nucleus.git
```

#### Link `nucleus` to your development version

Running the following command from your `nucleus` project would ensure it is available for all projects that can link to your development add-on.

```
npm link
```

Running the following command from your project path would consume the `npm link`'ed `nucleus` add-on.

```
npm link nucleus
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

* To run tests locally use `npm run test` or `npm run test:s`.

#### Commit message procedure

All commits should be tagged. Tags are denoted by square brackets (`[]`) and come at the start of the commit message.

* `[CLEANUP]`: commit that removes deprecated functionality
* `[CHORE]`: commit that refactors code or updates dependencies
* `[TEST #<github-issue-id>]`: commit that adds tests for a feature
* `[FEAT #<github-issue-id>]`: commit that adds features
* `[BUGFIX #<github-issue-id>]`: commit that fixes a bug

In general, all commits should fall into one of the above categories.


## Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
