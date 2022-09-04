import { map } from "lodash";
import React from "react";
import CommonTable from "../../../../component/Common/table";
import { formatDatetime, prettyVolume } from "../../../../helpers/textUtils";

export default function StageFinishedGoods({
    finishedGoods,
    title,
    noData,
    chart,
    toggleCharts,
}) {
    return (
        <React.Fragment>
            <h4 className="waves-effect">{title}</h4>
            {!!chart && toggleCharts && !!finishedGoods.length && chart}
            {(!toggleCharts || !finishedGoods.length) && (
                <CommonTable>
                    {!!finishedGoods.length && (
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Total Vol.</th>
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {!finishedGoods.length && (
                            <tr>
                                <td className="text-center">{noData}</td>
                            </tr>
                        )}
                        {map(finishedGoods, (finishedGood, index) => (
                            <tr key={index}>
                                <td>
                                    {formatDatetime(finishedGood.packagedOn)}
                                </td>
                                <td className="text-left">
                                    {prettyVolume(
                                        finishedGood.mixturePortions[0].quantity
                                            .value,
                                        finishedGood.mixturePortions[0].quantity
                                            .symbol
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </CommonTable>
            )}
        </React.Fragment>
    );
}
