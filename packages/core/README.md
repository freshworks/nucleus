@freshworks/core
==============================================================================

Contains the core design modules of Freshworks DSM:

1. variables
2. animations
3. utilities

To import these stylesheets in your host app, add any/all of the following to your `app.scss` as per your requirement.

```css
@import "nucleus/variables";
@import "nucleus/animations";
@import "nucleus/utilities";
```

To import them in another dependent addon (e.g @freshdesk/button), add the following to the addon's `index.js`:

```js
treeForAddonStyles(tree) {
  let coreStyleTree = new Funnel(this.getCoreStylesPath(), {
    destDir: 'nucleus'
  });
  return mergeTrees([coreStyleTree, tree]);
},

getCoreStylesPath() {
  let pkgPath = path.dirname(require.resolve(`@freshworks/core/package.json`));
  return path.join(pkgPath, 'app/styles');
}
```

**REASON:**

`@nucleus/core`'s app style funnel needs to be merged with the addon's style funnel in order for those files to be recognised by *ember-cli-sass*. More info [here](https://discuss.emberjs.com/t/how-can-i-share-files-css-sass-between-addons/15429/8)
