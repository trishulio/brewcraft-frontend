import AxiosInstance from "./axiosInstance";

/*
 * Fetch presigned upload URL from backend, presigned URL
 * can be used to upload a file to S3.
 */
async function getPresignedUploadUrl(fileKey, expiration) {
    const requestBody = [
        {
            fileKey: fileKey,
            minValidUntil: expiration,
        },
    ];

    try {
        const response = await AxiosInstance.put(
            "/api/v1/vfs/files",
            requestBody
        );
        if (response.status === 202) {
            return response.data[0];
        }
        throw Error(response.statusText);
    } catch (e) {
        console.log("Failed to get presigned upload url with error:" + e);
    }
}

/*
 * Fetches a presigned url and uploads file to S3
 * Returns true if upload is successful
 */
export async function putFile(fileKey, file) {
    const expiration = new Date(Date.now() + 60 * 60 * 1000).toISOString(); //1 hour expiration time
    const response = await getPresignedUploadUrl(fileKey, expiration);
    const presignedUrl = response?.fileUrl;

    let putSuccess = false;
    if (presignedUrl) {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "multipart/form-data" },
            body: file,
        };

        try {
            const response = await fetch(presignedUrl, requestOptions);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            putSuccess = true;
        } catch (e) {
            console.log("Failed to upload file to S3 with error: " + e);
        }
    }
    return putSuccess;
}
