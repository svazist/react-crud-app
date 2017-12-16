import React, {Component} from 'react'
import {
    FormControl,
    FormGroup,
    Panel,
    HelpBlock,
    ControlLabel,
    Button,
    Form,
    Glyphicon} from 'react-bootstrap'

import * as Alerts from './parts/Alerts'

import Formsy from 'formsy-react';
import Item from './formitems/Item'
import {ButtonItem} from '../tools/bootstrap-links'


function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export default class Add extends Component{

    constructor(props){
        super(props);
        this.state = {
            canSubmit: false,
            disabled: false,
            model:{},
            meta:[]
        }

        this.validationErrors = {
            'isExisty': "Поле не может быть пустым",
            'minLength': "Минимальное количество символов: {0} ",
            'maxLength': "Максимальная количество символов: {0}",
            'isInt': "Поле должно содержать только цифры"
        }
    }

    componentWillReceiveProps(nextProps){
        const { entityId, itemId, loaded, activeItem, fields} = nextProps;

        if(fields.length > 0){
            let model = {};
            for(let i of fields){
                model[i.name] = null
            }
            this.setState({
                model:model,
                meta:fields,
                loading:false});
        }


        if(activeItem.added){

            debugger
            if(this.isApply){
               this.props.history.push(`/${entityId}/${activeItem.data.id}/edit`);

            } else {
                this.props.history.push(`/${entityId}/`);
            }
        }
    }
    componentWillMount(){
        const { entityId, itemId, actions, loaded, activeItem, fields} = this.props;

        if(fields.length > 0){

            let model = {};
            for(let i of fields){
                model[i.name] = null
            }

            this.setState({
                model:model,
                meta:fields,
                loading:false});
        }

        if(activeItem.added){
            this.setState({disabled:false});
            this.clearAlerTimeout = setTimeout(()=>{
                actions.setItemSavedClean();
                clearTimeout(this.clearAlerTimeout);
            }, 10000)
        }
    }


    componentWillUnmount(){
        if(typeof this.clearAlerTimeout != 'undefined'){
            clearTimeout(this.clearAlerTimeout);
        }
    }

    buildFormItems =()=>(

        this.state.meta.map((item)=>{
            let props = {
                id:item.name,
                key:"field-" + item.name,
                type:"text",
                name:item.name,
                disabled:this.state.disabled,
                required:item.required,
                validations:item.validations,
                placeholder:item.title,
                value:this.state.model[item.name],
                validationErrors:this.getErrorMessages(item.validations),
                label:item.title
            };

            switch (item.type){

                case 'string':
                    return <Item {...props}/>
                case 'integer':
                    return <Item {...props} type={'number'}/>
                case 'email':
                    return <Item {...props} type={'email'}/>
                case 'password':
                    return <Item {...props} type={'password'}/>
                case 'file':
                    return <Item {...props} type={'file'}/>
                case 'checkbox':
                    return <Item {...props} element={'Checkbox'}/>
                case 'radio':
                    return <Item {...props} element={'Radio'} />
                case 'select':
                    return <Item {...props} componentClass={'select'}/>
                case 'textarea':
                    return <Item {...props} componentClass={'textarea'} />
                default:
                    return null;
            }
        })
    );

    getErrorMessages(validators){
        let out = [];
        for(let errorKey in this.validationErrors){
            if(typeof validators[errorKey] !== 'undefined'){
                out[errorKey] = this.validationErrors[errorKey].replace("{0}", validators[errorKey]);
            }
        }
        return out;
    }
    disableButton=()=> {
        this.setState({ canSubmit: false });
    }

    enableButton=()=> {
        this.setState({ canSubmit: true });
    }

    submit = (model) => {
        if(typeof this.clearAlerTimeout != 'undefined'){
            clearTimeout(this.clearAlerTimeout);
        };

        const {entityId, actionsItem} = this.props;
        this.setState({disabled:true});
        actionsItem.add(entityId, model);
    }
    onApply=()=>{
        const {form} = this.refs;
        this.isApply = true;
        form.submit()
    }
    render(){

        const formFields = this.buildFormItems();
        const {itemId, entityId, activeItem, history} = this.props;
        const {adding, added, error} = activeItem;

            return (<Panel header="Создание элемента">
                {adding && <Alerts.AddingStatus />}
                {added && <Alerts.AddedStatus />}
                <Formsy
                    onValidSubmit={this.submit}
                    onValid={this.enableButton}
                    ref="form"
                    onInvalid={this.disableButton}
                    disabled={this.state.disabled}>

                    {formFields}

                    <Button
                        disabled={(!this.state.canSubmit || this.state.disabled)}
                        bsStyle="primary"
                        type="submit">Сохранить</Button>&nbsp;
                    <Button
                        disabled={(!this.state.canSubmit || this.state.disabled)}
                        data={{redirect:false}}
                        bsStyle="success"
                        type="button" onClick={this.onApply}>Применить</Button>&nbsp;
                    <Button
                        onClick={()=>history.goBack()}
                        bsStyle={"info"}
                        disabled={this.state.disabled}>Отмена
                    </Button>
                </Formsy>
            </Panel>)


    }
}