import { toast} from "mdbreact";

export const INFO = "info";
export const SUCCESS = "success";
export const WARNING = "warning";
export const ERROR = "error";

export const apiResponse = (TYPE, callBack) => {
    switch (TYPE) {
        case "info":
          toast.info("Hi!", {
            closeButton: false,
          });
          break;
        case "success":
          toast.success("Success!", {
            closeButton: false,
          });
          break;
        case "warning":
          toast.warn("this is warning", {
            closeButton: false,
          });
          break;
        case "error":
          toast.error("this is an error.", {
            closeButton: false,
          });
          break;
        default:
          toast.error("Error message", {
            closeButton: false,
          });
      }
      callBack && callBack();
  };