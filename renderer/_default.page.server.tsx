export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname','apolloIntialState']

import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import { StaticRouter } from 'react-router-dom/server'
import logoUrl from './logo.svg'
import type { PageContextServer } from './types'
import App from './App'

import './global.css'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import React, { ReactNode } from 'react'
import Navigation from '#root/router/navigation'

async function render(pageContext: PageContextServer) {
  const { Page, pageProps,urlPathname,apolloClient } = pageContext
  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
  let tree = (
    <React.Fragment>
      <ApolloProvider client={apolloClient}>
        <StaticRouter location={urlPathname}>
          <Navigation/>
          <Page {...pageProps} />
        </StaticRouter>
      </ApolloProvider>
    </React.Fragment>
  ) 
  const pageHtml = await getDataFromTree(tree)
  const apolloIntialState = apolloClient?.extract()
  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      apolloIntialState
    }
  }
}
