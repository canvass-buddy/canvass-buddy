import { FC, PropsWithChildren } from 'react';
import { AuthProvider } from './AuthProvider/AuthProvider';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
