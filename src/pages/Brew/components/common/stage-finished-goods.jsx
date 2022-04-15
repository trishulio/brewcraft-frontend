import { map } from "lodash";
import React from "react";
import CommonTable from "../../../../component/Common/table";
import { formatDatetime, prettyVolume } from "../../../../helpers/textUtils";

export default function StageFinishedGoods({ finishedGoods, title, noData }) {
    return (
        <React.Fragment>
            <h4 className="waves-effect font-size-12">{title}</h4>
            <CommonTable>
                <tbody>
                    {!finishedGoods.length && (
                        <tr>
                            <td className="text-center">{noData}</td>
                        </tr>
                    )}
                    {map(finishedGoods, (finishedGood, index) => (
                        <tr key={index}>
                            <td>{formatDatetime(finishedGood.packagedOn)}</td>
                            <td className="text-right">
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
        </React.Fragment>
    );
}
