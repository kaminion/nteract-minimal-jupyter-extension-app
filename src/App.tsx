import React, { FC } from "react";

import { ContentRef } from "@nteract/core";

import Notebook from "./components/notebook";
import {default as JupyterNotebook} from "./notebook/jupyter-notebook";
import { NotebookMenu } from "@nteract/connected-components";
import Nav, { NavSection } from "./components/nav";


interface ComponentProps {
    contentRef: ContentRef;
}


export const App: FC<ComponentProps> = ({ contentRef }: ComponentProps) => {
    return (
        <>
            <JupyterNotebook
                contentRef={contentRef} />
            {/* <Nav>
                <NavSection>
                    <img src=""/>
                </NavSection>
            </Nav>
            <NotebookMenu contentRef={contentRef}/>
            <Notebook contentRef={contentRef} /> */}
        </>);
}

export default App;