import React, { Component } from 'react';
import { Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import {
    changeLayout,
    changeLayoutWidth,
    changePreloader
} from '../../../store/actions';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFacilities: false,
            isSuppliers: false,
            isCustomers: false,
            isEquipment: false,
            isMaterials: false,
            isFinishedGoods: false,
            // isBrews: false,
            // isPackaging: false,
            // isReports: false,
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
    changeLayoutWidth() {
        if (this.state.layoutWidth === "boxed")
            this.props.changeLayoutWidth("fluid", this.state.layoutType);
        else
            this.props.changeLayoutWidth("boxed", this.state.layoutType);
    }

    //theme preloader
    changeThemePreloader = () => {
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
                                            onClick={e => { e.preventDefault(); this.setState({ isMaterials: !this.state.isMaterials }); }}
                                            className="nav-link dropdown-toggle arrow-none"
                                            to="/#"
                                            id="topnav-raw-materials"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                        >
                                            <i className="ti-package"></i>Materials
                                    </Link>
                                        <div className={this.state.isMaterials ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-raw-materials">
                                            <Link to="/ingredients" className="dropdown-item">Ingredients</Link>
                                            <Link to="/packaging" className="dropdown-item">Packaging</Link>
                                            <Link to="/materials/categories" className="dropdown-item">Categories</Link>
                                            {/* <Link to="/materials/in-process" className="dropdown-item">In-Process</Link>
                                            <Link to="/materials/records" className="dropdown-item">Records</Link> */}
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link
                                            onClick={e => { e.preventDefault(); this.setState({ isFacilities: !this.state.isFacilities }); }}
                                            className="nav-link dropdown-toggle arrow-none"
                                            to="/#"
                                            id="topnav-facilities"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                        >
                                            <i className="ti-flag-alt"></i>Facilities
                                    </Link>
                                        <div className={this.state.isFacilities ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-facilities">
                                            <Link to="/facilities/" className="dropdown-item">Facilities List</Link>
                                            <Link to="/facilities/locations" className="dropdown-item">Locations</Link>
                                            <Link to="/equipment/" className="dropdown-item">Equipment</Link>
                                            <Link to="/floor-view/" className="dropdown-item">Floor View</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link
                                            onClick={e => { e.preventDefault(); this.setState({ isSuppliers: !this.state.isSuppliers }); }}
                                            className="nav-link dropdown-toggle arrow-none"
                                            to="/#"
                                            id="topnav-suppliers"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                        >
                                            <i className="ti-user"></i>Suppliers
                                    </Link>
                                        <div className={this.state.isSuppliers ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-suppliers">
                                            <Link to="/suppliers" className="dropdown-item">List Suppliers</Link>
                                            <Link to="/purchases" className="dropdown-item">Purchase Invoices</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link
                                            onClick={e => { e.preventDefault(); this.setState({ isCustomers: !this.state.isCustomers }); }}
                                            className="nav-link dropdown-toggle arrow-none"
                                            to="/#"
                                            id="topnav-customers"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                        >
                                            <i className="ti-thumb-up"></i>Customers
                                    </Link>
                                        <div className={this.state.isCustomers ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-customers">
                                            {/* <Link to="/customers/dashboard" className="dropdown-item">Dashboard</Link> */}
                                            <Link to="/customers/list" className="dropdown-item">List Customers</Link>
                                            <Link to="/customers/invoices" className="dropdown-item">Sales Invoices</Link>
                                            <Link to="/customers/invoice/new" className="dropdown-item">New Invoice</Link>
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
                                            <Link to="/finished-goods/inventory" className="dropdown-item">Inventory</Link>
                                            <Link to="/deliveries" className="dropdown-item">Deliveries</Link>
                                            <Link to="/delivery-drivers" className="dropdown-item">Delivery Drivers</Link>
                                        </div>
                                    </li>
                                    {/* <li className="nav-item dropdown">
                                        <Link
                                            onClick={e => { e.preventDefault(); this.setState({ isBrews: !this.state.isBrews }); }}
                                            className="nav-link dropdown-toggle arrow-none"
                                            to="/#"
                                            id="topnav-brews"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                        >
                                            <i className="ti-crown"></i>Brews
                                    </Link>
                                        <div className={this.state.isBrews ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-brews">
                                            <Link to="/brews/dashboard" className="dropdown-item">Dashboard</Link>
                                            <Link to="/brews/active-brews" className="dropdown-item">Active Brews</Link>
                                            <Link to="/brews/" className="dropdown-item">All Brews</Link>
                                        </div>
                                    </li> */}
                                    {/* <li className="nav-item dropdown">
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
                                        <div className={this.state.isPackaging ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-packaging">
                                            <Link to="/packaging/inventory" className="dropdown-item">Inventory</Link>
                                            <Link to="/packaging/records" className="dropdown-item">Records</Link>
                                        </div>
                                    </li> */}
                                    {/* <li className="nav-item dropdown">
                                        <Link
                                            onClick={e => { e.preventDefault(); this.setState({ isReports: !this.state.isReports }); }}
                                            className="nav-link dropdown-toggle arrow-none"
                                            to="/#"
                                            id="topnav-reports"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                        >
                                            <i className="ti-stats-up"></i>Reports
                                    </Link>
                                        <div className={this.state.isReport ? "dropdown-menu dropdown-menu-left show" : "dropdown-menu dropdown-menu-left"} aria-labelledby="topnav-reports">
                                            <Link to="/reports/k50b" className="dropdown-item">K50B - Excise Duty Return</Link>
                                            <Link to="/reports/n10" className="dropdown-item">N10 - Application for Refund/Drawback</Link>
                                        </div>
                                    </li> */}
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
    return { is_toggle, leftSideBarType, layoutType, leftSideBarTheme, layoutWidth, topbarTheme, isPreloader };
}

export default withRouter(connect(mapStatetoProps, {
    changeLayout,
    changeLayoutWidth,
    changePreloader
})(Navbar));