import { ComponentWithSetup, onMoved } from '../../../src'
import { nextTick } from '../../../src/useAutoUpdate'

ComponentWithSetup({
  async setup() {
    let name = 'attached'

    await nextTick()
    name = 'beforeMove'

    onMoved(() => {
      name = 'moved'
    })

    return () => ({
      name,
    })
  },
})
