import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import C3Chart from "react-c3js";
import "c3/c3.css";

class Breadcrumb extends Component {
  render() {
    const data = {
      columns: [["Sold", 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12]],
      type: "bar",
      labels: false,
      colors: { Sold: "#28bbe3" },
    };

    const data1 = {
      columns: [["Balance", 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12]],
      type: "bar",
      labels: false,
      colors: { Balance: "#7a6fbe" },
    };

    const legend = {
      show: false,
    };

    const axis = {
      y: {
        show: false,
      },
      x: {
        show: false,
      },
    };

    const bar = {
      width: 5,
      // or
      //width: 100 // this makes bar width 100px
    };

    const size = {
      height: 32,
      width: 101,
    };

    const padding = {
      top: -10,
      bottom: -10,
    };

    const itemLength = this.props.breadcrumbItems.length;

    return (
      <React.Fragment>
        <Row>
          <Col sm="6">
            <div className="page-title-box">
              {this.props.backButton && this.props.history.length &&
                <Button className="waves-effect d-inline mr-3" size="sm" onClick={this.props.history.goBack}>
                  <i className="mdi mdi-arrow-left"></i> Go back
                </Button>
              }
              <h4 className="d-inline align-middle">{this.props.title}</h4>
              <ol className="breadcrumb m-0 mt-2">
                {this.props.breadcrumbItems.map((item, key) =>
                  !item.link || item.link === "#" ? (
                    <li key={key} className="breadcrumb-item active">
                      {item.title}
                    </li>
                  ) : (
                    <li key={key} className="breadcrumb-item">
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  )
                )}
              </ol>
            </div>
          </Col>
          {/* <Col sm="6">
            <div className="state-information d-none d-sm-block">
              <div
                className={
                  this.props.layoutType === "horizontal"
                    ? "state-graph float-right"
                    : "state-graph"
                }
              >
                <C3Chart
                  data={data1}
                  legend={legend}
                  axis={axis}
                  bar={bar}
                  size={size}
                  padding={padding}
                />
                <div className="info">Total Product 17.9 HL</div>
              </div>
              <div className="state-graph">
                <C3Chart
                  data={data}
                  legend={legend}
                  axis={axis}
                  bar={bar}
                  size={size}
                  padding={padding}
                />
                <div className="info">Cogs $3200.08</div>
              </div>
            </div>
          </Col> */}
        </Row>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const Layout = state.Layout;
  const BreadcrumbData = state.Breadcrumb;
  return {
    layoutType: Layout.layoutType,
    title: BreadcrumbData.title,
    breadcrumbItems: BreadcrumbData.breadcrumbItems,
    backButton: BreadcrumbData.backButton
  };
};

export default withRouter(connect(mapStatetoProps, {})(Breadcrumb));
