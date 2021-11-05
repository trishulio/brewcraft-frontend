import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

export default function BarChart(props) {

    const dataset = {
        // label: "Sales Analytics",
        // data: [65, 59, 81, 45, 56, 80, 50, 20]
        backgroundColor: "#28bbe3",
        borderColor: "#28bbe3",
        borderWidth: 1,
        hoverBackgroundColor: "#28bbe3",
        hoverBorderColor: "#28bbe3"
    };

    const data = {
        labels: props.labels,
        datasets: props.datasets?.map(d => ({
            ...dataset,
            ...d
        })),
    };

    const options = {
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
        },
        legend: false,
        ...props.options
    };

    return (
        <React.Fragment>
            <HorizontalBar width={props.width || 479} height={props.height || 300} data={data} options={options} />
        </React.Fragment>
    );
}
