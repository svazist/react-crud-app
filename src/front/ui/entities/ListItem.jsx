import React, {Component} from 'react'

import {Glyphicon} from 'react-bootstrap'
import {ButtonItem} from '../tools/bootstrap-links'

export default class ListItem extends Component {

    getFields=()=>{
        const {fields} = this.props;
        let out = [];
        for (let item of fields){
            out.push(<td key={'item-'+item.id+'-field'}>{this.props[item.id]}</td>)
        }
        return out;
    }
    render(){

        const {id, entityId} = this.props;
        const viewLink = "/"+entityId+"/"+id+"/view";
        const editLink = "/"+entityId+"/"+id+"/edit";
        const delLink = "/"+entityId+"/"+id+"/del";
        return (<tr>
            <td style={{textAlign:'center'}}>{id}</td>
            {this.getFields()}
            <td>
                  <ButtonItem href={viewLink} button={{bsStyle:"primary",bsSize:"xs"}}>
                      <Glyphicon glyph="eye-open" />
                  </ButtonItem> &nbsp;
                  <ButtonItem href={editLink} button={{bsStyle:"info",bsSize:"xs"}}>
                      <Glyphicon glyph="pencil" />
                  </ButtonItem> &nbsp;
                  <ButtonItem href={delLink} button={{bsStyle:"danger",bsSize:"xs"}}>
                      <Glyphicon glyph="remove" />
                  </ButtonItem>
            </td>
        </tr>)
    }
};
