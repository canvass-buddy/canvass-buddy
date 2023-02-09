import { useMutation, MutationFunction } from '@apollo/client';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { gql } from '../../__generated__';

interface AuthProviderState {
  token?: string;
  login: MutationFunction<
    { auth: { token: string } },
    { email: string; password: string }
  >;
  signUp: MutationFunction<
    { auth: { token: string } },
    { email: string; name: string; password: string }
  >;
  logout(): void;
}

const AuthContext = createContext<AuthProviderState>({
  async login() {
    return {};
  },
  async signUp() {
    return {};
  },
  async logout() {
    return;
  },
});

const LOGIN_QUERY = gql(/* GraphQL */ `
  mutation Login($email: String!, $password: String!) {
    auth: login(email: $email, password: $password) {
      token
    }
  }
`);

const SIGN_UP_QUERY = gql(/* GraphQL */ `
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    auth: signUp(password: $password, name: $name, email: $email) {
      token
    }
  }
`);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>();
  const [login] = useMutation(LOGIN_QUERY, {
    onCompleted: ({ auth }) => {
      setToken(auth.token);
    },
  });
  const [signUp] = useMutation(SIGN_UP_QUERY, {
    onCompleted: ({ auth }) => {
      setToken(auth.token);
    },
  });

  const logout = () => {
    setToken(undefined);
  };

  return (
    <AuthContext.Provider value={{ token, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthProviderState => useContext(AuthContext);
