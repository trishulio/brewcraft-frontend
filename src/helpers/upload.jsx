import React from "react";
import { uploadFile } from "react-s3";
import Axios from "axios";
import { Auth } from "aws-amplify";
import { authenticateUser } from "./authUtils";

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    dirName: "cognito/brewcraft/public",
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
};

export const UploadImage = () => {
    const onSelectFile = (e) => {
        const file = e.target.files[0];
        uploadFile(file, config)
            .then((data) => {
                const getsession = Auth.currentSession();
                if (!getsession) authenticateUser();
                debugger;
                Axios.get(data.location).then((data) => console.log(data));
            })
            .catch((err) => console.error(err));
    };

    return <input type="file" accept="image/*" onChange={onSelectFile} />;
};
