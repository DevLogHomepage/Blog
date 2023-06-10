import * as React from "react"
import {type HeadFC, type PageProps } from "gatsby"
import {Router,Link} from '@reach/router'
import Home from "../component/Home"
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
//https://velog.io/@olwooz/ReactTypeScript-Lazy-loading-preload%EB%A1%9C-Component-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94%ED%95%98%EA%B8%B0
const Contact = React.lazy(() => import('../component/contact'));

const LazyComponent = ({ Component, ...props }:{Component,props:PageProps}) => (
  <React.Suspense fallback={'<p>Loading...</p>'}>
    <Component {...props} />
  </React.Suspense>
);
const IndexPage: React.FC<PageProps> = () => {
  return (
    <main style={pageStyles}>
        <div>
            <h1>Hi people</h1>
            <Link to="/">Home</Link>
            <br />
            <Link to="/contact">Contact</Link>
            <br />

            <input />

            <Router>
                <Home path="/"/>
                <LazyComponent Component={Contact} path="/contact" />
                {/* <LazyComponent Component={About} path="about-us" /> */}
            </Router>
        </div>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
