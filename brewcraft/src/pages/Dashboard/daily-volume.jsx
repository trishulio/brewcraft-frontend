import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from 'react-apexcharts';

class DailyVolume extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                colors: ['#28BBE3', '#7A6FBE'],
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 0.1,
                },
                grid: {
                    borderColor: '#f8f8fa',
                    row: {
                        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    }
                },
                legend: {
                    show: true
                },
            },
            series: [
                {
                    name: 'Last period',
                    data: [0, 150, 60, 180, 90]
                },
                {
                    name: 'This Period',
                    data: [0, 45, 150]
                }
            ],
        }
    }
    render() {
        return (
            <React.Fragment>
                <Card>
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
                </Card>
            </React.Fragment>
        );
    }
}

export default DailyVolume;