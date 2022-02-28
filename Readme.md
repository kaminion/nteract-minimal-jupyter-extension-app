<a href="https://github.com/nteract/nteract/tree/main/applications/jupyter-extension">
    <img src="https://cloud.githubusercontent.com/assets/836375/15271096/98e4c102-19fe-11e6-999a-a74ffe6e2000.gif" alt="nteract animated logo" style="text-align:center"/>
</a>

# Nteract - minimal-jupyter-extension-app
- If you using the Jupyter-notebook-extension in nteract, **doesn't require yarn to install the entire repo**
- It is Jupyter Notebook extesion app, It have minimal config, not include nteract-monorepo
- I found the minimum way to setup a webpack !
- **You should not installed Nteract MonoRepo** 

- This Document written by Korean
- If you are not Korean, Please Use English to Question (issues) or Contact to My Email
- email Address : jwsoft0529@gmail.com


## Pre-required
- Pre-installed : `Conda` Or `Have Jupyter Notebook Package`
- You have to skill : basic of `react` & `Webpack` Knowledge
- You can see the Other Setting Refer Usage Part of This Document
- Or this link : (Enable to Jupyter-notebook server)[https://github.com/nteract/nteract/tree/main/applications/jupyter-extension]

## Usage
1. install `nteract_on_jupyer` with `pip`:
```
    pip install nteract_on_jupyter
```

2. Install the This Repo (JS)
- At ther base Directory of the this repo(nteract-minimal-jupyter-extension-app) install
```
    npm i
```
3. install/enable `nteract_on_jupyter` (Supporting Python 3.X)
- **Skip: If you have through to Nteract link, you can skip this part**
- Install the Python Package locally from the `/extension` directory (you should see a setup.py here).
```
    cd /extension
    pip install -e .
    jupyter serverextension enable nteract_on_jupyter
```

### Development

- We have four more step:
    1. You Should setup Jupyter Server Setting (cross-origin) 
    2. build the javascript and html assets with webpack
    3. run the Jupyter server 
    4. and Have to Connect not localhost, 127.0.0.1(loopback) address

- Example:
```
    npm run start
    jupyter nteract --NteractConfig.asset_url="http://127.0.0.1:10600"
```
- The `--NteractConfig.asset_url` flag tells the Jupyter server where the webpack server will be serving the assets.


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
