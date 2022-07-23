import path from 'path';
import simulate from 'miniprogram-simulate';

export const getComponent = (componentName: string) => {
  const componentPath = path.resolve(__dirname, `../components/${componentName}/${componentName}`);
  return simulate.render(simulate.load(componentPath));
};
