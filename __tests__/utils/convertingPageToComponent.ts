import { forEachObj } from '../../src/shared';

export const convertingPageToComponent = (options: any) => {
  const methods: any = {};
  forEachObj(options, (key, value) => {
    if (typeof value === 'function' && key !== 'setup') {
      methods[key] = value;
      delete options[key];
    }
  });
  options.methods = methods;

  return Component(options);
};

export const PageWithSetupForTesting = (options: any) => {
  return convertingPageToComponent(options)
}