import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "./component/AuthLayout";
import NonAuthLayout from "./component/NonAuthLayout";
import { authenticateUser } from "./helpers/authUtils";
import { togglePreloader } from "./store/layout/actions";
import {
  setProfileLoggedIn
} from "./store/actions";
import "react-toastify/dist/ReactToastify.css";
import "./theme.scss";
import "./jadc.scss";

const App = () => {
    const dispatch = useDispatch();

    const { loggedIn } = useSelector(state => {
        return state.Profile;
    });

    useEffect(() => {
        (async() => {
            const isAuth = await authenticateUser();
            dispatch(setProfileLoggedIn(isAuth));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!loggedIn) {
            setTimeout(() => {
                dispatch(togglePreloader(false)); // LOL we fake this!
            }, 500);
        } else {
            dispatch(togglePreloader(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    return (
        <React.Fragment>
            {!loggedIn && <NonAuthLayout />}
            {loggedIn && <AuthLayout />}
        </React.Fragment>
    );
};

export default App;