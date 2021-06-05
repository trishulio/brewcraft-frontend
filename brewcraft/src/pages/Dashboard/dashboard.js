import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

//Import Components
import MiniCard from "./mini-card";
import MaltUsage from "./malt-usage";
import DailyVolume from "./daily-volume";
import DailyRoundDown from "./daily-round-down";
import Products from "./products";
import Inbox from "./inbox";
import RecentActivity from "./recent-activity";
import WidgetUser from "./widget-user";
import YearlySales from "./yearly-sales";
import LatestTransactions from "./latest-transactions";
import LatestOrders from "./latest-orders";
import PieCart from "./finished-goods-piechart";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Main", link : "#" },
                { title : "Dashboard", link : "#" }
            ]
        }
    }

    componentDidMount(){
        this.props.setBreadcrumbItems("Dashboard", this.state.breadcrumbItems);
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <MiniCard reports={this.state.reports} />
                </Row>
                <Row>
                    <Col xl="3">
                        <YearlySales />
                        <MaltUsage />
                    </Col>
                    <Col xl="6">
                        <DailyVolume />
                        <DailyRoundDown/>
                        <LatestOrders />
                    </Col>
                    <Col xl="3">
                        <RecentActivity />
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(Dashboard);