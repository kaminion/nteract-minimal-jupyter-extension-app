import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'react';
import { actions, ContentRef, createContentRef, createKernelRef, KernelRef } from '@nteract/core';

// 앱 로딩 시 아무것도 출력 안함
const NotebookPlaceholder = (props: any) => null;


// 상태 및 Props
interface State {
    App: React.ComponentType<{ contentRef: ContentRef }>,
    contentRef: ContentRef
}

interface Props {
    contentRef: ContentRef,
    addTransform(component: any): void,
    fetchContentFulfiled(filepath: string, model: any, contentRef: ContentRef, kernelRef: KernelRef): void
}

class Notebook extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            App: NotebookPlaceholder,
            contentRef: ""
        };
    }

    loadApp() {
        import(
            /* webpackChunkname: "notebook-app-component" */ "@nteract/notebook-app-component"
        ).then(module => {
            this.setState({ App: module.default })
        });
    }

    loadTransform() {
        import(/* webpackChunkname: "ploty" */ "@nteract/transform-plotly").then(
            module => {
                this.props.addTransform(module.default);
                this.props.addTransform(module.PlotlyNullTransform);
            }
        );

        import(/* webpackChunkname: "tabular-dataresource" */ "@nteract/data-explorer").then(
            module => {
                this.props.addTransform(module.default);
            }
        );

        import(/* webpackChunkname: "jupyter-widgets" */ "@nteract/jupyter-widgets").then(
            module => {
                this.props.addTransform(module.default);
            }
        );

        import("@nteract/transform-model-debug").then(module => {
            this.props.addTransform(module.default);
        });


        import(/* webpackChunkName: "vega-transform" */ "@nteract/transform-vega").then(
            module => {
                this.props.addTransform(module.VegaLite1);
                this.props.addTransform(module.VegaLite2);
                this.props.addTransform(module.VegaLite3);
                this.props.addTransform(module.VegaLite4);
                this.props.addTransform(module.Vega2);
                this.props.addTransform(module.Vega3);
                this.props.addTransform(module.Vega4);
                this.props.addTransform(module.Vega5);
            }
        );
    }

    loadContent() {
        // const { contentRef, fetchContentFulfiled } = this.props;

        // if (contentRef === undefined) { 

        //     console.log('uf');

        //     const cr = createContentRef();
        //     const kr = createKernelRef();
        //     this.setState({
        //         ...this.state,
        //         contentRef: cr
        //     });
            
        //     fetchContentFulfiled('/', notebook, cr, kr);
            
        // } else {

        //     this.setState({
        //         ...this.state,
        //         contentRef: contentRef
        //     });

        // }

    }


    componentDidMount() {
        this.loadApp();
        this.loadTransform();
        this.loadContent();

    }

    render() {
        const App = this.state.App;

        return <App contentRef={this.props.contentRef}/>
    }

}

interface InitialProps {
    contentRef: ContentRef
}

const makeMapDispatchProps = (initialDispatch: Dispatch, initialProps: InitialProps) => {
    
    const mapDispatchProps = (dispatch: Dispatch) =>
    {
        return {
            addTransform: (transform: React.ComponentType & { MIMETYPE: string }) =>
            {
                return dispatch(
                    actions.addTransform({
                        mediaType: transform.MIMETYPE,
                        component: transform
                    })
                )
            },
            fetchContentFulfiled: (filepath:string, model:any, contentRef: ContentRef, kernelRef: KernelRef) => (dispatch(actions.fetchContentFulfilled({
                filepath, model, contentRef, kernelRef
            })))
        }
    }
    return mapDispatchProps;
}

export default connect(null, makeMapDispatchProps)(Notebook);