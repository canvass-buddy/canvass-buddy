import type { AppProps } from "next/app";
import "../styles/global.css";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache:new InMemoryCache(),
  link: createUploadLink({
    uri:'http://localhost:4000/graphql'
  })
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client} >
<Component {...pageProps} />
  </ApolloProvider>;
}
