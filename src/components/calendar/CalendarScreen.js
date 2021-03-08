import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Navbar } from '../ui/Navbar'
import {messages} from '../../helpers/calendar-messages-es'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'moment/locale/es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive, eventsStartLoading } from '../../actions/events'
import { useDispatch, useSelector } from 'react-redux'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'




export const CalendarScreen = () => {


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(eventsStartLoading())        
    }, [dispatch])
    
    
    moment.locale('es')
    const localizer = momentLocalizer(moment)
    
    const {events, activeEvent} = useSelector(state => state.calendar)
    const {uid} = useSelector(state => state.auth);
    
    const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'month')
    
    const onDoubleClick=(e)=>{
        dispatch(uiOpenModal());
    }
    const onSelectEvent=(e)=>{
        dispatch(eventSetActive(e));
    }
    const onViewChange=(e)=>{
        setLastView(e)
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e)=>{
        dispatch(eventClearActiveEvent())
    }
    
    
    const eventStyleGetter =(event, start, end, isSelected)=>{
        const style={
            backgroundColor:(uid === event.user._id)? '#367cf7': '#465660',
            borderRadius:'0px',
            opacity:0.8,
            display:'block',
            color:'white'
        }
        
        return {
            style
        }
    }
    
    return (
        <div className="calendar-screen">
                <Navbar/>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelectEvent}
                    onView={onViewChange}
                    messages={messages}
                    eventPropGetter={eventStyleGetter}
                    onSelectSlot={onSelectSlot}
                    selectable={true}
                    view={lastView}
                    components={{
                        event:CalendarEvent
                    }}
                />
                <CalendarModal/>
                {
                    (activeEvent) && <DeleteEventFab/>
                }
                <AddNewFab/>

        </div>
    )
}
