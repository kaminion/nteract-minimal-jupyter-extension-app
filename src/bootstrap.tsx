import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { actions } from '@nteract/core';

// local modules
import App from './App';
import makeConfigureState from './modules/state';
import { JupyterConfigData } from './utils/config';
import configureStore from './modules/store';



// 설정 읽고 렌더링 시작하는 부분
export async function main(config: JupyterConfigData, rootEl: Element)
{


    const { state, ref: { hostRef, contentRef, kernelRef, kernelspecsRef } } = makeConfigureState(config);

    const store = configureStore(state);

    (window as any).store = store;

    (async () => {
    
    // 필요한 부분 dispatch
    await Promise.all([
        store.dispatch(actions.fetchKernelspecs({ hostRef, kernelspecsRef })),
        store.dispatch(
            actions.fetchContent({
                filepath: config.contentsPath,
                params: {},
                kernelRef,
                contentRef,
            })
        )
        ]);
    })();

    ReactDOM.render(
        <Provider store={store}>
            <App contentRef={contentRef} />
        </Provider>
        , rootEl
    );
}


