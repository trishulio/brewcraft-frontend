import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
    toggleSidebar,
    hideRightSidebar,
    changeTopbarTheme,
    changeLayout,
    changeSidebarTheme,
    changeLayoutWidth,
    changeSidebarType,
    changePreloader,
} from "../../../store/actions";

// MetisMenu
import MetisMenu from "metismenujs";

class SidebarContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_toggle: false,
            layoutType: this.props.layoutType,
            topbarTheme: this.props.topbarTheme,
            leftSideBarTheme: this.props.leftSideBarTheme,
            layoutWidth: this.props.layoutWidth,
            sidebarType: this.props.leftSideBarType,
            isPreloader: this.props.isPreloader,
        };
        this.changeLayout = this.changeLayout.bind(this);
        this.changeTopbarTheme = this.changeTopbarTheme.bind(this);
        this.changeLeftSidebarTheme = this.changeLeftSidebarTheme.bind(this);
        this.changeLayoutWidth = this.changeLayoutWidth.bind(this);
        this.changeLeftSidebarType = this.changeLeftSidebarType.bind(this);
        this.changeThemePreloader = this.changeThemePreloader.bind(this);
    }

    componentDidMount() {
        document.body.setAttribute("data-sidebar", "dark");
        document.body.setAttribute("data-topbar", "dark");
        new MetisMenu("#side-menu");
        this.initMenu();
    }

    //update local state after changing layout
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                layoutType: this.props.layoutType,
                topbarTheme: this.props.topbarTheme,
                leftSideBarTheme: this.props.leftSideBarTheme,
                layoutWidth: this.props.layoutWidth,
                sidebarType: this.props.leftSideBarType,
                isPreloader: this.props.isPreloader,
            });
        }

        this.initMenu();
    }

    initMenu() {
        var matchingMenuItem = null;
        var ul = document.getElementById("side-menu");
        var elems = document.querySelectorAll("#side-menu .mm-active");
        [].forEach.call(elems, function (el) {
            el.className = el.className.replace(/\bmm-active\b/, "");
        });
        var elems2 = document.querySelectorAll("#side-menu .mm-show");
        [].forEach.call(elems2, function (el) {
            el.className = el.className.replace(/\bmm-show\b/, "");
        });
        var items = ul.getElementsByTagName("a");
        var array = [];
        for (let i = 0; i < items.length; i++) {
            array.push(items[i]);
        }
        array = array.sort((e1, e2) => {
            if (e1.pathname.startsWith(e2.pathname)) {
                return -1;
            } else if (e2.pathname.startsWith(e1.pathname)) {
                return +1;
            }
            return e1.pathname.localeCompare(e2.pathname);
        });

        for (let i = 0; i < array.length; ++i) {
            if (this.props.location.pathname.startsWith(array[i].pathname)) {
                matchingMenuItem = array[i];
                break;
            }
        }

        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    activateParentDropdown = (item) => {
        item.classList.add("mm-active");
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add("mm-active"); // li
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("mm-active");
                    }
                }
            }
            return false;
        }
        return false;
    };
    //change layput type and dispatch action
    changeLayout() {
        this.props.changeLayout("horizontal");
    }

    //theme preloader
    changeThemePreloader = () => {
        this.props.changePreloader(!this.props.isPreloader);
    };

    //change left sidebar theme
    changeLeftSidebarTheme(value) {
        this.props.changeSidebarTheme(value);
    }

    //change layout width
    changeLayoutWidth() {
        if (this.state.layoutWidth === "boxed")
            this.props.changeLayoutWidth("fluid", this.state.layoutType);
        else this.props.changeLayoutWidth("boxed", this.state.layoutType);
    }

    //change topbar theme and dispatch action
    changeTopbarTheme(value) {
        this.props.changeTopbarTheme(value);
    }

    //change sidebar type
    changeLeftSidebarType(value) {
        this.props.changeSidebarType(value);
    }

    toggleSidebar() {
        if (this.props.isMobile) {
            this.changeLeftSidebarType("default");
        }
    }
    render() {
        return (
            <React.Fragment>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Main</li>
                        <li>
                            <Link
                                to="/dashboard"
                                className="waves-effect"
                                onClick={this.toggleSidebar.bind(this)}
                            >
                                <i className="mdi mdi-view-dashboard"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/purchases/invoices"
                                className="waves-effect"
                                onClick={this.toggleSidebar.bind(this)}
                            >
                                <i className="mdi mdi-currency-usd"></i>
                                <span>Purchases</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/materials/ingredients"
                                className="has-arrow waves-effect"
                            >
                                <i className="mdi mdi-hops"></i>
                                <span>Materials</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link
                                        to="/inventory/raw-materials"
                                        onClick={this.toggleSidebar.bind(this)}
                                    >
                                        Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/materials/ingredients"
                                        onClick={this.toggleSidebar.bind(this)}
                                    >
                                        Ingredients
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/materials/packaging"
                                        onClick={this.toggleSidebar.bind(this)}
                                    >
                                        Packaging
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/materials/categories"
                                        onClick={this.toggleSidebar.bind(this)}
                                    >
                                        Categories
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                to="/suppliers"
                                className="waves-effect"
                                onClick={this.toggleSidebar.bind(this)}
                            >
                                <i className="mdi mdi-domain"></i>
                                <span>Suppliers</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/inventory/finished-goods/summary"
                                className="has-arrow waves-effect"
                            >
                                <i className="mdi mdi-crown"></i>
                                <span>Finished Goods</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link
                                        to="/inventory/finished-goods/summary"
                                        onClick={this.toggleSidebar.bind(this)}
                                    >
                                        Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/sku"
                                        onClick={this.toggleSidebar.bind(this)}
                                    >
                                        SKUs
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                to="/brews"
                                className="waves-effect"
                                onClick={this.toggleSidebar.bind(this)}
                            >
                                <i className="mdi mdi-beer"></i>
                                <span>Brews</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products"
                                className="has-arrow waves-effect"
                            >
                                <i className="mdi mdi-crown"></i>
                                <span>Products</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link
                                        to="/products"
                                        onClick={this.toggleSidebar.bind(this)}
                                    >
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/products/categories"
                                        onClick={this.toggleSidebar.bind(this)}
                                    >
                                        Categories
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {/* <li>
                            <Link
                                to="/sales/receipts"
                                className="has-arrow waves-effect"
                            >
                                <i className="mdi mdi-currency-usd"></i>
                                <span>Sales</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to="/sales/receipts">
                                        Sales Receipts
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/sales/customers">Customers</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/reports" className="waves-effect">
                                <i className="mdi mdi-chart-pie"></i>
                                <span>Reports</span>
                            </Link>
                        </li> */}
                        <li className="menu-title">Admin</li>
                        <li>
                            <Link
                                to="/users"
                                className="waves-effect"
                                onClick={this.toggleSidebar.bind(this)}
                            >
                                <i className="mdi mdi-account-multiple"></i>
                                <span>Users</span>
                            </Link>
                        </li>
                        <li className="menu-title">beta v0.1.0</li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = (state) => {
    const {
        is_toggle,
        leftSideBarType,
        layoutType,
        leftSideBarTheme,
        layoutWidth,
        topbarTheme,
        isPreloader,
    } = state.Layout;
    return {
        is_toggle,
        leftSideBarType,
        layoutType,
        leftSideBarTheme,
        layoutWidth,
        topbarTheme,
        isPreloader,
    };
};

export default withRouter(
    connect(mapStatetoProps, {
        toggleSidebar,
        hideRightSidebar,
        changeLayout,
        changeTopbarTheme,
        changeSidebarTheme,
        changeLayoutWidth,
        changeSidebarType,
        changePreloader,
    })(SidebarContent)
);
