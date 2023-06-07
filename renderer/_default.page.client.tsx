export { render }
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import type { PageContextClient } from './types'
import Navigation from '#root/router/navigation'

import React from 'react'

async function render(pageContext:PageContextClient) {
  const { Page } = pageContext
  const apolloClient = makeApolloClient(pageContext.apolloIntialState)

  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined')
  const root = document.getElementById('react-root')
  if (!root) throw new Error('DOM element #react-root not found')
  
  hydrateRoot(
    root,
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Navigation/>
        <Page {...pageContext.pageProps} />
      </BrowserRouter>
    </ApolloProvider>
  )
}
function makeApolloClient(apolloIntialState:NormalizedCacheObject) {
  return new ApolloClient({
    uri: 'https://countries.trevorblades.com',
    cache: new InMemoryCache().restore(apolloIntialState)
  })
}