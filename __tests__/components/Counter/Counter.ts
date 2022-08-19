import { ComponentWithSetup } from '@/index';

ComponentWithSetup({
  setup() {
    let count = 0;

    const increment = () => {
      count++;
    };

    return () => ({
      count,
      increment,
    });
  },
});
