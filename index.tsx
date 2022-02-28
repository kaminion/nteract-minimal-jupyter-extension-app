import React from 'react';

// styles
import "@blueprintjs/core/lib/css/blueprint.css";
// import "@blueprintjs/select/lib/css/blueprint-select.css";

import "codemirror/addon/hint/show-hint.css";
import "codemirror/lib/codemirror.css";

import "@nteract/styles/app.css";
import "@nteract/styles/editor-overrides.css";
import "@nteract/styles/monaco/overrides.css";
import "@nteract/styles/global-variables.css";
import "@nteract/styles/themes/base.css";
import "@nteract/styles/themes/default.css";
import "@nteract/styles/toolbar.css";
import "@nteract/styles/toggle-switch.css";
import "styles/cell-menu.css";
import "styles/sidebar.css";
import "@nteract/styles/command-palette.css";

import { JupyterConfigData, readConfig } from './src/utils/config';


// initalize: 렌더링 / 설정 불러옴
const rootEl = document.getElementById('root');
const dataEl = document.getElementById('jupyter-config-data');

if (!rootEl || !dataEl) {
    alert('렌더링이나 설정값을 불러오지 못하였습니다.')
} else {
    const config: JupyterConfigData = readConfig(rootEl, dataEl);

    // 실제 initial State, Store를 불러오는 코드를 동적으로 호출 함 
    import("./src/bootstrap").then(module => {
        module.main(config, rootEl);
    })
}