import React, { Component } from 'react';
import { Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import {
    changeLayout,
    changeLayoutWidth,
    changePreloader } from '../../../store/actions';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMail : false,
            isUi : false,
            isForms : false,
            isMore : false,
            isIcons : false,
            isTables : false,
            isMaps : false,
            isCharts : false,
            isPages : false,
            isLayouts : false,
            layoutType: this.props.layoutType,
            layoutWidth: this.props.layoutWidth,
            isPreloader: this.props.isPreloader
        };
        this.changeLayout = this.changeLayout.bind(this);
        this.changeLayoutWidth = this.changeLayoutWidth.bind(this);
        this.changeThemePreloader = this.changeThemePreloader.bind(this);
    }
    
    changeLayout() {
        this.props.changeLayout("vertical");
    }

    //change layout width
    changeLayoutWidth(value) {
        if(this.state.layoutWidth === "boxed")
          this.props.changeLayoutWidth("fluid", this.state.layoutType);
        else
        this.props.changeLayoutWidth("boxed", this.state.layoutType);
    }

    //theme preloader
    changeThemePreloader = (value) => {
        this.props.changePreloader(!this.props.isPreloader);
    }

    componentDidMount() {
        var matchingMenuItem = null;
        var ul = document.getElementById("navigation");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
          if (this.props.location.pathname === items[i].pathname) {
            matchingMenuItem = items[i];
            break;
          }
        }
        if (matchingMenuItem) {
          this.activateParentDropdown(matchingMenuItem);
        }
      }

              //update local state after changing layout
        componentDidUpdate(prevProps) {
            if (prevProps !== this.props) {
              this.setState({
                layoutType: this.props.layoutType,
                layoutWidth: this.props.layoutWidth,
                isPreloader: this.props.isPreloader
              });
            }

            if (this.props.leftSideBarType !== prevProps.leftSideBarType) {
                this.initMenu();
            }
        }
    
      activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;
        if (parent) {
          parent.classList.add("active"); // li
          const parent2 = parent.parentElement;
          parent2.classList.add("active"); // li
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add("active"); // li
            const parent4 = parent3.parentElement;
            if (parent4) {
              parent4.classList.add("active"); // li
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.add("active"); // li
                 const parent6 = parent5.parentElement;
              if (parent6) {
                parent6.classList.add("active"); // li
              }
              }
            }
          }
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
            <div className="container-fluid">
                <div className="topnav">
                    <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">

                        <Collapse isOpen={this.props.menuOpen} className="navbar-collapse" id="topnav-menu-content">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="index">
                                        <i className="ti-dashboard"></i>Dashboard
                                    </Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link
                                        onClick={e => { e.preventDefault(); this.setState({ isMail: !this.state.isMail }); }}
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/#"
                                        id="topnav-email"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                    >
                                        <i className="ti-email"></i>Email 
                                    </Link>
                                    <div className={this.state.isMail ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-email">
                                        <Link to="email-inbox" className="dropdown-item">Inbox</Link>
                                        <Link to="email-read" className="dropdown-item">Email Read</Link>
                                        <Link to="email-compose" className="dropdown-item">Email Compose</Link>
                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link
                                        onClick={e => { e.preventDefault(); this.setState({ isUi: !this.state.isUi }); }}
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/#"
                                        id="topnav-components"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                    >
                                        <i className="ti-support"></i>UI Elements 
                                    </Link>

                                    <div className={this.state.isUi ? "dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-xl show" : "dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-xl"}
                                        aria-labelledby="topnav-components">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div>
                                                <Link to="ui-alerts" className="dropdown-item">Alerts</Link>
                                                <Link to="ui-buttons" className="dropdown-item">Buttons</Link>
                                                <Link to="ui-badge" className="dropdown-item">Badge</Link>
                                                <Link to="ui-cards" className="dropdown-item">Cards</Link>
                                                <Link to="ui-carousel" className="dropdown-item">Carousel</Link>
                                                <Link to="ui-dropdowns" className="dropdown-item">Dropdowns</Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div>
                                                <Link to="ui-grid" className="dropdown-item">Grid</Link>
                                                <Link to="ui-images" className="dropdown-item">Images</Link>
                                                <Link to="ui-lightbox" className="dropdown-item">Lightbox</Link>
                                                <Link to="ui-modals" className="dropdown-item">Modals</Link>
                                                <Link to="ui-pagination" className="dropdown-item">Pagination</Link>
                                                <Link to="ui-popover-tooltips" className="dropdown-item">Popover &amp; Tooltips</Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div>
                                                <Link to="ui-progressbars" className="dropdown-item">Progress Bars</Link>
                                                <Link to="ui-sweet-alert" className="dropdown-item">Sweet-Alert</Link>
                                                <Link to="ui-tabs-accordions" className="dropdown-item">Tabs &amp; Accordions</Link>
                                                <Link to="ui-typography" className="dropdown-item">Typography</Link>
                                                <Link to="ui-video" className="dropdown-item">Video</Link>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link
                                        onClick={e => { e.preventDefault(); this.setState({ isForms: !this.state.isForms }); }}
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/#"
                                        id="topnav-forms"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                    >
                                        <i className="ti-receipt"></i>Forms 
                                    </Link>
                                    <div className={this.state.isForms ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-forms">
                                            <Link to="form-elements" className="dropdown-item">Form Elements</Link>
                                            <Link to="form-validation" className="dropdown-item">Form Validation</Link>
                                            <Link to="form-advanced" className="dropdown-item">Form Advanced</Link>
                                            <Link to="form-editors" className="dropdown-item">Form Editors</Link>
                                            <Link to="form-uploads" className="dropdown-item">Form File Upload</Link>
                                            <Link to="form-xeditable" className="dropdown-item">Form Xeditable</Link>
                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link
                                        onClick={e => { e.preventDefault(); this.setState({ isMore: !this.state.isMore }); }}
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/#"
                                        id="topnav-more"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                    >
                                        <i className="ti-menu-alt"></i>More
                                    </Link>
                                    <div className={this.state.isMore ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="topnav-more">
                                        <Link to="calendar" className="dropdown-item">Calendar</Link>
                                        <div className="dropdown">
                                            <Link
                                                onClick={e => { e.preventDefault(); this.setState({ isIcons: !this.state.isIcons }); }}
                                                className="dropdown-item dropdown-toggle arrow-none"
                                                to="/#" id="topnav-icons"
                                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            >
                                                Icons <div className="arrow-down"></div>
                                            </Link>
                                            <div className={this.state.isIcons ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="topnav-icons">
                                            <Link to="icons-material" className="dropdown-item">Material Design</Link>
                                            <Link to="icons-ion" className="dropdown-item">Ion Icons</Link>
                                            <Link to="icons-fontawesome" className="dropdown-item">Font Awesome</Link>
                                            <Link to="icons-themify" className="dropdown-item">Themify Icons</Link>
                                            <Link to="icons-dripicons" className="dropdown-item">Dripicons</Link>
                                            <Link to="icons-typicons" className="dropdown-item">Typicons Icons</Link>
                                            </div>
                                        </div>


                                        <div className="dropdown">
                                            <Link
                                            onClick={e => { e.preventDefault(); this.setState({ isTables: !this.state.isTables }); }}
                                            className="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-tables"
                                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Tables <div className="arrow-down"></div>
                                            </Link>
                                            <div className={this.state.isTables ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="topnav-tables">
                                                <Link to="tables-basic" className="dropdown-item">Basic Tables</Link>
                                                <Link to="tables-datatable" className="dropdown-item">Data Table</Link>
                                                <Link to="tables-responsive" className="dropdown-item">Responsive Table</Link>
                                                <Link to="tables-editable" className="dropdown-item">Editable Table</Link>
                                            </div>
                                        </div>

                                        <div className="dropdown">
                                            <Link
                                            onClick={e => { e.preventDefault(); this.setState({ isMaps: !this.state.isMaps }); }}
                                            className="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-maps"
                                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Maps <div className="arrow-down"></div>
                                            </Link>
                                            <div className={this.state.isMaps ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="topnav-maps">
                                                <Link to="maps-google" className="dropdown-item"> Google Map</Link>
                                                <Link to="maps-vector" className="dropdown-item"> Vector Map</Link>
                                            </div>
                                        </div>


                                    <Link to="ui-rangeslider" className="dropdown-item">Range Slider</Link>
                                    <Link to="ui-session-timeout" className="dropdown-item">Session Timeout</Link>


                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link
                                    onClick={e => { e.preventDefault(); this.setState({ isCharts: !this.state.isCharts }); }}
                                    className="nav-link dropdown-toggle arrow-none" to="/#" id="topnav-charts" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="ti-pie-chart"></i>Charts 
                                    </Link>
                                    <div className={this.state.isCharts ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-charts">
                                    <Link to="charts-appex" className="dropdown-item">Appex Chart</Link>
                                    <Link to="charts-chartist" className="dropdown-item">Chartist Chart</Link>
                                    <Link to="charts-chartjs" className="dropdown-item">Chartjs Chart</Link>
                                    <Link to="charts-sparkline" className="dropdown-item">Sparkline Chart</Link>
                                    <Link to="charts-c3" className="dropdown-item">C3 Chart</Link>
                                    <Link to="charts-other" className="dropdown-item">Jquery Knob Chart</Link>
                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link
                                    onClick={e => { e.preventDefault(); this.setState({ isPages: !this.state.isPages }); }}
                                    className="nav-link dropdown-toggle arrow-none" to="/#" id="topnav-pages" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="ti-support"></i>Pages 
                                    </Link>

                                    <div
                                    className={this.state.isPages ? "dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-lg dropdown-menu-right show" : "dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-lg dropdown-menu-right"}
                                        aria-labelledby="topnav-pages">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div>
                                                <Link to="pages-timeline" className="dropdown-item">Timeline</Link>
                                                <Link to="pages-invoice" className="dropdown-item">Invoice</Link>
                                                <Link to="pages-directory" className="dropdown-item">Directory</Link>
                                                <Link to="/Login" className="dropdown-item">Login</Link>
                                                <Link to="/Register" className="dropdown-item">Register</Link>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div>
                                                   <Link to="/ForgetPassword" className="dropdown-item">Recover Password</Link>
                                                   <Link to="pages-lock-screen" className="dropdown-item">Lock Screen</Link>
                                                   <Link to="pages-blank" className="dropdown-item">Blank Page</Link>
                                                   <Link to="pages-404" className="dropdown-item">Error 404</Link>
                                                   <Link to="pages-500" className="dropdown-item">Error 500</Link>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                <Link
                                    onClick={e => { e.preventDefault(); this.setState({ isLayouts: !this.state.isLayouts }); }}
                                    className="nav-link dropdown-toggle arrow-none" to="/#" id="topnav-pages" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="ti-tablet"></i>Layouts 
                                    </Link>
                                    <div className={this.state.isLayouts ? "dropdown-menu dropdown-menu-right show " : "dropdown-menu dropdown-menu-right"} aria-labelledby="topnav-layouts">
                                    <li><Link to="#" className="dropdown-item" onClick = { this.changeLayout }>Vertical</Link></li>
                                    <li><Link to="#" className={this.props.layoutWidth === "boxed" ? "dropdown-item active" : "dropdown-item"} onClick = { this.changeLayoutWidth }>{this.props.layoutWidth !== "fluid" ? "Fluid Layout" : "Boxed Layout"}</Link></li>
                                    <li><Link to="#" className="dropdown-item" onClick = { this.changeThemePreloader }>{this.props.isPreloader === true ? "Without Preloader" : "Preloader"}</Link></li>
                                    </div>
                                </li>
                            </ul>
                        </Collapse>
                    </nav>
                </div>
            </div>
            </React.Fragment>
        );
    }
}
const mapStatetoProps = state => {
    const { is_toggle, leftSideBarType, layoutType, leftSideBarTheme, layoutWidth, topbarTheme, isPreloader } = state.Layout;
    return {  is_toggle, leftSideBarType, layoutType, leftSideBarTheme, layoutWidth, topbarTheme, isPreloader };
}

export default withRouter(connect(mapStatetoProps, {
    changeLayout,
    changeLayoutWidth,
    changePreloader
})(Navbar));