import React,{Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import { withRouter } from 'react-router-dom'

import * as actions from '@redux/entities/actions/index'

import App from '@ui/App'


class AppComponent extends Component {

    componentWillMount(){
        this.props.actions.load();
    }


    render(){
        return (<App>{this.props.children}</App>)
    }
}
function mapStateToProps(state,ownProps) {
    return {
        route: state.route,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions.METADATA, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent));
