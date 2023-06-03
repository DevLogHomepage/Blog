import React from "react"
import "./index.css"

export type Mode = 'main' | 'footer'

type props = {
    mode:Mode
}

function logo(props:props){
    const morseCode:number[][] = [[0,0,1,0,1,1,1,1,0,0,1,0,0,0,1,0,1,0,1,0],[1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,1,1,0]];
    return (
        <React.Fragment>
            <div id="LogoDiv" className="logo">
                <div className="morsecode-lines">
                    {
                        morseCode.map(line => {
                            return(
                                <div className="morsecode-line">
                                    {
                                        line.map(bit => {
                                            return (
                                                <div className={`morseCode ${bit ? 'long' : 'short'}`}></div>
                                            )
                                        })
                                    }
                                </div>
                            )

                        })
                    }
                </div>
                <div>
                    FOXSTAR DEVLOG
                </div>
            </div>
        </React.Fragment>
    )
}

export default logo