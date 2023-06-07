import { gql, useQuery } from "@apollo/client";
import React from "react";
// import "./index.css"

function Page(){
    // const posts = props.data.allPost.edges
    const { data } = useQuery(gql`
    {
      countries {
        code
        name
      }
    }
  `)
    return (
        <React.Fragment>
            <main>
                <ul>{data && data.countries.map((country:any) => <li key={country.code}>{country.name}</li>)}</ul>

            </main>
            <footer>
                
            </footer>
        </React.Fragment>
    )
}






export {Page};

