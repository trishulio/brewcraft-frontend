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
            <h4 className="waves-effect">{title}</h4>
            {!!chart && toggleCharts && !!recordings.length && chart}
            {(!toggleCharts || !recordings.length) && (
                <CommonTable>
                    {!!recordings.length && (
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {!recordings.length && (
                            <tr>
                                <td className="text-center">{noData}</td>
                            </tr>
                        )}
                        {map(recordings, (recording, index) => (
                            <tr key={index}>
                                <td className="text-left">
                                    {formatDatetime(recording.recordedAt)}
                                </td>
                                <td className="text-left">{recording.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </CommonTable>
            )}
        </React.Fragment>
    );
}
