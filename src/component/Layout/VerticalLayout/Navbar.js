import React, { Component } from "react";

import { withRouter } from "react-router";
import { connect } from "react-redux";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import SidebarContent from "./SidebarContent";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_toggle: false,
        };
        this.isMobile =
            window.innerWidth < 768 &&
            this.props.leftSideBarType === "condensed";
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className="vertical-menu"
                    style={{ overflowY: this.isMobile && "hidden" }}
                >
                    <div data-simplebar className="h-100 mobileMenuScroll">
                        {this.props.leftSideBarType !== "condensed" ? (
                            this.props.leftSideBarType !== "icon" ? (
                                <PerfectScrollbar>
                                    <SidebarContent isMobile={this.isMobile} />
                                </PerfectScrollbar>
                            ) : (
                                <SidebarContent isMobile={this.isMobile} />
                            )
                        ) : (
                            <SidebarContent isMobile={this.isMobile} />
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = (state) => {
    const { is_toggle, leftSideBarType } = state.Layout;
    return { is_toggle, leftSideBarType };
};

export default withRouter(connect(mapStatetoProps, {})(Navbar));
