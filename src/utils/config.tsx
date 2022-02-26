
// 주피터 노트북에서 렌더링하는 데이터 읽는 역할
import React from 'react';
import { Bookstore } from "@nteract/core";  
import ReactDOM from 'react-dom';

export interface JupyterConfigData {
  token: string;
  page: "tree" | "view" | "edit";
  contentsPath: string;
  baseUrl: string;
  appVersion: string;
  assetUrl: string;
  bookstore: Bookstore;
}


// 임시 에러 페이지
const ErrorPage = (props: { error?: Error }) => (
  <React.Fragment>
    <h1>ERROR</h1>
    <pre>Unable to parse / process the jupyter config data.</pre>
    {props.error ? props.error.message : null}
  </React.Fragment>
);


export function readConfig(
  rootEl: Element,
  dataEl: Element
): JupyterConfigData {

    // 에러 페이지 출력 용
  if (!dataEl) {
    ReactDOM.render(<ErrorPage />, rootEl);
    throw new Error("No jupyter config data element");
  }

  let config: JupyterConfigData;

  try {
    if (!dataEl.textContent) {
      throw new Error("Unable to find Jupyter config data.");
    }
    config = JSON.parse(dataEl.textContent);
  } catch (err : any) {
    ReactDOM.render(<ErrorPage error={err} />, rootEl);
    // Re-throw error
    throw err;
  }

  return config;
}
