import axios from 'axios'

import * as ACTION_TYPES from './constats'

const API='http://localhost:3000';


export function loadMetadata() {
    return ({dispatch, getState})=>{

        const state = getState();

        if(Object.keys(state.metadata.entities).length > 0){
            return
        }

        dispatch({ type:ACTION_TYPES.METADATA.LOADING });

        axios.get(API+'/metadata')
            .then(response=>response.data)
            .then(
            (data)=>{
                let meta = {};
                for(let item of data){
                    meta[item.id] = item;
                }
                dispatch({
                    type:ACTION_TYPES.METADATA.LOADED,
                    meta:meta
                })
            }
        ).catch((error)=>(
            dispatch({
                type:ACTION_TYPES.METADATA.ERROR,
                error:error
            })
        ))
    }
}

export function loadEntities(entity, page=0, limit=10) {
    return ({dispatch})=>{

        let queryParams = {
            '_page': page,
            '_limit': limit,
        };

        dispatch({ type:ACTION_TYPES.ENTITIES.LOADING });
        axios.get(API+'/'+entity,{params:queryParams})
            .then(
            (response)=>{
                let totalCount = parseInt(response.headers['x-total-count']);
                dispatch({
                    type:ACTION_TYPES.ENTITIES.LOADED,
                    entities:response.data,
                    total:totalCount,
                    page:page,
                    limit:limit
                })
            }
        ).catch((error)=>(
            dispatch({
                type:ACTION_TYPES.ENTITIES.ERROR,
                error:error
            })
        ))
    }
}

export function loadEntity(entity, itemId ) {

    return ({dispatch, getState})=>{

        let params = {
            '_id': itemId
        };

        dispatch({ type:ACTION_TYPES.LOAD.PROCESS });

        const state = getState();

        if(state.entities.length > 0){
            const item = state.entities.find(item => item.id === itemId);
            if(item){
                dispatch({
                    type:ACTION_TYPES.LOAD.SUCCESS,
                    data:item
                })
            }
        }

        axios.get(API+'/'+entity+"/"+itemId,params)
            .then(response=>response.data)
            .then(
            (data)=>{
                dispatch({
                    type:ACTION_TYPES.LOAD.SUCCESS,
                    data:data
                })
            }
        ).catch((error)=>(
            dispatch({
                type:ACTION_TYPES.LOAD.ERROR,
                error:error
            })
        ))
    }
}

export function updateLocalRecord(itemId, data) {
    return ({dispatch})=>{
        dispatch({
            type:ACTION_TYPES.ENTITIES.UPDATE_ROW,
            data:data,
            itemId:itemId,
        })
    }
}

export function setItemSavedClean() {
    return ({dispatch})=>{
        dispatch({
            type:ACTION_TYPES.UPDATE.CLEAN
        })
    }
}


export function updateEntity(entity, itemId, fields ) {
    return ({dispatch, getState})=>{
        dispatch({ type:ACTION_TYPES.UPDATE.PROCESS });
        axios.put(API+'/'+entity+'/'+itemId,fields)
            .then(response=>response.data)
            .then(
            (data)=>{
                setTimeout(()=>{
                    const state = getState();
                    if(state.entities.length > 0){
                        const item = state.entities.find(item => item.id === itemId);
                        if(item){
                            dispatch(updateLocalRecord(itemId, data))
                        }
                    }
                    dispatch({
                        type:ACTION_TYPES.UPDATE.SUCCESS,
                        item:data
                    })
                }, 3000)
            }
        ).catch((error)=>(
            dispatch({
                type:ACTION_TYPES.UPDATE.ERROR,
                error:error
            })
        ))
    }
}

export function addEntity(entity, model ) {
    return ({dispatch})=>{

        dispatch({ type:ACTION_TYPES.ADD.PROCESS });

        axios.post(`${API}/${entity}`, model)
            .then(response=>response.data)
            .then(
                (data)=>{
                    dispatch({
                        type:ACTION_TYPES.ADD.SUCCESS,
                        data:data
                    })
                }
            )
            .catch((error)=>(
            dispatch({
                type:ACTION_TYPES.ADD.ERROR,
                error:error
            })
        ))
    }
}

export function deleteEntity(entity, itemId ) {
    return ({dispatch})=>{
        dispatch({ type:ACTION_TYPES.DELETE.PROCESS  });
        axios.delete(`${API}/${entity}/${itemId}`)
            .then(
            (data)=>{
                dispatch({
                    type:ACTION_TYPES.DELETE.SUCCESS,
                    itemId:itemId
                })
            }
        ).catch((error)=>(
            dispatch({
                type:ACTION_TYPES.DELETE.ERROR,
                error:error
            })
        ))
    }
}