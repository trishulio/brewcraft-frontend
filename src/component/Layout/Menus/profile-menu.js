import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { signOut } from "../../../helpers/authUtils";
import { togglePreloader } from "../../../store/layout/actions";

// Import Images
import user from "../../../assets/images/users/user-4.jpg";

export default function ProfileMenu() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const onSignOut = () => {
        dispatch(togglePreloader(true));
        signOut();
    };

    return (
        <React.Fragment>
            <Dropdown
                isOpen={isOpen}
                toggle={() => setIsOpen(!isOpen)}
                className="d-inline-block"
            >
                <DropdownToggle
                    tag="button"
                    className="btn header-item waves-effect"
                    id="page-header-user-dropdown"
                >
                    <img
                        className="rounded-circle header-profile-user"
                        src={user}
                        alt="Header Avatar"
                    />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem tag="a" href="#">
                        <i className="mdi mdi-account-circle font-size-17 text-muted align-middle mr-1"></i>{" "}
                        Profile
                    </DropdownItem>
                    {/* <DropdownItem tag="a" href="#"><i className="mdi mdi-wallet font-size-17 text-muted align-middle mr-1"></i> My Wallet</DropdownItem> */}
                    {/* <DropdownItem tag="a" href="#" className="d-block"><span className="badge badge-success float-right">11</span><i className="mdi mdi-settings font-size-17 text-muted align-middle mr-1"></i> Settings</DropdownItem>
                    <DropdownItem tag="a" href="#"><i className="mdi mdi-lock-open-outline font-size-17 text-muted align-middle mr-1"></i> Lock screen</DropdownItem>
                    <DropdownItem tag="a" href="#" divider></DropdownItem> */}
                    <DropdownItem
                        tag="a"
                        onClick={onSignOut}
                        className="text-danger"
                    >
                        <i className="mdi mdi-power font-size-17 text-muted align-middle mr-1 text-danger"></i>{" "}
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
}
