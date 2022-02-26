import { AppState, reducers, epics as coreEpics } from "@nteract/core";
import { configuration } from "@nteract/mythic-configuration";
import { notifications } from "@nteract/mythic-notifications";
import { makeConfigureStore } from "@nteract/myths";
import { combineReducers, compose } from "redux";
import { contents } from "rx-jupyter";


const { app, core } = reducers;


const composeEnhancers =
    typeof window !== undefined
        ? compose // (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true, traceLimit: 10}) 크롬 extension
        : compose

const configureStore = makeConfigureStore<AppState>()({
    packages: [configuration, notifications],
    reducers: {
        app,
        core: core as any,
    },
    epics: [...coreEpics.allEpics, coreEpics.launchKernelWhenNotebookSetEpic ] as any,
    epicDependencies: { contentProvider: contents.JupyterContentProvider },
    enhancer: composeEnhancers
});


export default configureStore;