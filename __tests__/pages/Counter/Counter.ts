import { PageWithSetupForTesting } from '@tests/utils/convertingPageToComponent'

PageWithSetupForTesting({
  setup() {
    let count = 0

    const increment = () => {
      count++
    }

    return () => ({
      count,
      increment,
    })
  },
})
