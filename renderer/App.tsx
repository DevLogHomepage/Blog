import React from 'react'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { PageContextClient } from './types'


function App({ apolloClient, children }:{apolloClient:ApolloClient<unknown>,children:React.ReactNode}) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}


export default App