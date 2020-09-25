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
            isBrew: false,
            isEquipment: false,
            isFinishedGoods: false,
            isPackaging: false,
            isRawMaterials : false,
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
                                    <Link className="nav-link" to="/dashboard">
                                        <i className="ti-dashboard"></i>Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        onClick={e => { e.preventDefault(); this.setState({ isRawMaterials: !this.state.isRawMaterials }); }}
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/#"
                                        id="topnav-raw-materials"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                    >
                                        <i className="ti-package"></i>Raw Materials
                                    </Link>
                                    <div className={this.state.isRawMaterials ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-raw-materials">
                                        <Link to="/raw-materials" className="dropdown-item">Overview</Link>
                                        <Link to="/raw-materials/discover" className="dropdown-item">Discover</Link>
                                        <Link to="/raw-materials/records" className="dropdown-item">Records</Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        onClick={e => { e.preventDefault(); this.setState({ isFinishedGoods: !this.state.isFinishedGoods }); }}
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/#"
                                        id="topnav-finished-goods"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                    >
                                        <i className="ti-truck"></i>Finished Goods
                                    </Link>
                                    <div className={this.state.isFinishedGoods ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-finished-goods">
                                        <Link to="finished-goods" className="dropdown-item">Overview</Link>
                                        <Link to="/#" className="dropdown-item">Record Transaction</Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        onClick={e => { e.preventDefault(); this.setState({ isBrews: !this.state.isBrews }); }}
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/#"
                                        id="topnav-brews"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                    >
                                        <i className="ti-flag-alt"></i>Brews
                                    </Link>
                                    <div className={this.state.isBrews ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-brews">
                                        <Link to="/#" className="dropdown-item">Start</Link>
                                        <Link to="/#" className="dropdown-item">Active Brews</Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        onClick={e => { e.preventDefault(); this.setState({ isPackaging: !this.state.isPackaging }); }}
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/#"
                                        id="topnav-packaging"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                    >
                                        <i className="ti-package"></i>Packaging
                                    </Link>
                                    <div className={this.state.isPackaging ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-raw-packaging">
                                        <Link to="packaging" className="dropdown-item">Overview</Link>
                                        <Link to="/#" className="dropdown-item">Record Transaction</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/reports">
                                        <i className="ti-stats-up"></i>Reports
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        onClick={e => { e.preventDefault(); this.setState({ isEquipment: !this.state.isEquipment }); }}
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/#"
                                        id="topnav-equipment"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                    >
                                        <i className="ti-pencil"></i>Equipment
                                    </Link>
                                    <div className={this.state.isEquipment ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-equipment">
                                        <Link to="/#" className="dropdown-item">Machines</Link>
                                        <Link to="/#" className="dropdown-item">Tanks</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="facility">
                                        <i className="ti-clipboard"></i>Facility
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/customers">
                                        <i className="ti-user"></i>Customers
                                    </Link>
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