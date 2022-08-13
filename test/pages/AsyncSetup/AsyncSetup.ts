import { PageWithSetupForTesting } from '../../utils/convertingPageToComponent'

PageWithSetupForTesting({
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
