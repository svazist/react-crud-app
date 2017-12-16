import React, {Component} from 'react'
import {FormControl, FormGroup, Panel, HelpBlock,Pagination, ControlLabel, Button, Glyphicon} from 'react-bootstrap'

import Formsy from 'formsy-react';
import ListItem from './ListItem'
import {Table} from 'react-bootstrap'
import * as Url from 'query-string'
import {ButtonItem} from '../tools/bootstrap-links'


export default class List extends Component {

    constructor(props) {
        super(props);

        this.state = {}
        this.props = {
            entities: []
        }
    }

    getItems = () => {
        const {entities, fields, entityId,history} = this.props;
        return entities.map(item => <ListItem key={"item-" + item.id} {...item} history={history} entityId={entityId} fields={fields} />)
    };

    changePage=(eventKey)=>{
        const {history} = this.props;
        // debugger
        history.push({
            pathname: history.location.pathname,
            search: Url.stringify({...(Url.parse(history.location.search)), page: eventKey })
        });
    }

    render() {

        const {entityId,entities, fields, total, page, limit} = this.props;

        let items = <tr><td colSpan={2}>Нет элементов</td></tr>;
        let header = '';
        if(entities.length > 0){
            items = this.getItems();
        }
        if(fields.length > 0){
            header = fields.map(item=><th key={item.id}>{item.title}</th>);
        }

        let footer = null;
        if(total > limit){
            const pageNum = Math.ceil(total / limit);
            footer = (<Pagination
                style={{margin:'0 0'}}
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                items={pageNum}
                onSelect={this.changePage}
                activePage={page} />)
        }

        const addLink = "/"+entityId+"/add";
        // debugger;
        return (<Panel header="Список элементов" footer={footer}>
            <ButtonItem href={addLink} button={{bsStyle:"success"}} >
                <Glyphicon glyph={"plus"} />&nbsp; Создать элемент
            </ButtonItem>
                <Table fill responsive hover striped>
                    <thead>
                    <tr>
                        <th style={{width:40,textAlign:'center'}}>ID</th>
                        {header}
                        <th style={{width:120}}>Действия</th>
                    </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </Table>
            </Panel>)
    }
}