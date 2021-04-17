import { useState } from 'react';

export const useEVCheckedState = (init) => {
  const [value, setValue] = useState(init);
  const callback = (ev) => setValue(ev.target.checked);

  return [value, callback];
};
