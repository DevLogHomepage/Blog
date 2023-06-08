// Note that this file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562

import express from 'express'                                                                         //
import compression from 'compression'                                                                 //                
import { renderPage } from 'vite-plugin-ssr/server'                                                   //               
import {createHttpLink} from "@apollo/client/link/http"                                               //      
import { ApolloClient,InMemoryCache } from '@apollo/client/core'                                      // 
import cors from 'cors'                                                                               //

import { root } from './root'                                                                         //                    
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServer } from '@apollo/server'
import { resolvers, typeDefs } from '#root/src/api/graphql'

const isProduction = process.env.NODE_ENV === 'production'                                            // 

startServer()                                                                                         // Start a react.js with express 

async function startServer() {                                                                        
  const app = express()                                                                               // Create a express app

  app.use(compression())                                                                              // Use compression(middle ware)                        
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  await server.start()

  app.use(cors())
  app.use(express.json())
  app.use('/graphql',expressMiddleware(server))

  if (isProduction) {                                                                                 // If production mode
    const sirv = (await import('sirv')).default
    app.use(sirv(`${root}/dist/client`))
  } 
  else {                                                                                              // If development mode
    const vite = await import('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true }
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }

  app.get('*', async (req, res, next) => {
    const apolloClient = makeApolloClient()

    const pageContextInit = {
      urlOriginal: req.originalUrl,
      apolloClient
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    else {
      const { body, statusCode, contentType, earlyHints } = httpResponse
      if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) })
      res.status(statusCode).type(contentType).send(body)
    }

  })


  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

function makeApolloClient() {
  const apolloClient = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://countries.trevorblades.com',
      fetch
    }),
    cache: new InMemoryCache()
  })
  return apolloClient
}
