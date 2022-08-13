import path from 'path'
import simulate from 'miniprogram-simulate'

export const getComponent = (componentName: string) => {
  const componentPath = path.resolve(
    __dirname,
    `../components/${componentName}/${componentName}`,
  )

  const component = simulate.load(componentPath)
  const result = simulate.render(component)
  return result
}
