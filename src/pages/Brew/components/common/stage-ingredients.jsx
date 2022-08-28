import { map } from "lodash";
import React from "react";
import CommonTable from "../../../../component/Common/table";

export default function StageIngredients({
    lotPortions,
    title,
    noData,
    chart,
    toggleCharts,
}) {
    return (
        <React.Fragment>
            <h4 className="waves-effect">{title}</h4>
            {!!chart && toggleCharts && !!lotPortions.length && chart}
            {(!toggleCharts || !lotPortions.length) && (
                <CommonTable>
                    {!!lotPortions.length && (
                        <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Lot Number</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {!lotPortions.length && (
                            <tr>
                                <td className="text-center">{noData}</td>
                            </tr>
                        )}
                        {map(lotPortions, (value, index) => (
                            <tr key={index}>
                                <td>
                                    {
                                        value.materialLot.invoiceItem.material
                                            .name
                                    }
                                </td>
                                <td>{value.materialLot.lotNumber}</td>
                                <td>
                                    {value.quantity.value}{" "}
                                    {value.quantity.symbol}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </CommonTable>
            )}
        </React.Fragment>
    );
}
