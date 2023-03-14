import { MutationFunction, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { graphql } from '../../__generated__';

interface AuthProviderState {
  token?: string;
  isLoadingToken: boolean;
  login: MutationFunction<
    { auth: { token: string } },
    { email: string; password: string }
  >;
  signUp: MutationFunction<
    { auth: { token: string } },
    {
      user: {
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        password: string;
        profileImage?: any;
      };
    }
  >;
  logout(): void;
}

const AuthContext = createContext<AuthProviderState>({
  isLoadingToken: false,
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

const LOGIN_MUTATION = graphql(/* GraphQL */ `
  mutation Login($email: String!, $password: String!) {
    auth: login(email: $email, password: $password) {
      token
    }
  }
`);

const SIGN_UP_MUTATION = graphql(/* GraphQL */ `
  mutation SignUpThing($user: SignUpInput!) {
    auth: signUp(user: $user) {
      token
    }
  }
`);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>();
  const [isLoadingToken, setIsLoadingToken] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingToken(true);
      setToken((await AsyncStorage.getItem('token')) ?? undefined);
      setIsLoadingToken(false);
    })();
  }, []);

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: async ({ auth }) => {
      await AsyncStorage.setItem('token', auth.token);
      setToken(auth.token);
    },
  });

  const [signUp] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: async ({ auth }) => {
      await AsyncStorage.setItem('token', auth.token);
      setToken(auth.token);
    },
  });

  const logout = () => {
    setToken(undefined);
    AsyncStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ token, isLoadingToken, login, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthProviderState => useContext(AuthContext);
