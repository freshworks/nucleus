import { defineProperty, computed, get, set } from '@ember/object';

// registers computed properties dynamically with property names
const registerComputedProperties = (context, elements) => {
  elements.forEach(element => {
    defineProperty(context, element.name, computed('properties', function() {
      return get(context, 'properties').find((prop) => prop.name === element.name);
    }));
  });
};

const handlePropertyChange = (properties, name, value) => {
  let prop = properties.find((prop) => prop.name === name);
  set(prop, 'value', value);
}

const generateCode = (component, attributes, block = false) => {
  let code = `{{${component}`

  attributes.forEach((attr) => {
    let ignoreProp = (attr.value === 'none' || !attr.value);
    if (!ignoreProp) {
      code = `${code}${block ? '\n    ': ''} ${attr.name}="${attr.value}"`;
    }
  });

  code = `${code} ${block ? '\n  ': ''}}}`

  return code;
};


export {
  registerComputedProperties,
  handlePropertyChange,
  generateCode
};