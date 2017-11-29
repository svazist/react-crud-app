import React,{Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";

import * as actions from '@redux/entities/actions'
import {MenuItem} from '../ui/tools/bootstrap-links'


class HomeComponent extends Component {

    render(){

        // const { entity, id } = this.props.match.params;
        console.log('[HomeComponent]',this.props);

        return (<div className="row">
            <div className="col-sm-9 col-md-10 main">
                <h1>Home page</h1>

                <MenuItem href="/entity1"> entity-1 </MenuItem>
                <MenuItem href="/entity2"> entity-2 </MenuItem>
                <MenuItem href="/entity2/123123"> entity-2/123123 </MenuItem>
                <MenuItem href="/entity2/1333"> entity-2/1333 </MenuItem>
                <MenuItem href="/entity2/1333/edit"> entity-2/1333/edit </MenuItem>
                <MenuItem href="/entity2/1333/view"> entity-2/1333/view </MenuItem>
                <MenuItem href="/entity2/add"> entity-2/add </MenuItem>
            </div>

                </div>)
    }
}
function mapStateToProps(state) {
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
