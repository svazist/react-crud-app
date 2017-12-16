import React,{Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";

import * as actions from '@redux/entities/actions/index'
import Index from '@ui/entities/Index'
import Markdown from 'react-markdown';
import {Panel, Table} from 'react-bootstrap'



class HomeComponent extends Component {
    componentWillMount(){
        this.props.actions.load();
    }

    render(){
        return (<div className="row main">
                    <div className="col-sm-3 col-md-4 ">
                        <Index {...this.props} />
                    </div>
                    <div className="col-sm-9 col-md-8 ">
                        <Panel header="О проекте">
                            <Markdown source={require('@front/static/about.md')} />
                        </Panel>
                    </div>
                </div>)
    }
}
function mapStateToProps(state) {
    return {
        view: state.view,
        entities: state.metadata.entities,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions.METADATA, dispatch),
    }
}


//
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
