import { PageWithSetupForTesting } from '../../utils/convertingPageToComponent'

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
