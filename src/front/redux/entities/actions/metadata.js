import * as ACTION_TYPES from "@front/redux/entities/constats";
import axios from "axios/index";
import * as CONFIG from '@redux/config'


export function load() {
    return ({dispatch, getState})=>{

        const state = getState();

        if(Object.keys(state.metadata.entities).length > 0){
            return
        }

        dispatch({ type:ACTION_TYPES.METADATA.LOADING });

        axios.get(`${CONFIG.API}/metadata`)
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