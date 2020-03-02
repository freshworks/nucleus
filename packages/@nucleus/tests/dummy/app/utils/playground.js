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

const generateCode = ({ component, properties, multiline = false }) => {
  let code = `{{${component}`

  let attributes = properties.map((prop) => {
    return {
      name: prop.name,
      value: prop.value,
    }
  });

  attributes.forEach((attr) => {
    let ignoreProp = (attr.value === 'none' || !attr.value);
    if (!ignoreProp) {
      code = `${code}${multiline ? '\n    ': ''} ${attr.name}="${attr.value}"`;
    }
  });

  code = `${code} ${multiline ? '\n  ': ''}}}`

  return code;
};


export {
  registerComputedProperties,
  handlePropertyChange,
  generateCode
};