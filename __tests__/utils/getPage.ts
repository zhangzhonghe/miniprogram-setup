import path from 'path';
import simulate from 'miniprogram-simulate';

/**
 * miniprogram-simulate 不支持 Page 构造器
 * 目前使用的是使用 Component 构造器模拟的
 * @param pageName 页面名称
 * @returns
 */
export const getPage = (pageName: string) => {
  const pagePath = path.resolve(__dirname, `../pages/${pageName}/${pageName}`);
  return simulate.render(simulate.load(pagePath));
};
