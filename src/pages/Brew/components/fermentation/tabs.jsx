import React, { useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import BatchFerment from "./ferment";

export default function BrewTabs(props) {
    const [isFermentOpen, setIsFermentOpen] = useState(true);

    const fermentProps = {
        isOpen: isFermentOpen,
        toggleIsOpen,
    };

    function toggleIsOpen(index) {
        switch (index) {
            case "ferment":
            default:
                setIsFermentOpen(!isFermentOpen);
                break;
        }
    }

    return (
        <React.Fragment>
            <TabContent activeTab={props.activeTab}>
                <TabPane tabId="1">
                    <div className="accordion">
                        <BatchFerment {...fermentProps} />
                    </div>
                </TabPane>
            </TabContent>
        </React.Fragment>
    );
}
