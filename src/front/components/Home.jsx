import React,{Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";

import * as actions from '@redux/entities/actions/index'
import {MenuItem} from '../ui/tools/bootstrap-links'


class HomeComponent extends Component {
    componentWillMount(){
        this.props.actions.load();
    }

    render(){
        return (<div className="row">
                    <div className="col-sm-9 col-md-10 main">
                        <h1>Доступные справочники</h1>
                        <MenuItem href="/department"> entity-1 </MenuItem>
                        <MenuItem href="/employeer"> entity-2 </MenuItem>
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
        actions: bindActionCreators(actions.METADATA, dispatch),
    }
}


//
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
