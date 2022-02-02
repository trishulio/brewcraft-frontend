import React, { useEffect, useState } from "react";
import { TabPane } from "reactstrap";
import Mash from "./mash";
import Kettle from "./kettle";
import Whirlpool from "./whirlpool";
import Transfer from "./transfer";
import { useSelector } from "react-redux";

export default function BrewTabs({ mashMixture, indexv }) {
    const [isMashOpen, setIsMashOpen] = useState(true);
    const [isKettleOpen, setIsKettleOpen] = useState(false);
    const [isWhirlpoolOpen, setIsWhirlpoolOpen] = useState(false);

    const mashStage = useSelector((state) => {
        return state.Batch.Stages.content.find(
            (s) => s.id === mashMixture.brewStage.id
        );
    });

    const mashMaterialPortions = useSelector((state) => {
        return (
            mashMixture &&
            state.Batch.MaterialPortions.content.filter(
                (mp) => mp.mixture.id === mashMixture.id
            )
        );
    });

    const kettleMixture = useSelector((state) => {
        return state.Batch.Mixtures.content.find(
            (m) =>
                m.parentMixtureIds &&
                m.parentMixtureIds.includes(mashMixture.id)
        );
    });

    const kettleStage = useSelector((state) => {
        return (
            kettleMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === kettleMixture.brewStage.id
            )
        );
    });

    const kettleMaterialPortions = useSelector((state) => {
        return (
            kettleMixture &&
            state.Batch.MaterialPortions.content.filter(
                (mp) => mp.mixture.id === kettleMixture.id
            )
        );
    });

    const whirlpoolMixture = useSelector((state) => {
        return (
            kettleMixture &&
            state.Batch.Mixtures.content.find(
                (m) =>
                    m.parentMixtureIds &&
                    m.parentMixtureIds.includes(kettleMixture.id)
            )
        );
    });

    const whirlpoolStage = useSelector((state) => {
        return (
            whirlpoolMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === whirlpoolMixture.brewStage.id
            )
        );
    });

    const transferMixture = useSelector((state) => {
        if (kettleMixture && !whirlpoolMixture?.id) {
            return state.Batch.Mixtures.content.find(
                (m) =>
                    m.parentMixtureIds &&
                    m.parentMixtureIds.includes(kettleMixture.id)
            );
        } else if (whirlpoolMixture) {
            return state.Batch.Mixtures.content.find(
                (m) =>
                    m.parentMixtureIds &&
                    m.parentMixtureIds.includes(whirlpoolMixture.id)
            );
        }
    });

    const transferStage = useSelector((state) => {
        return (
            transferMixture &&
            state.Batch.Stages.content.find(
                (s) => s.id === transferMixture.brewStage.id
            )
        );
    });

    useEffect(() => {
        if (
            mashStage?.status.id &&
            mashStage?.status.id !== 2 &&
            mashStage?.status.id !== 6
        ) {
            toggleIsOpen("mash");
        }
        if (
            kettleStage?.status.id &&
            kettleStage?.status.id !== 2 &&
            kettleStage?.status.id !== 6
        ) {
            toggleIsOpen("kettle");
        }
        if (
            whirlpoolStage?.status.id &&
            whirlpoolStage?.status.id !== 2 &&
            whirlpoolStage?.status.id !== 6
        ) {
            toggleIsOpen("whirlpool");
        }
        // eslint-disable-next-line
    }, [mashStage, kettleStage, whirlpoolStage]);

    const props = {
        mashMixture,
        mashStage,
        mashMaterialPortions,
        kettleMixture,
        kettleStage,
        kettleMaterialPortions,
        whirlpoolMixture,
        whirlpoolStage,
        transferMixture,
        transferStage,
        toggleIsOpen,
    };

    function toggleIsOpen(index, show) {
        switch (index) {
            case "mash":
                setIsMashOpen(show ? true : !isMashOpen);
                setIsKettleOpen(false);
                setIsWhirlpoolOpen(false);
                break;
            case "kettle":
                setIsMashOpen(false);
                setIsKettleOpen(show ? true : !isKettleOpen);
                setIsWhirlpoolOpen(false);
                break;
            case "whirlpool":
                setIsMashOpen(false);
                setIsKettleOpen(false);
                setIsWhirlpoolOpen(show ? true : !isWhirlpoolOpen);
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <TabPane tabId={indexv + 1}>
                <div className="accordion">
                    <Mash isOpen={isMashOpen} {...props} />
                    <Kettle isOpen={isKettleOpen} {...props} />
                    <Whirlpool isOpen={isWhirlpoolOpen} {...props} />
                    <Transfer {...props} />
                </div>
            </TabPane>
        </React.Fragment>
    );
}
