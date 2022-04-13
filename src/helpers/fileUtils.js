import { generateUuid } from "./utils";

/*
 * Returns true if file is type image and <= 5MB size
 */
export function isValidImageFile(file) {
    const fileSizeMB = file && file.size / 1024 / 1024;
    return file && file["type"].split("/")[0] === "image" && fileSizeMB <= 5;
}

/*
 * Returns file extension from file name or empty string if file name contains no extension
 * For ex. input abc.jpg returns jpg
 */
export function getFileExtension(fileName) {
    return (fileName.includes(".") && fileName.split(".").pop()) || null;
}

/*
 * Returns a unique filekey using UUID.  Maintains files extension if extension exists
 */
export function createFileKey(fileName) {
    const fileExtension = getFileExtension(fileName);
    let fileKey = generateUuid();
    if (fileExtension) {
        fileKey += "." + fileExtension;
    }
    return fileKey;
}
