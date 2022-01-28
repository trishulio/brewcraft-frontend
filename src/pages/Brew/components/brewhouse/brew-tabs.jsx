import React, { useEffect, useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import Mash from "./mash";
import Kettle from "./kettle";
import Whirlpool from "./whirlpool";
import { useSelector } from "react-redux";

export default function BrewTabs(props) {
    const [isMashOpen, setIsMashOpen] = useState(false);
    const [isKettleOpen, setIsKettleOpen] = useState(false);
    const [isWhirlpoolOpen, setIsWhirlpoolOpen] = useState(false);

    const mashStage = useSelector((state) => {
        return state.Batch.MashStage.data;
    });

    const kettleStage = useSelector((state) => {
        return state.Batch.MashStage.data;
    });

    const whirlpoolStage = useSelector((state) => {
        return state.Batch.WhirlpoolStage.data;
    });

    useEffect(() => {
        if (
            mashStage.status.id &&
            mashStage.status.id !== 2 &&
            mashStage.status.id !== 6
        ) {
            toggleIsOpen("mash");
        }
        if (
            kettleStage.status.id &&
            kettleStage.status.id !== 2 &&
            kettleStage.status.id !== 6
        ) {
            toggleIsOpen("kettle");
        }
        if (
            whirlpoolStage.status.id &&
            whirlpoolStage.status.id !== 2 &&
            whirlpoolStage.status.id !== 6
        ) {
            toggleIsOpen("whirlpool");
        }
        // eslint-disable-next-line
    }, [mashStage, kettleStage, whirlpoolStage]);

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
            case "mash":
                setIsMashOpen(!isMashOpen);
                setIsKettleOpen(false);
                setIsWhirlpoolOpen(false);
                break;
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
            default:
                setIsMashOpen(false);
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
