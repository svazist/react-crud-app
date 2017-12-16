import React,{Component} from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown';

class AboutComponent extends Component {
    render(){
        return (<div className="row">
                    <div className="col-sm-9 col-md-10 main">
                        <Markdown source={require('@front/static/about.md')} />
                    </div>
                </div> )
    }
}

function mapStateToProps(state) {
    return {
        view: state.view,
    }
}

//
export default connect(mapStateToProps)(AboutComponent)
