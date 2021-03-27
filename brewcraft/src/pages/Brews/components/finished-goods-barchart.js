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
                    categories: [
                        "F. Lager 330ml x 6", "F. Lager 330ml x 1", "F. Lager bottle x 12", "F. Lager bottle x 1", "F. Lager Half Barrel", "F. Lager Quarter Barrel",
                        "S. Ale 330ml x 6", "S. Ale 330ml x 1", "S. Ale bottle x 12", "S. Ale bottle x 1", "S. Ale Half Barrel", "S. Ale Quarter Barrel",
                        "W. Stout 330ml x 6", "W. Stout 330ml x 1", "W. Stout bottle x 12", "W. Stout bottle x 1", "W. Stout Half Barrel", "W. Stout Quarter Barrel",
                        "D. IPA 330ml x 6", "D. IPA 330ml x 1", "D. IPA bottle x 12", "D. IPA bottle x 1", "D. IPA Half Barrel", "D. IPA Quarter Barrel"
                    ],
                    labels: {
                        rotate: -45,
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
            }
        }
    }

    render() {
        const series = [{
            name: 'Available Inventory',
            data: [
                20, 88, 34, 40, 7, 5,
                20, 39, 43, 40, 7, 5,
                20, 25, 40, 50, 5, 5,
                20, 54, 25, 40, 7, 5
            ]
        }, {
            name: 'Reserved Inventory',
            data: [
                100, 0, 20, 0, 80, 45,
                110, 0, 20, 0, 80, 45,
                70, 0, 20, 0, 10, 10,
                40, 0, 20, 0, 80, 45
            ]
        }];
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <h4 className="card-title mb-1">Finished-Goods Inventory</h4>
                    </CardHeader>
                    <CardBody>
                        <div id="morris-bar-stacked" className="morris-charts morris-charts-height" dir="ltr">
                            <ReactApexChart options={this.state.options} series={series} type="bar" height="290" />
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default MonthlyEarnings;