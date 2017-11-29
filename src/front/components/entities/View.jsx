import React,{Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";

import * as actions from '@redux/entities/actions'

class ViewComponent extends Component {

    render(){
        const { entity, id } = this.props.match.params;
        return ( <h2>ViewComponent {entity} {id}</h2> )
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewComponent)
