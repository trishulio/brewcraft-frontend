import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from 'react-apexcharts';

class DailyVolume extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                colors: ['#7A6FBE', '#28BBE3'],
                chart: {
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false,
                    }
                },
                legend: {
                    show: true
                },

                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 2,
                },
                grid: {
                    borderColor: '#f8f8fa',
                    row: {
                        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['Jun 23', 'Jun 24', 'Jun 25', 'Jun 26', 'Jun 27', 'Jun 28', 'Jun 29', 'Jun 30'],
                    axisBorder: {
                        show: true
                    },
                    axisTicks: {
                        show: false
                    }
                }
            },

            series: [
                {
                    name: 'month-to-date',
                    data: [500, 130, 0, 0, 180]
                },
                {
                    name: 'last month',
                    data: [800, 100, 600, 200, 140, 100, 150, 420]
                }
            ],
        }
    }
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>

                        <h4 className="card-title mb-4">Daily Round-Down</h4>

                        <Row className="text-center mt-4">
                            <Col sm="6">
                                <h5 className="mb-0 font-size-20">124.8 hl</h5>
                                <p className="text-muted">MTD Daily Average</p>
                            </Col>
                            <Col sm="6">
                                <h5 className="mb-0 font-size-20">562.0 hl</h5>
                                <p className="text-muted">YTD Daily Average</p>
                            </Col>
                        </Row>

                        <div dir="ltr">
                            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="290" />
                        </div>

                    </CardBody>
                </Card>
                {/* <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Total Packaged</h4>

                        <Row className="text-center mt-4">
                            <Col xs="4">
                                <h5 className="font-size-20">6,210 hl</h5>
                                <p className="text-muted">Month-to-date</p>
                            </Col>
                            <Col xs="4">
                                <h5 className="font-size-20">9,425 hl</h5>
                                <p className="text-muted">Last Month</p>
                            </Col>
                            <Col xs="4">
                                <h5 className="font-size-20">19,560 hl</h5>
                                <p className="text-muted">Year-to-date</p>
                            </Col>
                        </Row>

                        <div id="morris-area-example" className="morris-charts morris-charts-height" dir="ltr">
                            <ReactApexChart options={this.state.options} series={this.state.series} type="area" height="300" />
                        </div>
                    </CardBody>
                </Card> */}
            </React.Fragment>
        );
    }
}

export default DailyVolume;