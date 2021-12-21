import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const option = {
            tootlbar: {
                show: false,
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                        var total = meta.total;
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = parseFloat(
                            ((currentValue / total) * 100).toFixed(1)
                        );
                        return currentValue + " (" + percentage + "%)";
                    },
                    title: function (tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    },
                },
            },
            layout: {
                padding: {
                    top: 0,
                },
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };

        return (
            <React.Fragment>
                <Bar
                    width={window.innerWidth >= 992 ? 8 : 4}
                    height={4}
                    data={this.props.data}
                    options={option}
                />
            </React.Fragment>
        );
    }
}

export default BarChart;
