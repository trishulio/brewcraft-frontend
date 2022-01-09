import { FETCH_MINI_CARD_BREWS_MIXTURES_REQUEST } from "./actionTypes";

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
