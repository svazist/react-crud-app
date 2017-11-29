import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'

import * as Parts from '../parts'
import {connect} from "react-redux";

class Container extends Component{
    render(){
        return (<div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">
                        <Parts.Menu />
                    </div>
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        {this.props.children}
                    </div>
                </div> )
    }
}
function mapStateToProps(state,ownProps) {
    console.log('[AppComponent] state:',state,  ' ownProps ',ownProps, ' arguments', arguments);
    return {
        route: state.route,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // actions: bindActionCreators(actions, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));
