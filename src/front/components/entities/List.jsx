import React,{Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";

import * as actions from '@redux/entities/actions'


class ListComponent extends Component {

    render(){
        const { entity } = this.props.match.params
        return ( <h2>ListComponent {entity}</h2> )
    }
}


function mapStateToProps(state,ownProps) {
    return {
        view: state.view,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}


//
export default connect(mapStateToProps, mapDispatchToProps)(ListComponent)
