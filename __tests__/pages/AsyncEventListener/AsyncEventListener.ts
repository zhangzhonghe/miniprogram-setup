import { PageWithSetupForTesting } from '@tests/utils/convertingPageToComponent'

PageWithSetupForTesting({
  setup() {
    let count = 0

    const increment = async () => {
      count = await getCount()
    }

    return () => ({
      count,
      increment,
    })
  },
})

async function getCount() {
  return 1
}
