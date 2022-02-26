# Nteract - minimal-jupyter-extension-app

- this is Jupyter Notebook extesion app, this app have minimal config, not include nteract-monorepo

- This Document written by Korean
- If you are not Korean, Please Use English to Question (issues) or Contact to My Email

## Pre-required

- Jupyter-notebook server

email Address : jwsoft0529@gmail.com

# 초기 설정

- 본 저장소는 nteract - jupyter-extension-app 에 기초하며, 해당 문서를 봐도 설정법을 모르시는 경우 issue나 이메일로 연락주시길 바랍니다.

# 바벨 설정

- @babel/core
- @babel/preset-env
- @babel/preset-react

# 모나코 에디터 dependency

- @nteract/monaco-editor (react 버전 이슈 존재)
- 모나코에디터 웹팩 플러그인 이슈 존재 (플러그인 정보)[https://github.com/microsoft/monaco-editor/tree/main/webpack-plugin]

# TS 컴파일 이슈

- 모든 node_modules 폴더 검사하는 이슈
- Change exclude: /node_modules/ to exclude: path.resolve(\_\_dirname, '/node_modules')
- (해결링크)[http://blog.timwheeler.io/webpack-and/]
- export, export default 한 파일에 같이 쓰면 발생하는 문제 commonjs로 바꿔도 안돼서 head script에 var exports = {};로 수정

# 이외 이슈

- 웹 팩 alias설정같은 경우 이들이 사용하는 webpack config 패키지로 해결
- ...configurator.mergeDefaultAliases() 추가 (alias)
- lodash 이슈 - lodash.isequal 모듈 설치
- jupyter trust 이슈 - jupyter trust ./파일명을 포함한 풀 경로 작성
