import { getRandomPlaceholder } from '@utils/getRandomPlaceholder';
import { useLayoutEffect, useState } from 'react';

const useTextAreaPlaceholder = () => {
  const [textAreaPlaceholder, setTextAreaPlaceholder] = useState('');

  useLayoutEffect(() => {
    setTextAreaPlaceholder(getRandomPlaceholder());
  }, []);

  return { textAreaPlaceholder };
};

export { useTextAreaPlaceholder };