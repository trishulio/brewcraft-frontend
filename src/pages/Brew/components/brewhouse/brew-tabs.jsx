import React, { useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import Mash from "./mash";
import Kettle from "./kettle";
import Whirlpool from "./whirlpool";

export default function BrewTabs(props) {
    const [isMashOpen, setIsMashOpen] = useState(true);
    const [isKettleOpen, setIsKettleOpen] = useState(false);
    const [isWhirlpoolOpen, setIsWhirlpoolOpen] = useState(false);

    const mashProps = {
        isOpen: isMashOpen,
        toggleIsOpen,
    };

    const kettleProps = {
        isOpen: isKettleOpen,
        toggleIsOpen,
    };

    const whirlpoolProps = {
        isOpen: isWhirlpoolOpen,
        toggleIsOpen,
    };

    function toggleIsOpen(index) {
        switch (index) {
            case "kettle":
                setIsMashOpen(false);
                setIsKettleOpen(!isKettleOpen);
                setIsWhirlpoolOpen(false);
                break;
            case "whirlpool":
                setIsMashOpen(false);
                setIsKettleOpen(false);
                setIsWhirlpoolOpen(!isWhirlpoolOpen);
                break;
            case "mash":
            default:
                setIsMashOpen(!isMashOpen);
                setIsKettleOpen(false);
                setIsWhirlpoolOpen(false);
                break;
        }
    }

    return (
        <React.Fragment>
            <TabContent activeTab={props.activeTab}>
                <TabPane tabId="1">
                    <div className="accordion">
                        <Mash {...mashProps} />
                        <Kettle {...kettleProps} />
                        <Whirlpool {...whirlpoolProps} />
                    </div>
                </TabPane>
            </TabContent>
        </React.Fragment>
    );
}
