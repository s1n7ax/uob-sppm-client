import { useState } from 'react';

export const useEVValueState = (init) => {
  const [value, setValue] = useState(init);
  const callback = (ev) => setValue(ev.target.value);

  return [value, callback];
};
