import React,{Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import { withRouter } from 'react-router-dom'

import * as actions from '@redux/entities/actions'

import AppMenu from '@ui/parts/AppMenu'


class MenuComponent extends Component {
    render(){
        return (<AppMenu {...this.props}/>)
    }
}
function mapStateToProps(state,ownProps) {
    return {
        entities: state.metadata.entities,
        route: state.route,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuComponent));
