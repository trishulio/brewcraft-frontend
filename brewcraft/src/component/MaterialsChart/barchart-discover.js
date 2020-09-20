import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const data = {
            labels: ["Pale 2 row malt", "Carastan", "Munich", "Wheat", "Black malt", "Chocolate", "Crystal"],
            datasets: [
                {
                    label: "Net Movement",
                    backgroundColor: "#28bbe3",
                    borderColor: "#28bbe3",
                    borderWidth: 1,
                    hoverBackgroundColor: "#28bbe3",
                    hoverBorderColor: "#28bbe3",
                    data: [120, 470, 710, -340, -700, 250, -90]
                },
                {
                    label: "Raw Materials Kg",
                    backgroundColor: "#eeeeee",
                    borderColor: "#eeeeee",
                    borderWidth: 1,
                    hoverBackgroundColor: "#28bbe3",
                    hoverBorderColor: "#28bbe3",
                    data: [120, 470, 710, 90, 180, 250, -90]
                }
            ]
        };

        const option = {
            tootlbar: {
                show: false
            },
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
                <Bar
                    width={8}
                    height={4}
                    data={data}
                    options={option} />
            </React.Fragment>
        );
    }
}

export default BarChart;