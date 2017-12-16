import React, {Component} from 'react'
import {FormControl, FormGroup, Panel, HelpBlock, Table, Button, Glyphicon} from 'react-bootstrap'

import {DeletingStatus, DeletedStatus} from './parts/Alerts'


export default class Delete extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    getFields=()=>{
        const {fields,activeItem} = this.props;
        if("id" in activeItem.data){
            let out = [];
            for (let item of fields){
                out.push(<tr key={'item-'+item.id+'-field'}>
                    <td>{item.title}</td>
                    <td>{activeItem.data[item.id]}</td>
                </tr>)
            }
            return out;
        }
        return null
    };

    doDelete=()=>{
        const {itemId, entityId, actionsItem} = this.props;
        actionsItem.del(entityId,itemId)
    }

    render(){
        const {itemId, entityId, activeItem, history} = this.props;

        const {deleting, deleted} = activeItem;
        const confirm = (<div>
            <h3>Подтверждаете удаление?</h3>
            <h4>Операция не может быть отменена</h4>
            <Button disabled={deleting || deleted} bsStyle={"danger"} onClick={this.doDelete}><Glyphicon glyph={"ok"}/>&nbsp;Да</Button>&nbsp;
            <Button disabled={deleting} bsStyle={"success"} onClick={()=>history.goBack()}><Glyphicon glyph={"remove"}/>&nbsp;Нет</Button>
        </div>);
        return (<Panel header={"Удаление элемента"} >
                    <Table fill responsive hover striped>
                        <thead>
                        <tr>
                            <th colSpan={2}>
                                {deleting && <DeletingStatus/>}
                                {deleted && <DeletedStatus/>}
                                {!deleted && confirm}
                                {deleted && <Button
                                    bsStyle={"primary"} onClick={()=>history.goBack()}>
                                    <Glyphicon glyph={"chevron-left"}/>&nbsp;Вернуться</Button>
                                }
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.getFields()}
                        </tbody>

                    </Table>
                </Panel>)
    }
}