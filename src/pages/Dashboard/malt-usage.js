import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import C3Chart from 'react-c3js';
import 'c3/c3.css';

class MonthlyEarnings extends Component {
    render() {
        const data = {
            columns: [
                ["Pale Malt", 12],
                ["Pilsner Malt", 30],
                ["Pale Ale Malt", 20],
                ["Vienna Malt", 9],
                ["Munich Malt", 3]
            ],
            type:"donut",
          };

        const donut = {
              title: "Mashed",
              width: 30,
              label: { show: !1 }
        };

        const color = {
            pattern:["#f0f1f4", "#7a6fbe", "#28bbe3", "#2f8ee0", "#4a3f9e"]
        };

        const size = {
            height: 300,
            // width : 207.25
        };
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                    <h4 className="card-title mb-4">Malt Used</h4>
                        <Row className="text-center mt-4">
                            <Col xs={6}>
                                <h5 className="font-size-20">6,241 kg</h5>
                                <p className="text-muted">Month-to-date</p>
                            </Col>
                            <Col xs={6}>
                                <h5 className="font-size-20">56,040 kg</h5>
                                <p className="text-muted">Year-to-date</p>
                            </Col>
                        </Row>
                        <C3Chart data={data} donut={donut} color={color} size={size}/>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default MonthlyEarnings;
