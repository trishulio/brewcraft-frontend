import React, { useState } from "react";
import { Row, Col, CardHeader, CardBody, Card } from "reactstrap";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/bootstrap/main.css";
import "@fullcalendar/timegrid/main.css";

export default function Calendar({ calendarEvents, handleDateClick }) {
    const [selectedDay, setSelectedDay] = useState(new Date());
    calendarEvents = [
        {
            title: "All Day Event",
            start: new Date().setDate(1),
        },
        {
            id: 999,
            title: "Long Event",
            start: new Date().setDate(17),
            end: new Date().setDate(19),
            allDay: false,
        },
        {
            id: 999,
            title: "Repeating Event",
            start: new Date().setDate(19),
            allDay: false,
        },
        {
            id: 999,
            title: "Meeting",
            start: new Date().setDate(22),
            allDay: false,
        },
        {
            id: 999,
            title: "Lunch",
            start: new Date().setDate(22),
            allDay: false,
        },
        {
            title: "Birthday Party",
            start: new Date().setDate(23),
            allDay: false,
        },
        {
            id: 999,
            title: "Repeating Event",
            start: new Date().setDate(26),
            allDay: false,
        },
        {
            id: 999,
            title: "Click for Google",
            start: new Date().setDate(28),
            allDay: false,
        },
    ];

    handleDateClick = (arg) => {
        var title = prompt("Event Title:");
        setSelectedDay(arg);
        if (title === null) {
        } else {
            var newEvent = {};
            newEvent = {
                id: calendarEvents.length + 1,
                title: title,
                start: selectedDay ? selectedDay.date : new Date(),
                className: "bg-primary",
            };
            this.setState({
                calendarEvents: calendarEvents.concat(newEvent),
                selectedDay: null,
            });
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col xs="12">
                    <Card>
                        <CardHeader>
                            <h4 className="card-title mb-1">Schedule</h4>
                        </CardHeader>
                        <CardBody>
                            <FullCalendar
                                defaultView="dayGridMonth"
                                plugins={[
                                    BootstrapTheme,
                                    dayGridPlugin,
                                    interactionPlugin,
                                    timeGridPlugin,
                                ]}
                                handleWindowResize={true}
                                themeSystem="bootstrap"
                                header={{
                                    left: "prev,next today",
                                    center: "title",
                                    right: "dayGridMonth,dayGridWeek,dayGridDay",
                                }}
                                dateClick={handleDateClick}
                                editable={true}
                                droppable={true}
                                eventLimit={true}
                                selectable={true}
                                events={calendarEvents}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
