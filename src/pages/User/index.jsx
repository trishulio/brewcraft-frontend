import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    resetUserDetails,
    setUserDetailsError,
    setUserInvalidUserName,
    setUserInvalidFirstName,
    setUserInvalidLastName,
    setUserInvalidDisplayName,
    setUserInvalidEmail,
    setUserInvalidPhoneNumber,
    setUserInvalidRoles,
    setUserInvalidImageFile,
    fetchAllUserRoles,
} from "../../store/actions";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";
import UserInner from "./user";
import {
    useQuery,
    isValidName,
    isValidEmail,
    isValidPhoneNumber,
    isNotEmptyArray,
} from "../../helpers/utils";
import { isValidImageFile } from "../../helpers/fileUtils";
import { putFile } from "../../helpers/vfs";

export default function User() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const query = useQuery();
    const editMode = query.get("edit");
    const history = useHistory();

    const dispatch = useDispatch();

    const user = useSelector((state) => {
        return state.User.data;
    });

    const initialUser = useSelector((state) => {
        return state.User.initial;
    });

    useEffect(() => {
        dispatch(resetUserDetails());

        if (!id || id === "new") {
            history.replace("/users/new?edit=true");
        } else {
            dispatch(fetchUserById(id));
        }

        if (editMode) {
            dispatch(fetchAllUserRoles());
        }

        setEditable(editMode && editMode !== "false");
        setShowRouterPrompt(!!editMode);
    }, [id, editMode, dispatch, history]);

    useEffect(() => {
        if (user.id) {
            dispatch(
                setBreadcrumbItems(user.userName, [
                    { title: "Main", link: "#" },
                    { title: "Users", link: "#" },
                    { title: "User", link: "#" },
                ])
            );
        } else {
            dispatch(
                setBreadcrumbItems("New User", [
                    { title: "Main", link: "#" },
                    { title: "Users", link: "#" },
                    { title: "User", link: "#" },
                ])
            );
        }
        setChanged(isChanged());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    function isChanged() {
        return (
            JSON.stringify(
                (({
                    id,
                    userName,
                    displayName,
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    status,
                    salutation,
                    roles,
                    imageFile,
                }) => ({
                    id,
                    userName,
                    displayName,
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    status,
                    salutation,
                    roles,
                    imageFile,
                }))(initialUser)
            ) !==
            JSON.stringify(
                (({
                    id,
                    userName,
                    displayName,
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    status,
                    salutation,
                    roles,
                    imageFile,
                }) => ({
                    id,
                    userName,
                    displayName,
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    status,
                    salutation,
                    roles,
                    imageFile,
                }))(user)
            )
        );
    }

    async function onSave() {
        if (!isChanged()) {
            history.push("/users/" + id);
            return;
        }

        if (!validateUserInputs(user)) {
            return;
        }

        const selectedImageFile = user.imageFile;
        if (selectedImageFile) {
            const bPutFileSuccess = await putFile(
                user.imageSrc,
                selectedImageFile
            );

            if (!bPutFileSuccess) {
                dispatch(setUserDetailsError(true));
                return;
            }
        }

        if (user.id) {
            dispatch(
                updateUser({
                    id: user.id,
                    form: {
                        userName:
                            user.userName?.trim().length > 0
                                ? user.userName
                                : null,
                        displayName:
                            user.displayName?.trim().length > 0
                                ? user.displayName
                                : null,
                        firstName:
                            user.firstName?.trim().length > 0
                                ? user.firstName
                                : null,
                        lastName:
                            user.lastName?.trim().length > 0
                                ? user.lastName
                                : null,
                        //email: Email is not editable, backend does not accept it in update payloads
                        phoneNumber:
                            user.phoneNumber?.trim().length > 0
                                ? user.phoneNumber
                                : null,
                        imageSrc:
                            user.imageSrc?.trim().length > 0
                                ? user.imageSrc
                                : null,
                        statusId: 1, //Enforce all new users as "Enabled" until we allow users to be disabled
                        salutationId: user.salutation
                            ? user.salutation.id
                            : null,
                        roleIds: user.roles
                            ? user.roles.map((role) => role.id)
                            : null,
                        version: user.version,
                    },
                })
            );
        } else {
            dispatch(
                createUser({
                    form: {
                        userName:
                            user.userName?.trim().length > 0
                                ? user.userName
                                : null,
                        displayName:
                            user.displayName?.trim().length > 0
                                ? user.displayName
                                : null,
                        firstName:
                            user.firstName?.trim().length > 0
                                ? user.firstName
                                : null,
                        lastName:
                            user.lastName?.trim().length > 0
                                ? user.lastName
                                : null,
                        email:
                            user.email?.trim().length > 0 ? user.email : null,
                        phoneNumber:
                            user.phoneNumber?.trim().length > 0
                                ? user.phoneNumber
                                : null,
                        imageSrc:
                            user.imageSrc?.trim().length > 0
                                ? user.imageSrc
                                : null,
                        statusId: 1, //Enforce all new users as "Enabled" until we allow users to be disabled
                        salutationId: user.salutation
                            ? user.salutation.id
                            : null,
                        roleIds: user.roles
                            ? user.roles.map((role) => role.id)
                            : null,
                        version: user.version,
                    },
                })
            );
        }
    }

    function validateUserInputs(user) {
        let result = true;

        if (!isValidName(user.userName)) {
            dispatch(setUserInvalidUserName(true));
            result = false;
        }
        if (!isValidName(user.firstName)) {
            dispatch(setUserInvalidFirstName(true));
            result = false;
        }
        if (!isValidName(user.lastName)) {
            dispatch(setUserInvalidLastName(true));
            result = false;
        }
        if (!isValidName(user.displayName)) {
            dispatch(setUserInvalidDisplayName(true));
            result = false;
        }
        if (!isValidEmail(user.email)) {
            dispatch(setUserInvalidEmail(true));
            result = false;
        }
        if (!isNotEmptyArray(user.roles)) {
            dispatch(setUserInvalidRoles(true));
            result = false;
        }
        if (
            user.phoneNumber &&
            user.phoneNumber.length > 0 &&
            !isValidPhoneNumber(user.phoneNumber)
        ) {
            dispatch(setUserInvalidPhoneNumber(true));
            result = false;
        }
        if (user.imageFile && !isValidImageFile(user.imageFile)) {
            dispatch(
                setUserInvalidImageFile({
                    invalidImageFile: true,
                    error: true,
                })
            );
            result = false;
        }

        return result;
    }

    function onEdit() {
        history.push({
            pathname: `/users/${id}`,
            search: "?edit=true",
        });
    }

    function onDelete() {
        setShowDeletePrompt(!!user.id);
    }

    return (
        <React.Fragment>
            <DeleteGuard
                when={showDeletePrompt}
                confirm={() => {
                    dispatch(deleteUser(user.id));
                    setShowRouterPrompt(false);
                }}
                close={() => {
                    setShowDeletePrompt(false);
                }}
                content="This cannot be undone. Are you sure want to delete this user?"
            />
            <RouteLeavingGuard
                when={showRouterPrompt}
                navigate={(path) => {
                    history.push(path);
                }}
                shouldBlockNavigation={() => editMode && isChanged()}
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <UserInner
                {...{ user, editable, changed, onSave, onEdit, onDelete }}
            />
        </React.Fragment>
    );
}
