import { ComponentWithSetup, onMoved } from '@/index'
import { nextTick } from '@/useAutoUpdate'

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
