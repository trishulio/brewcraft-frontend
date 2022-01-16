import {
    FETCH_MINI_CARD_BREWS_MIXTURES_REQUEST,
    FETCH_MINI_CARD_FINISHED_GOODS_REQUEST,
} from "./actionTypes";

export const fetchMiniCardBrewsMixtures = ({
    brewIds,
    stageStatusIds,
    stageTaskIds,
}) => ({
    type: FETCH_MINI_CARD_BREWS_MIXTURES_REQUEST,
    payload: {
        params: {
            brewIds,
            stageStatusIds,
            stageTaskIds,
        },
    },
});

export const fetchMiniCardFinishedGoods = ({ brewIds }) => ({
    type: FETCH_MINI_CARD_FINISHED_GOODS_REQUEST,
    payload: {
        params: {
            brewIds,
        },
    },
});
