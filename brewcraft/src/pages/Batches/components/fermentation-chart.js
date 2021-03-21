import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import ReactApexChart from 'react-apexcharts';

class MonthlyEarnings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                colors: ['#28bbe3', '#F0F1F4'],
                chart: {
                    stacked: true,
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                plotOptions: {
                    bar: {
                        columnWidth: '70%',
                    },
                },
                grid: {
                    borderColor: '#f8f8fa',
                    row: {
                        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },

                xaxis: {
                    categories: ["FT-1", "FT-2", "FT-3", "FT-4", "FT-5", "FT-6", "FT-7", "FT-8", "CT-1", "CT-2", "CT-3", "CT-4", "CT-5", "CT-6", "BT-1", "BT-2", "BT-3", "BT-4"],
                    labels: {
                        formatter: function (val) {
                            return val
                        },
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    }
                },
                yaxis: {
                    title: {
                        text: undefined
                    },
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val
                        }
                    }
                },
                fill: {
                    opacity: 1
                },

                legend: {
                    show: false,
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },
            series: [{
                name: 'Current Volume',
                data: [0, 0, 0, 170, 165, 170, 170, 0, 175, 195, 65, 195, 195, 196, 196, 197, 195, 193]
            }, {
                name: 'Max Volume',
                data: [180, 180, 190, 20, 25, 20, 20, 190, 25, 5, 135, 5, 5, 4, 4, 3, 5, 7]
            }],
        }
    }
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <h4 className="card-title mb-1">Tank Volumes</h4>
                    </CardHeader>
                    <CardBody>
                        <Row className="text-center mt-4">
                            <Col xs="4">
                                <h5 className="font-size-20">48.2 %</h5>
                                <p className="text-muted">Fermentation<br/>Capacity</p>
                            </Col>
                            <Col xs="4">
                                <h5 className="font-size-20">88.8 %</h5>
                                <p className="text-muted">Conditioning<br/>Capacity</p>
                            </Col>
                            <Col xs="4">
                                <h5 className="font-size-20">97.8 %</h5>
                                <p className="text-muted">Bright Tank<br/>Capacity</p>
                            </Col>
                        </Row>

                        <div id="morris-bar-stacked" className="morris-charts morris-charts-height" dir="ltr">
                            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="290" />
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default MonthlyEarnings;