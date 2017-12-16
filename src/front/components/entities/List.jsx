import React,{Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";

import * as Url from 'query-string'
import * as actions from '@redux/entities/actions/index'
import List from '@ui/entities/List'


class ListComponent extends Component {

    constructor(props) {
        super(props);
    }

    loadEntities=({entityId, page, limit,needResetPage})=>{
        page = (needResetPage)? 1 : page;
        this.props.actions.load(entityId, page, limit);
    };

    componentDidMount(){
       this.loadEntities(this.props);
    };

    componentWillReceiveProps(nProps){
        const cProps = this.props;
        let needReload= (cProps.entityId!=nProps.entityId)||
                        (cProps.page!=nProps.page)||
                        (cProps.limit!=nProps.limit);
        if(needReload){
            const needResetPage = cProps.entityId!=nProps.entityId;
            this.loadEntities({...nProps, needResetPage:needResetPage});
        }
    }

    render(){
        return ( <List {...this.props} /> )
    }
}


function mapStateToProps(state, ownProps) {

    const entityId = ownProps.match.params.entity;
    const {page = state.entities.page, limit = state.entities.limit} = Url.parse(ownProps.location.search);

    return {
        ...state.entities,
        fields:(state.metadata.entities[entityId])?state.metadata.entities[entityId].fields:[],
        entityId:entityId,
        page:parseInt(page),
        limit:parseInt(limit),
        history:ownProps.history,
        location:ownProps.location,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions.ENTITIES, dispatch),

    }
}


//
export default connect(mapStateToProps, mapDispatchToProps)(ListComponent)
