import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

//Import Menus
import LanguageMenu from "../Menus/language-menu";
import FullScreen from "../Menus/full-screen";
import NotificationMenu from "../Menus/notification-menu";
import ProfileMenu from "../Menus/profile-menu";
import SettingsButton from "../Menus/settings-button";

//Import Images
import logosm from "../../../assets/images/logo-sm.png";
import logodark from "../../../assets/images/logo-dark.png";
import logolight from "../../../assets/images/logo-light.png";

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch : false
        }
        this.toggleMenu.bind(this);
        this.toggleSearch.bind(this);
    }
    

    componentDidMount(){
        //set for temporary
        document.body.setAttribute("data-layout", "horizontal");
    }

    toggleMenu = () => {
        this.props.openLeftMenuCallBack();
    }

    toggleSearch = () => {
        this.setState({isSearch : !this.state.isSearch});
    }

    render() {
        return (
            <React.Fragment>
        
            <div className="navbar-header">
                <Container fluid>
                    <div className="float-left">
                        
                        <div className="navbar-brand-box">
                            <Link to="/dashboard" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src={logosm} alt="" height="22"/>
                                </span>
                                <span className="logo-lg">
                                    <img src={logodark} alt="" height="19"/>
                                </span>
                            </Link>
    
                            <Link to="/dashboard" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src={logosm} alt="" height="22"/>
                                </span>
                                <span className="logo-lg">
                                    <img src={logolight} alt="" height="19"/>
                                </span>
                            </Link>
                        </div>
    
                        <button type="button"
                            className="btn btn-sm px-3 font-size-24 d-lg-none header-item waves-effect waves-light"
                            onClick={this.toggleMenu}
                            data-toggle="collapse"
                            data-target="#topnav-menu-content"
                        >
                            <i className="mdi mdi-menu"></i>
                        </button>
                    </div>
    
                    <div className="float-right">
    
                        
                        <form className="app-search d-none d-lg-inline-block">
                            <div className="position-relative">
                                <input type="text" className="form-control" placeholder="Search..."/>
                                <span className="fa fa-search"></span>
                            </div>
                        </form>

                        <LanguageMenu class="d-lg-inline-block" />
    
                        <FullScreen/>
    
                        <Dropdown isOpen={this.state.isSearch} toggle={this.toggleSearch} className="d-inline-block d-lg-none ml-2">
                            <DropdownToggle tag="button" type="button" className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown" data-toggle="dropdown">
                                <i className="mdi mdi-magnify"></i>
                            </DropdownToggle>
                            <DropdownMenu right className="dropdown-menu-lg p-0" aria-labelledby="page-header-search-dropdown">
    
                                <form className="p-3">
                                    <div className="form-group m-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username"/>
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </DropdownMenu>
                        </Dropdown>

                        <NotificationMenu/>
    
                        <ProfileMenu/>
    
                        <SettingsButton/>
    
                    </div>
                </Container>
            </div>
            </React.Fragment>
        );
    }
}

export default Topbar;