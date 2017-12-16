import React,{Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";

import * as actions from '@redux/entities/actions/index'
import Edit from '@ui/entities/Edit'


class EditComponent extends Component {

    componentDidMount(){
        const {itemId, actionsItem,actionsMetadata, entityId} = this.props;
        actionsMetadata.load();
        actionsItem.load(entityId, itemId);
    };
    componentWillUnmount(){
        this.props.actionsItem.clean();
    }

    render(){
        return ( <Edit {...this.props} /> )
    }
}
function mapStateToProps(state,ownProps) {
    const entityId = ownProps.match.params.entity;
    const itemId = parseInt(ownProps.match.params.id);
    const activeItemData = state.entities.entities.find(item => item.id == itemId);

    return {
        activeItem:state.activeItem,
        fields:(state.metadata.entities[entityId])?state.metadata.entities[entityId].fields:[],
        entityId:entityId,
        history:ownProps.history,
        itemId:itemId,
        activeItemData:activeItemData||{}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionsItem: bindActionCreators(actions.ITEM, dispatch),
        actionsMetadata: bindActionCreators(actions.METADATA, dispatch),
    }
}


//
export default connect(mapStateToProps, mapDispatchToProps)(EditComponent)
