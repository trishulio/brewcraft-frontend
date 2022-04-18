import { map } from "lodash";
import React from "react";
import CommonTable from "../../../../component/Common/table";
import { IngredientsBar } from "./charts";

export default function StageIngredients({
    lotPortions,
    title,
    noData,
    toggleCharts,
}) {
    return (
        <React.Fragment>
            <h4 className="waves-effect font-size-12">{title}</h4>
            {toggleCharts && !!lotPortions.length && (
                <IngredientsBar ingredients={lotPortions} />
            )}
            {(!toggleCharts || !lotPortions.length) && (
                <CommonTable>
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
                                <td className="text-right">
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
