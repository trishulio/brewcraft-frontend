import { map } from "lodash";
import React from "react";
import CommonTable from "../../../../component/Common/table";
import { formatDatetime } from "../../../../helpers/textUtils";

export default function StageRecordings({
    recordings,
    title,
    noData,
    chart,
    toggleCharts,
}) {
    return (
        <React.Fragment>
            <h4 className="waves-effect font-size-12">{title}</h4>
            {!!chart && toggleCharts && !!recordings.length && chart}
            {(!toggleCharts || !recordings.length) && (
                <CommonTable>
                    <tbody>
                        {!recordings.length && (
                            <tr>
                                <td className="text-center">{noData}</td>
                            </tr>
                        )}
                        {map(recordings, (recording, index) => (
                            <tr key={index}>
                                <td>{formatDatetime(recording.recordedAt)}</td>
                                <td className="text-right">
                                    {recording.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </CommonTable>
            )}
        </React.Fragment>
    );
}
