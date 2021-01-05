import React, { Component } from "react";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import { ToastContainer, toast } from 'react-toastify';
//Import Components
import Topbar from "./Topbar";
import Breadcrumb from "../../Common/breadcrumb";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RightSideBar from "../right-sidebar";
import 'react-toastify/dist/ReactToastify.css';
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpened: false,
    };
  }

  componentDidUpdate() {
    document.getElementById("preloader").style.display = "block";
    document.getElementById("status").style.display = "block";
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let currentage = this.capitalizeFirstLetter(this.props.location.pathname);

        document.title =
          currentage + " | Brewcraft - Process Control Management";
    }

  capitalizeFirstLetter = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  openMenu = (e) => {
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  };

  render() {
    return (
      <React.Fragment>
        <div id="preloader">
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
        </div>
        <div id="layout-wrapper">
          <header id="page-topbar">
            <Topbar
              isMenuOpened={this.state.isMenuOpened}
              openLeftMenuCallBack={this.openMenu.bind(this)}
            />
            <div className="top-navigation">
              <div className="page-title-content">
                <Container fluid>
                  <Breadcrumb />
                </Container>
              </div>
              <Navbar menuOpen={this.state.isMenuOpened} />
            </div>
          </header>
          <div className="main-content">
            <div className="page-content">
              <Container fluid>
                <MDBContainer> 
                  {this.props.children}
                  <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                  />
                </MDBContainer>
                <Footer />
              </Container>
            </div>
          </div>
        </div>
        <RightSideBar />
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { isPreloader } = state.Layout;
  return { isPreloader };
};

export default withRouter(connect(mapStatetoProps, {})(Layout));
