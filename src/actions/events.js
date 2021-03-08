import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";



export const startEventAddNew = (event)=>{
    return async (dispatch, getState)=>{
        const {uid, name}= getState().auth;
        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();
            if (body.ok) {
                event.id = body.evento.id;
                event.user={
                    _id:uid,
                    name:name
                }
                dispatch(eventAddNew(event));   
            }
            
        } catch (error) {
            
        }
    }
}
export const eventsStartLoading = () =>{
    return async (dispatch)=>{
        try {
            const resp = await fetchConToken('events');
            const body= await resp.json();
            const events = prepareEvents(body.msg);
            dispatch(eventLoaded(events));

        } catch (error) {
            console.log(error);
        }
    }
}
const eventLoaded=(events)=>({
    type:types.eventLoaded,
    payload:events
})


const eventAddNew = (event)=>({
    type:types.eventAddNew,
    payload:event
})
export const eventSetActive = (event)=>({
    type:types.eventSetActive,
    payload:event
})

export const eventClearActiveEvent=()=>({
    type:types.eventClearActiveEvent
})
export const eventDeleted=()=>({
    type:types.eventDeleted
})
export const eventUpdated=(event)=>({
    type:types.eventUpdated,
    payload:event
})