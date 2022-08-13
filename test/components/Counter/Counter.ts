import { ComponentWithSetup } from '../../../src'

ComponentWithSetup({
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
