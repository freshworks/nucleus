const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

module.exports = {
  description: 'Generates files and folders for a nucleus component. Populates route, boilerplate documentaion for the component.',
  availableOptions: [
    {
      name: 'description',
      type: String,
      default: ''
    }
  ],
  fileMapTokens(options) {
    return {
      __dasherizedName__() {
        return ('nucleus-' + options.dasherizedModuleName);
      }
    };
  },
  locals(options) {
    const lowercasedName = options.entity.name.toLowerCase();
    const capitalizedName = (lowercasedName).split("-").map((part) => capitalize(part)).join(" ");
    const capitalizedComponentName = (lowercasedName).split("-").map((part) => capitalize(part)).join("");
    return {
      name: lowercasedName,
      capitalizedName: capitalizedName,
      dasherizedComponentName: ('nucleus-' + lowercasedName),
      capitalizedComponentName: ('Nucleus' + capitalizedComponentName),
      description: options.description
    };
  },
  afterInstall(options) {
    const lowercasedName = options.entity.name.toLowerCase();
    const capitalizedName = (lowercasedName).split("-").map((part) => capitalize(part)).join(" ");
    const routerPath = ['packages', '@nucleus', 'tests', 'dummy', 'app', 'router.js'].join('/');
    const docsPath = ['packages', '@nucleus', 'tests', 'dummy', 'app', 'templates', 'docs.hbs'].join('/');
    const packagePath = ['packages', '@nucleus', 'package.json'].join('/');
    return this.insertIntoFile(
      routerPath,
      (`\t\t\tthis.route("nucleus-${lowercasedName}");`),
      {
        after: 'this.route("components", function() {\n'
      }
    ).then(() => {
      return this.insertIntoFile(
        docsPath,
        (`\t\t{{nav.item "${capitalizedName}" "docs.components.nucleus-${lowercasedName}"}}`),
        {
          before: '  {{/viewer.nav}}'
        }
      ).then(() => {
        return this.insertIntoFile(
          packagePath,
          (`\t\t"@freshworks/${lowercasedName}": "^0.1.0",`),
          {
            before: '    "ember-cli-autoprefixer"'
          }
        )
      });
    });
  }
};
