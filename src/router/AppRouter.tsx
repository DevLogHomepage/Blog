import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as React from "react"
import Main from "@/pages/main"
import Tech from "@/pages/tech";
import Navigation from "./navigation";
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route path="/"  element={<Main/>}></Route>
                <Route path="/tech/*" element={<Tech/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;