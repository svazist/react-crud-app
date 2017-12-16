import React, {Component} from 'react'
import {FormControl, FormGroup, Panel, HelpBlock, Table, Button, Glyphicon} from 'react-bootstrap'
import {ButtonItem} from '../tools/bootstrap-links'


export default class View extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    // componentDidMount=()=>{
    //
    //     const {itemId, actions, entityId} = this.props;
    //     const {loadEntity, loadMetadata} = actions;
    //
    //     loadMetadata();
    //     loadEntity(entityId, itemId);
    //
    // };
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

    render(){
        const {itemId, entityId, activeItem, history} = this.props;

        return (<Panel header={"Просмотр элемента"}>
                    <Table fill responsive hover striped>
                        <thead>
                        <tr>
                            <th colSpan={2}>
                                <Button
                                    onClick={()=>history.goBack()}
                                    disabled={!activeItem.loaded}
                                    bsStyle={"primary"}>
                                    <Glyphicon glyph="chevron-left" />&nbsp;Вернуться
                                </Button> &nbsp;
                                <ButtonItem
                                    disabled={!activeItem.loaded}
                                    href={`/${entityId}/${itemId}/edit`}
                                    button={{bsStyle:"info" }}>
                                    <Glyphicon glyph="pencil" />&nbsp;Редактировать
                                </ButtonItem> &nbsp;
                                <ButtonItem
                                    disabled={!activeItem.loaded}
                                    href={`/${entityId}/${itemId}/del`}
                                    button={{bsStyle:"danger" }}>
                                    <Glyphicon glyph="remove" />&nbsp;Удалить
                                </ButtonItem>
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