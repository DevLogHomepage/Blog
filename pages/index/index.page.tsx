import "./main.css"
import Logo from "@/src/component/logo";
import React from "react";
import { Route, Routes } from "react-router-dom";

export {Page};

function Page(){
    return (
      <React.Fragment>
        <main>
          <Logo mode="main"/>
        </main>
        <footer>

        </footer>
      </React.Fragment>

    )
}


