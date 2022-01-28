import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "./component/AuthLayout";
import NonAuthLayout from "./component/NonAuthLayout";
import { authenticateUser } from "./helpers/authUtils";
import { setInterceptorHistory } from "./helpers/axiosInstance";
import { togglePreloader } from "./store/layout/actions";
import { setProfileLoggedIn, setGlobalRedirect } from "./store/actions";
import "react-toastify/dist/ReactToastify.css";
import "./theme.scss";
import "./jadc.scss";
import { useHistory } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    TimeScale,
    LinearScale,
    ArcElement,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    setInterceptorHistory(history);

    const { loggedIn } = useSelector((state) => {
        return state.Profile;
    });

    const { redirect } = useSelector((state) => {
        return state.Brewery;
    });

    useEffect(() => {
        (async () => {
            const isAuth = await authenticateUser();
            dispatch(setProfileLoggedIn(isAuth));
        })();
    }, [dispatch]);

    useEffect(() => {
        dispatch(togglePreloader(!loggedIn));
    }, [loggedIn, dispatch]);

    useEffect(() => {
        if (redirect) {
            history.push({
                pathname: redirect.pathname,
                search: redirect.search,
            });
            dispatch(setGlobalRedirect(""));
        }
    }, [redirect, dispatch, history]);

    function isAuthLayout() {
        return window.location.pathname === "/404" || !loggedIn;
    }

    return (
        <React.Fragment>
            {isAuthLayout() && <NonAuthLayout />}
            <AuthLayout />
        </React.Fragment>
    );
};

export default App;
