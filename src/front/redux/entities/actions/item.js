import axios from "axios";
import * as ACTION_TYPES from "@redux/entities/constats";
import * as CONFIG from '@redux/config'

export function add(entity, model ) {
    return ({dispatch})=>{

        dispatch({ type:ACTION_TYPES.ADD.PROCESS });

        axios.post(`${CONFIG.API}/${entity}`, model)
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
export function load(entity, itemId ) {

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

        axios.get(`${CONFIG.API}/${entity}/${itemId}`,params)
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


export function del(entity, itemId ) {
    return ({dispatch})=>{
        dispatch({ type:ACTION_TYPES.DELETE.PROCESS  });
        axios.delete(`${CONFIG.API}/${entity}/${itemId}`)
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


export function update(entity, itemId, fields ) {
    return ({dispatch, getState})=>{
        dispatch({ type:ACTION_TYPES.UPDATE.PROCESS });
        axios.put( `${CONFIG.API}/${entity}/${itemId}`,fields)
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
export function clean() {
    return ({dispatch})=>{
        dispatch({ type:ACTION_TYPES.ADD.CLEAN });
        dispatch({ type:ACTION_TYPES.DELETE.CLEAN });
        dispatch({ type:ACTION_TYPES.UPDATE.CLEAN });
    }
}
