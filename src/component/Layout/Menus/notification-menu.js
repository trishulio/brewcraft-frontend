import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, Media } from 'reactstrap';

// Import Scrollbar
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useSelector } from 'react-redux';

export default function NotificationMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const {
        totalNotifications,
        totalUnreadNotifications,
        notifications
    } = useSelector(state => {
        return state.Notifications;
    });
    // dispatch = useDispatch();

    // useEffect(
    //     (data) => {
    //         notifications = data.notifications
    //     }
    // ), [])

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         notifications : [
    //             { id : 1, icon : "mdi-cart-outline", title : "Your order is placed", desc : "If several languages coalesce the grammar" },
    //             { id : 2, icon : "mdi-message", title : "New Message received", desc : "You have 87 unread messages" },
    //             { id : 3, icon : "mdi-glass-cocktail", title : "Your item is shipped", desc : "It is a long established fact that a reader will" },
    //             { id : 4, icon : "mdi-cart-outline", title : "Your order is placed", desc : "Dummy text of the printing and typesetting industry." },
    //             { id : 5, icon : "mdi-message", title : "New Message received", desc : "You have 87 unread messages" },
    //         ],
    //         menu: false,
    //     };
    //     this.toggle = this.toggle.bind(this);
    // }

    // toggle() {
    //     this.setState(prevState => ({
    //         menu: !prevState.menu
    //     }));
    // }

    return (
        <React.Fragment>
                <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} className="d-inline-block ml-1">
                    <DropdownToggle
                        className="btn header-item noti-icon waves-effect"
                        tag="button"
                        id="page-header-notifications-dropdown"
                    >
                        <i className="ti-bell"></i>
                        <span className="badge badge-danger badge-pill">{totalUnreadNotifications}</span>
                    </DropdownToggle>
                        <DropdownMenu right className="dropdown-menu-lg p-0">
                            <div className="p-3">
                                <Row className="align-items-center">
                                    <Col>
                                        <h5 className="m-0"> Notifications ({totalNotifications}) </h5>
                                    </Col>
                                </Row>
                            </div>
                            <PerfectScrollbar style={{height : "230px"}}>
                                {
                                    notifications.map((notification, key) =>
                                        <Link key={key} to="#" className="text-reset notification-item">
                                            <Media>
                                                <div className="avatar-xs mr-3">
                                                    <span className="avatar-title border-success rounded-circle ">
                                                        <i className={"mdi " + notification.icon}></i>
                                                    </span>
                                                </div>
                                                <Media body>
                                                    <h6 className="mt-0 mb-1">{notification.title}</h6>
                                                    <div className="text-muted">
                                                        <p className="mb-1">{notification.desc}</p>
                                                    </div>
                                                </Media>
                                            </Media>
                                        </Link>
                                    )
                                }
                        </PerfectScrollbar>
                        <div className="p-2 border-top">
                            <Link className="btn btn-sm btn-link font-size-14 btn-block text-center" to="#">
                                View all
                            </Link>
                        </div>
                    </DropdownMenu>
                </Dropdown>
        </React.Fragment>
    );
}


