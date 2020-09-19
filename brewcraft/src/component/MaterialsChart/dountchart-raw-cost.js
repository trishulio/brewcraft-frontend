import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class DountChart extends Component {
    render() {
        const data = {
            labels: ["Pale 2 row malt", "Carastan", "Munich", "Chocolate"],
            datasets: [
                {
                    data: [21000, 20400, 20900, 25900],
                    backgroundColor: [
                        "#aaaaaa",
                        "#bbbbbb",
                        "#cccccc",
                        "#dddddd"
                    ],
                    hoverBackgroundColor: [
                        "#7a6fbe",
                        "#7a6fbe",
                        "#7a6fbe",
                        "#7a6fbe"
                        // "#ececec"
                    ],
                    hoverBorderColor: "#fff"
                }
            ],
            legend: {
                position: 'bottom',
                align: 'start'
            }

        };

        const option = {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                        var total = meta.total;
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                        return currentValue + ' (' + percentage + '%)';
                    },
                    title: function (tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    }
                }
            }
        }
        return (
            <React.Fragment>
                <Doughnut width={4} height={4} data={data} options={option} />
            </React.Fragment>
        );
    }
}

export default DountChart;