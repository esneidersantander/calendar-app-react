import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Navbar } from '../ui/Navbar'
import {messages} from '../../helpers/calendar-messages-es'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'moment/locale/es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'




export const CalendarScreen = () => {
    moment.locale('es')
    const localizer = momentLocalizer(moment)
    const events = [{
        title: "tamo activo papu",
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes:'comprar pastel',
        user:{
            uid:123,
            name:'jaunito'
        }
    }]
    
    const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'month')
    
    const onDoubleClick=(e)=>{
        console.log(e);
    }
    const onSelectEvent=(e)=>{
        console.log(e);
    }
    const onViewChange=(e)=>{
        setLastView(e)
        localStorage.setItem('lastView', e);
    }
    
    
    const eventStyleGetter =(event, start, end, isSelected)=>{
        const style={
            backgroundColor:'#367cf7',
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
                    view={lastView}
                    components={{
                        event:CalendarEvent
                    }}
                />
                <CalendarModal/>
        </div>
    )
}
