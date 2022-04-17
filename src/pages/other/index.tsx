import { useEffect } from 'react';

import CustomRouter from '../../modules/Router';

export default function Other() {
  // 自动跳转到劝募页
  useEffect(() => {
    CustomRouter.replceToIndex();
  }, []);
  return <></>;
}
