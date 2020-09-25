import { combineReducers  } from 'redux';

import RawMaterial from "./RawMaterial/reducer";
import InProcess from "./InProcess/reducer";
import Used from "./Used/reducer";
import Wasted from "./Wasted/reducer";

export default combineReducers({
    RawMaterial,
    InProcess,
    Used,
    Wasted
});