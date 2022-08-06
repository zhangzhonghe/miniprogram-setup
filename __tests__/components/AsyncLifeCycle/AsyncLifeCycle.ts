import { ComponentWithSetup, onDetached, onError, onMoved, onReady } from '../../../src';
import { nextTick } from '../../../src/useAutoUpdate';

ComponentWithSetup({
  setup() {
    let lifecycleName = 'attached';

    onReady(async () => {
      lifecycleName = await 'ready';
    });
    onMoved(async () => {
      lifecycleName = await 'moved';
    });
    onDetached(async () => {
      lifecycleName = await 'detached';
    });
    onError(async () => {
      lifecycleName = await 'error';
    });

    return () => ({
      lifecycleName,
    });
  },
});
