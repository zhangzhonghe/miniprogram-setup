import { runPageSetup } from '../../src/page';
import { forEachObj } from '../../src/shared';

export const convertingPageToComponent = (options: any) => {
  const methods: any = {};
  forEachObj(options, (value, key) => {
    if (typeof value === 'function') {
      if (key === 'setup') {
        return delete options.setup;
      }
      methods[key] = value;
      delete options[key];
    }
  });
  options.methods = methods;

  return Component(options);
};

export const PageWithSetupForTesting = (options: any) => {
  if (options.setup) {
    runPageSetup(options);
  }
  return convertingPageToComponent(options);
};
