import { useState } from 'react';

export const useUser = () => {
  const [user] = useState(() => localStorage.getItem('user'));
  return { user };
};
