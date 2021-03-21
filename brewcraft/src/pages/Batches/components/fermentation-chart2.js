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
                    categories: ["CT-1", "CT-2", "CT-3", "CT-4", "CT-5", "CT-6"],
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
            }
        }
    }

    render() {
        const series = [{
            name: 'Current Volume',
            data: [175, 195, 65, 195, 195, 196]
        }, {
            name: 'Max Volume',
            data: [25, 5, 135, 5, 5, 4]
        }];
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <h4 className="card-title mb-1">Conditioner Capacites</h4>
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