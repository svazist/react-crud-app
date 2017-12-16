import React,{Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";

import Add  from '@front/ui/entities/Add'

import * as actions from '@redux/entities/actions/index'


class AddComponent extends Component {
    componentDidMount(){
        this.props.actionsMetadata.load();
    };
    componentWillUnmount(){
        this.props.actionsItem.clean();
    }
    render(){
        return ( <Add {...this.props} /> )
    }
}
function mapStateToProps(state,ownProps) {
    const entityId = ownProps.match.params.entity;

    return {
        activeItem:state.activeItem,
        fields:(state.metadata.entities[entityId])?state.metadata.entities[entityId].fields:[],
        entityId:entityId,
        history:ownProps.history,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionsItem: bindActionCreators(actions.ITEM, dispatch),
        actionsMetadata: bindActionCreators(actions.METADATA, dispatch),
    }
}


//
export default connect(mapStateToProps, mapDispatchToProps)(AddComponent)
