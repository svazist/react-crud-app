import React from 'react'
import {Alert as OriginalAlert, Button,Glyphicon} from 'react-bootstrap'

export const Alert = ({style, message, icon})=> (<OriginalAlert bsStyle={style}>
    {icon&&<Glyphicon glyph={icon} />} {message}
    </OriginalAlert>);
export const Warning = (props)=> (<Alert style="warning" icon="warning-sign" {...props}/>);
export const Success = (props)=> (<Alert style="success" icon="ok" {...props}/>);
export const Danger = (props)=> (<Alert style="danger" icon="exclamation-sign" {...props}/>);
export const Info = (props)=> (<Alert style="info" icon="info-sign" {...props}/>);

export const Error = (props)=> (<Danger message={`Ошибка! <br> {props.message}`}/>);

export const Loading = (props)=> (<Info message={"Загрузка данных"}/>);


export const SavingStatus = (props)=> (<Info message={"Сохраняем данные..."}/>);
export const SavedStatus = (props)=> (<Success message={"Данные сохранены"}/>);

export const DeletingStatus = (props)=> (<Info message="Удаляем элемент"/>);
export const DeletedStatus = (props)=> (<Success message="Элемент удалён"/>);

export const AddingStatus = (props)=> (<Info message="Добавляем элемент"/>);
export const AddedStatus = (props)=> (<Success message="Элемент добавлен"/>);
