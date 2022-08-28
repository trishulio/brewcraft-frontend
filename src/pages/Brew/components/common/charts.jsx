import React from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { toHl } from "../../../../helpers/textUtils";

export const GravityLine = (props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: "Gravity Line Chart",
            },
        },
        scales: {
            xAxis: {
                type: "time",
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5,
                },
            },
            yAxis: {
                ticks: {
                    // stepSize: 0.1,
                    maxTicksLimit: 5,
                },
            },
        },
    };

    const data = {
        labels: props.recordings.map((r) => r.recordedAt),
        datasets: [
            {
                label: "Brew Dataset 1",
                data: props.recordings.map((r) => ({
                    x: r.recordedAt,
                    y: r.value,
                })),
                // borderColor: "rgb(53, 162, 235)",
                // backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return <Line options={options} data={data} />;
};

export const AbvLine = (props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: "ABV. Line Chart",
            },
        },
        scales: {
            xAxis: {
                type: "time",
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5,
                },
            },
            yAxis: {
                ticks: {
                    // stepSize: 0.1,
                    maxTicksLimit: 5,
                },
            },
        },
    };

    const data = {
        labels: props.recordings.map((r) => r.recordedAt),
        datasets: [
            {
                label: "Brew Dataset 1",
                data: props.recordings.map((r) => ({
                    x: r.recordedAt,
                    y: r.value,
                })),
                // borderColor: "rgb(178, 34, 34)",
                // backgroundColor: "rgba(178, 34, 34, 0.5)",
            },
        ],
    };

    return <Line options={options} data={data} />;
};

export const TemperatureLine = (props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: "Temperature Line Chart",
            },
        },
        scales: {
            xAxis: {
                type: "time",
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5,
                },
            },
            yAxis: {
                ticks: {
                    // stepSize: 0.1,
                    maxTicksLimit: 5,
                },
            },
        },
    };

    const data = {
        labels: props.recordings.map((r) => r.recordedAt),
        datasets: [
            {
                label: "Brew Dataset 1",
                data: props.recordings.map((r) => ({
                    x: r.recordedAt,
                    y: r.value,
                })),
                // borderColor: "rgb(128, 128, 0)",
                // backgroundColor: "rgba(128, 128, 0, 0.5)",
            },
        ],
    };

    return <Line options={options} data={data} />;
};

export const PhLine = (props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: "Ph Line Chart",
            },
        },
        scales: {
            xAxis: {
                type: "time",
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5,
                },
            },
            yAxis: {
                ticks: {
                    // stepSize: 0.1,
                    maxTicksLimit: 5,
                },
            },
        },
    };

    const data = {
        labels: props.recordings.map((r) => r.recordedAt),
        datasets: [
            {
                label: "Brew Dataset 1",
                data: props.recordings.map((r) => ({
                    x: r.recordedAt,
                    y: r.value,
                })),
                // borderColor: "rgb(255, 255, 102)",
                // backgroundColor: "rgba(255, 255, 102, 0.5)",
            },
        ],
    };

    return <Line options={options} data={data} />;
};

export function IngredientsBar(props) {
    const labels = props.ingredients.map(
        (i) => i.materialLot.invoiceItem.material.name
    );
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Dataset 1",
                data: props.ingredients.map((i) => i.quantity.value),
                // borderColor: Utils.CHART_COLORS.red,
                // backgroundColor: Utils.transparentize(
                //     Utils.CHART_COLORS.red,
                //     0.5
                // ),
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            yAxis: {
                ticks: {
                    callback: function (value) {
                        return `${
                            value + props.ingredients[0].quantity.symbol
                        }`;
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: "Ingredients Bar Chart",
            },
        },
    };

    return <Bar options={options} data={data} />;
}

export function IngredientsDoughnut(props) {
    const labels = props.materialLots.map(
        (i) => i.materialLot.invoiceItem.material.name
    );
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Dataset 1",
                data: props.materialLots.map((i) => i.quantity.value),
                // borderColor: Utils.CHART_COLORS.red,
                // backgroundColor: Utils.transparentize(
                //     Utils.CHART_COLORS.red,
                //     0.5
                // ),
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: "Ingredients Doughnut Chart",
            },
        },
    };

    return <Doughnut options={options} data={data} />;
}

export function FinishedGoodsBar(props) {
    const labels = props.skuLots.map((i) => `${i.sku.name} ${i.packagedOn}`);
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Dataset 1",
                data: props.skuLots.map((i) =>
                    toHl(
                        i.mixturePortions[0].quantity.value,
                        i.mixturePortions[0].quantity.symbol
                    )
                ),
                // borderColor: Utils.CHART_COLORS.red,
                // backgroundColor: Utils.transparentize(
                //     Utils.CHART_COLORS.red,
                //     0.5
                // ),
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: "Finished Goods Bar Chart",
            },
        },
    };

    return <Bar options={options} data={data} />;
}

export function FinishedGoodsDoughnut(props) {
    const groupedBySku = [];
    props.skuLots.forEach((fg) => {
        const item = groupedBySku.find((i) => i.sku.id === fg.sku.id);
        if (!item) {
            groupedBySku.push({
                sku: fg.sku,
                quantity: toHl(
                    fg.mixturePortions[0].quantity.value,
                    fg.mixturePortions[0].quantity.symbol
                ),
            });
        } else {
            item.quantity += toHl(
                fg.mixturePortions[0].quantity.value,
                fg.mixturePortions[0].quantity.symbol
            );
        }
    });
    const labels = groupedBySku.map((i) => `${i.sku.number} ${i.sku.name}`);
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Dataset 1",
                data: groupedBySku.map((i) => i.quantity),
                // borderColor: Utils.CHART_COLORS.red,
                // backgroundColor: Utils.transparentize(
                //     Utils.CHART_COLORS.red,
                //     0.5
                // ),
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: "Finished Goods Doughnut Chart",
            },
        },
    };

    return <Doughnut options={options} data={data} />;
}
