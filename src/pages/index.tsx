import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import App from "./pre/App"
import "@/global.css"

function IndexPage(){
  return(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  
}
export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
