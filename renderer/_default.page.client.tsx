export { render }
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import type { PageContextClient } from './types'
import Navigation from '#root/router/navigation'


async function render(pageContext:PageContextClient) {
  const { Page } = pageContext                                                                    // getting page data from pages folder 
  const apolloClient = makeApolloClient(pageContext.apolloIntialState)                            // making apollo client

  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined')  // 
  const root = document.getElementById('react-root')                                              // getting root element from index.html
  if (!root) throw new Error('DOM element #react-root not found')                                 // error handler for root element
  
  /**
   * 
   */
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

/**
 * making appolo client
 * 
 * @param apolloIntialState `NormalizedCacheObject`
 * @returns ApolloClient
 */
function makeApolloClient(apolloIntialState:NormalizedCacheObject) {
  return new ApolloClient({
    uri: 'https://countries.trevorblades.com',
    cache: new InMemoryCache().restore(apolloIntialState)
  })
}