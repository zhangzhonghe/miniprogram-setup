import { ComponentWithSetup, onDetached, onError, onMoved, onReady } from '../../../src';

ComponentWithSetup({
  setup() {
    let lifecycleName = 'attached';

    onReady(() => {
      lifecycleName = 'ready';
    });
    onMoved(() => {
      lifecycleName = 'moved';
    });
    onDetached(() => {
      lifecycleName = 'detached';
    });
    onError(() => {
      lifecycleName = 'error';
    });

    return () => ({
      lifecycleName,
    });
  },
});
