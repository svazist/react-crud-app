import React, {Component} from 'react'
import {Panel, Table} from 'react-bootstrap'
import {ButtonItem} from '../tools/bootstrap-links'


export default class Index extends Component {

    constructor(props) {
        super(props);
        }

    getItems = () => {
        const {entities} = this.props;
        return Object.keys(entities).map(itemKey => {
            const item = entities[itemKey];
            return (<tr>
                        <td><ButtonItem button={{bsClass:'link'}} href={`/${item.id}`}>{item.name}</ButtonItem></td>
                    </tr>)
        })
    };

    render() {
        let items = this.getItems();
        return (<Panel header="Список справочников" >
                <Table fill responsive hover striped>
                    <thead>
                    <tr>
                        <th>Справочник</th>
                    </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </Table>
            </Panel>)
    }
}