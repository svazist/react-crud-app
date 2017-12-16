import axios from "axios";
import * as ACTION_TYPES from "@redux/entities/constats";
import * as CONFIG from '@redux/config'

export function load(entity, page=0, limit=10) {
    return ({dispatch, getState})=>{
        let queryParams = {
            '_page': page,
            '_limit': limit,
        };
        dispatch({ type:ACTION_TYPES.ENTITIES.LOADING });
        axios.get(`${CONFIG.API}/${entity}`,{params:queryParams})
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

