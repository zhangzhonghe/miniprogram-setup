import { ComponentWithSetup } from '../../../src';

ComponentWithSetup({
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