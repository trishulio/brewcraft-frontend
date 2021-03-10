import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from "reactstrap";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RightSideBar from "../right-sidebar";
import Breadcrumb from "../../Common/breadcrumb";

class LayoutV extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  capitalizeFirstLetter = string => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    let currentage = this.capitalizeFirstLetter(this.props.location.pathname);

    document.title =
    currentage + " | Brewcraft - Process Control Management";
  }

  render() {
    return (
      <React.Fragment>
      { this.props.isPreloader && <div id="preloader">
      <div id="status">
      <div className="spinner-chase">
      <div className="chase-dot"></div>
      <div className="chase-dot"></div>
      <div className="chase-dot"></div>
      <div className="chase-dot"></div>
      <div className="chase-dot"></div>
      <div className="chase-dot"></div>
      </div>
      </div>
      </div>}

      <div id="layout-wrapper">

      {/* render topbar */}
      <Topbar/>

      {/* render navbar */}
      <Navbar/>

      <div className="main-content">
      <div className="page-content">
      <Container fluid>
      <Breadcrumb/>
      {this.props.children}
      {/* render Footer */}
      <Footer/>
      </Container>
      </div>
      </div>
      </div>
      <RightSideBar/>
      </React.Fragment>
      );
    }
  }

  const mapStatetoProps = state => {
    const Layout = state.Layout;
    return {
      isPreloader : Layout.isPreloader
    };
  };

  export default withRouter(connect(mapStatetoProps, null)(LayoutV));
