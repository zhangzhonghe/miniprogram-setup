import { PageWithSetupForTesting } from '../../utils/convertingPageToComponent'
import { onDetached, onError, onMoved, onReady } from '../../../src'

PageWithSetupForTesting({
  setup() {
    let lifecycleName = 'attached'

    onReady(() => {
      lifecycleName = 'ready'
    })
    onMoved(() => {
      lifecycleName = 'moved'
    })
    onDetached(() => {
      lifecycleName = 'detached'
    })
    onError(() => {
      lifecycleName = 'error'
    })

    return () => ({
      lifecycleName,
    })
  },
})
