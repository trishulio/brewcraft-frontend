import { toast } from "react-toastify";
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
      toast.warn("There was an warning.", {
        closeButton: false,
      });
      break;
    case "error":
    default:
      toast.error("There was an error please try again", {
        closeButton: false,
      });
      break;
  }
  callBack && callBack();
};
