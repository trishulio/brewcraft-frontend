import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart(props) {
    const dataset = {
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(60, 76, 207, 0.2)",
        borderColor: "#7a6fbe",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#3c4ccf",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#3c4ccf",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
    };

    const data = {
        labels: props.labels,
        datasets: props.datasets?.map((d) => ({
            ...dataset,
            ...d,
        })),
    };

    const option = {
        // responsive: true,
        // scaleOverride: true,
        // scaleSteps: 10,
        // scaleStepWidth: 5,
        // scaleStartValue: 0,
        // showTooltips: false,
        // pointDot: true,
        // pointDotRadius : 6,
        // datasetStrokeWidth : 3,
        // bezierCurve : false,
        scaleShowHorizontalLines: true,
        legend: false,
        ...props.option,
    };

    return (
        <React.Fragment>
            <Line
                width={props.width || 479}
                height={props.height || 300}
                data={data}
                options={option}
            />
        </React.Fragment>
    );
}
