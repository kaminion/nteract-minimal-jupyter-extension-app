import React, { FC } from "react";

import { actions, AppState, ContentRef, selectors } from "@nteract/core";

import Notebook from "./components/notebook";
import {default as JupyterNotebook} from "./notebook/jupyter-notebook";
import NotebookApp from "@nteract/notebook-app-component";
import { NotebookMenu } from "@nteract/connected-components";
import { connect } from "react-redux";
import { notebook } from "@nteract/reducers/lib/core/entities/contents/notebook";
import { Dispatch } from "redux";
import { Cells, CodeCell } from '@nteract/stateful-components';
import Nav, { NavSection } from "./components/nav";


interface ComponentProps {
    contentRef: ContentRef;
}


export const App: FC<ComponentProps> = ({ contentRef }: ComponentProps) => {
    console.log(contentRef);
    return (
        <>
            {/* <JupyterNotebook
                contentRef={contentRef} /> */}
            <Nav>
                <NavSection>
                    <img src=""/>
                </NavSection>
            </Nav>
            <NotebookMenu contentRef={contentRef}/>
            {/* <button>디스패치 버튼</button> */}
            <Notebook contentRef={contentRef} />
            {/* <Cells contentRef={contentRef}>
                <CodeCell contentRef={contentRef}><p>aaass</p></CodeCell>
            </Cells> */}
        </>);
}

export default App;