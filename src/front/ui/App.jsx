import React, {Component} from 'react'
import * as Parts from '@ui/parts'
import '@ui/css/styles.css'

export default class App extends Component{
    render(){
        return (<div>
                    <Parts.Navbar />
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                </div>)
    }
}