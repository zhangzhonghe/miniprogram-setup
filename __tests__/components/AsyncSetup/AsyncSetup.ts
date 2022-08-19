import { ComponentWithSetup } from '@/index'

ComponentWithSetup({
  data: {
    count: 0,
  },

  async setup() {
    const count = await getCount()

    return () => ({
      count,
    })
  },
})

async function getCount() {
  return 1
}
