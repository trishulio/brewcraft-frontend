import React, { useEffect, useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import Mash from "./mash";
import Kettle from "./kettle";
import Whirlpool from "./whirlpool";
import Transfer from "./transfer";
import { useSelector } from "react-redux";

export default function BrewTabs(props) {
    const [isMashOpen, setIsMashOpen] = useState(true);
    const [isKettleOpen, setIsKettleOpen] = useState(false);
    const [isWhirlpoolOpen, setIsWhirlpoolOpen] = useState(false);

    const mashStage = useSelector((state) => {
        return state.Batch.MashStages.data[props.indexv];
    });

    const kettleStage = useSelector((state) => {
        return state.Batch.KettleStage.data;
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
        indexv: props.indexv,
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
        setIsMashOpen(index === "mash");
        setIsKettleOpen(index === "kettle");
        setIsWhirlpoolOpen(index === "whirlpool");
    }

    return (
        <React.Fragment>
            <TabPane tabId={props.indexv + 1}>
                <div className="accordion">
                    <Mash {...mashProps} />
                    <Kettle {...kettleProps} />
                    <Whirlpool {...whirlpoolProps} />
                    <Transfer />
                </div>
            </TabPane>
        </React.Fragment>
    );
}
