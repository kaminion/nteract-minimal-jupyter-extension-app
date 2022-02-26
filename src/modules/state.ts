import { makeNotebookRecord } from "@nteract/commutable";
import { actions, AppState, ContentRecord, ContentRef, createContentRef, createHostRef, createKernelRef, createKernelspecsRef, DocumentRecordProps, EditorsRecord, HostRecord, makeAppRecord, makeCommsRecord, makeContentsRecord, makeDocumentRecord, makeDummyContentRecord, makeEditorsRecord, makeEntitiesRecord, makeHostsRecord, makeJupyterHostRecord, makeLocalHostRecord, makeNotebookContentRecord, makeStateRecord, makeTransformsRecord } from "@nteract/core";
import { Media } from "@nteract/outputs";
import { notebook } from "@nteract/reducers/lib/core/entities/contents/notebook";
import Immutable, { Record } from "immutable";
import { JupyterConfigData } from "../utils/config";



//  State 생성 함수, 반환 인터페이스도 나중에 정의 할 것
const makeConfigureState = (config: JupyterConfigData) => {
    
    const hostRef = createHostRef();
    const contentRef = createContentRef();
    const kernelspecsRef = createKernelspecsRef();
    const kernelRef = createKernelRef();

    const NullTransform = () => null;

    // 연결 정보
    const JupyterHostRecord = makeJupyterHostRecord({
        id: null,
        type: "jupyter",
        defaultKernelName: "python",
        origin: location.origin, // Front Pure JS Function
        basePath: config.baseUrl,
        crossDomain: true,
        bookstoreEnabled: true,
        showHeaderEditor: false,
        // 인증, Jupyter 서버에서 credential 설정, xsrf 설정 후 사용하여야 함.
        ajaxOptions: {
            withCredentials: true,
            password: "robot1765" // Config 부분으로 뺄 것
        }
    });
    
    // contents Ref Config
    const initialRefs = Immutable.Map<ContentRef, ContentRecord>().set(
        contentRef,
        makeDummyContentRecord({
            filepath: config.contentsPath
        })
        // makeNotebookContentRecord({
        //     filepath: "/",
        // })
    ); // End Of initialRefs Blocks


    const state: AppState = {
        app: makeAppRecord({
            version: "@nteract/web",
            host: JupyterHostRecord
        }),
        core: makeStateRecord({
            kernelRef: kernelRef,
            currentKernelspecsRef: kernelspecsRef,
            entities: makeEntitiesRecord({
                comms: makeCommsRecord(),
                hosts: makeHostsRecord({
                    byRef: Immutable.Map<string, HostRecord>().set(
                        hostRef,
                        JupyterHostRecord
                    ),
                }),
                contents: makeContentsRecord({
                    byRef: initialRefs
                }),
                transforms: makeTransformsRecord({
                    displayOrder: Immutable.List([
                        "application/vnd.jupyter.widget-view+json",
                        "application/vnd.vega.v5+json",
                        "application/vnd.vega.v4+json",
                        "application/vnd.vega.v3+json",
                        "application/vnd.vega.v2+json",
                        "application/vnd.vegalite.v3+json",
                        "application/vnd.vegalite.v2+json",
                        "application/vnd.vegalite.v1+json",
                        "application/geo+json",
                        "application/vnd.plotly.v1+json",
                        "text/vnd.plotly.v1+html",
                        "application/x-nteract-model-debug+json",
                        "application/vnd.dataresource+json",
                        "application/vdom.v1+json",
                        "application/json",
                        "application/javascript",
                        "text/html",
                        "text/markdown",
                        "text/latex",
                        "image/svg+xml",
                        "image/gif",
                        "image/png",
                        "image/jpeg",
                        "text/plain",
                    ]),
                    byId: Immutable.Map({
                        "text/vnd.plotly.v1+html": NullTransform,
                        "application/vnd.plotly.v1+json": NullTransform,
                        "application/geo+json": NullTransform,
                        "application/x-nteract-model-debug+json": NullTransform,
                        "application/vnd.dataresource+json": NullTransform,
                        "application/vnd.jupyter.widget-view+json": NullTransform,
                        "application/vnd.vegalite.v1+json": NullTransform,
                        "application/vnd.vegalite.v2+json": NullTransform,
                        "application/vnd.vegalite.v3+json": NullTransform,
                        "application/vnd.vega.v2+json": NullTransform,
                        "application/vnd.vega.v3+json": NullTransform,
                        "application/vnd.vega.v4+json": NullTransform,
                        "application/vnd.vega.v5+json": NullTransform,
                        "application/json": Media.Json,
                        "application/javascript": Media.JavaScript,
                        "text/html": Media.HTML,
                        "text/markdown": Media.Markdown,
                        "text/latex": Media.LaTeX,
                        "image/svg+xml": Media.SVG,
                        "image/gif": Media.Image,
                        "image/png": Media.Image,
                        "image/jpeg": Media.Image,
                        "text/plain": Media.Plain,
                    }),
                })
            }),
        })
    };
    return {
        state,
        // 초기 dispatch 시 필요하므로 ref도 반환 함
        ref: {
            hostRef,
            kernelRef,
            kernelspecsRef,
            contentRef,
        } 
    };
};


export default makeConfigureState;