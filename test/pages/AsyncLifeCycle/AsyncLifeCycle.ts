import { PageWithSetupForTesting } from '../../utils/convertingPageToComponent'
import { onDetached, onError, onMoved, onReady } from '../../../src'

PageWithSetupForTesting({
  setup() {
    let lifecycleName = 'attached'

    onReady(async () => {
      lifecycleName = await 'ready'
    })
    onMoved(async () => {
      lifecycleName = await 'moved'
    })
    onDetached(async () => {
      lifecycleName = await 'detached'
    })
    onError(async () => {
      lifecycleName = await 'error'
    })

    return () => ({
      lifecycleName,
    })
  },
})
