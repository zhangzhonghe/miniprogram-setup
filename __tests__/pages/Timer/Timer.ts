import { PageWithSetupForTesting } from '../../utils/convertingPageToComponent';

PageWithSetupForTesting({
  setup() {
    let count = 0;

    setTimeout(() => {
      count++;
    });

    const timerId = setInterval(() => {
      count++;
      if (count >= 3) {
        clearInterval(timerId);
      }
    }, 1000);

    return () => ({
      count,
    });
  },
});
