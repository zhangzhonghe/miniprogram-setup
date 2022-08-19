import { PageWithSetupForTesting } from '@tests/utils/convertingPageToComponent';

PageWithSetupForTesting({
  data: {
    count: 0,
  },

  async setup() {
    let count = await getCount();

    return () => ({
      count,
    });
  }
})

async function getCount() {
  return 1;
}