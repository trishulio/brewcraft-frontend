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
    this.initMenu();
    new MetisMenu("#side-menu");
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

    if (this.props.leftSideBarType !== prevProps.leftSideBarType) {
      new MetisMenu("#side-menu");
    }
    this.initMenu();

  }

  initMenu() {
    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var elems = document.querySelectorAll("#side-menu .mm-active");
    [].forEach.call(elems, function(el) {
        el.className = el.className.replace(/\bmm-active\b/, "");
    });
    var elems2 = document.querySelectorAll("#side-menu .mm-show");
    [].forEach.call(elems2, function(el) {
        el.className = el.className.replace(/\bmm-show\b/, "");
    });
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
  changeThemePreloader = (value) => {
    this.props.changePreloader(!this.props.isPreloader);
  };

  //change left sidebar theme
  changeLeftSidebarTheme(value) {
    this.props.changeSidebarTheme(value);
  }

  //change layout width
  changeLayoutWidth(value) {
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

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Main</li>
            <li>
              <Link to="/dashboard" replace={true} className="waves-effect">
                <i className="mdi mdi-view-dashboard"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/batches" replace={true} className="waves-effect">
                <i className="mdi mdi-flag"></i>
                <span>Brews</span>
              </Link>
            </li>
            <li>
              <Link to="/finished-goods" replace={true} className="waves-effect">
                <i className="mdi mdi-beer"></i>
                <span>Finished Goods</span>
              </Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-crown"></i>
                <span>Products</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/products/categories">Categories</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/ingredients" replace={true} className="waves-effect">
                <i className="mdi mdi-hops"></i>
                <span>Raw Materials</span>
              </Link>
            </li>
            <li>
              <Link to="/packaging" replace={true} className="waves-effect">
                <i className="mdi mdi-package-variant"></i>
                <span>Packaging</span>
              </Link>
            </li>
            {/* <li className="menu-title">Facility</li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-map-marker"></i>
                <span>Locations</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/facilities">Facilities</Link>
                </li>
                <li>
                  <Link to="/facilities/storage">Storages</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/equipment" className="waves-effect">
                <i className="mdi mdi-pencil"></i>
                <span>Equipment</span>
              </Link>
            </li> */}
            <li className="menu-title">Account</li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
              <i className="mdi mdi-currency-usd"></i>
                <span>Sales</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/suppliers">Customers</Link>
                </li>
                <li>
                  <Link to="/sales-invoices">Receipts</Link>
                </li>
              </ul>
            </li>
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
