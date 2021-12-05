import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
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
                    categories: ["BT-1", "BT-2", "BT-3", "BT-4"],
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
            data: [196, 197, 195, 193]
        }, {
            name: 'Max Volume',
            data: [4, 3, 5, 7]
        }];
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <h4 className="card-title mb-1">Brite Tanks</h4>
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