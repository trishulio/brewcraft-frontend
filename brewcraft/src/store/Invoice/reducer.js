import {
  FETCH_INVOICE_REQUEST,
  FETCH_INVOICE_SUCCESS,
  FETCH_INVOICE_FAILURE,
  ADD_INVOICE_REQUEST,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_FAILURE,
  EDIT_INVOICE_REQUEST,
  EDIT_INVOICE_SUCCESS,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
  OPEN_INVOICE_REQUEST
} from "./actionTypes";
import { findIndex, get, filter,indexOf, values } from "lodash";
const initialState = {
  data: [
    {
      id: "1",
      invoice_id:2,
      status: "status test",
      due: "due test",
      date: "date test",
      number: "number test",
      customer: "customer test",
      amount_due: "amount_due test",
      delivery_date: "delivery_date test",
      payment_date: "payment_date test",
      unpaid:false,
      paid:true,
    },
    {
      id: "2",
      invoice_id:3,
      status: "status test",
      due: "due test",
      date: "date test",
      number: "number test",
      customer: "customer test",
      amount_due: "amount_due test",
      delivery_date: "delivery_date test",
      payment_date: "payment_date test",
      unpaid:false,
      paid:true,
    }, 
   
  ],
  loading: false,
  error: null,
  formLoading: {
    loading: false,
    error: false,
    message: "",
  },
};

const Invoice = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_INVOICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_INVOICE_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: null,
      };
    case FETCH_INVOICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_INVOICE_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading,error:false, loading: true, },
      };
    case ADD_INVOICE_SUCCESS:
      return {
        ...state,
        data: [...state.data, payload],
        formLoading: { ...state.formLoading, loading: false, },
      };
    case ADD_INVOICE_FAILURE:
      return {
        ...state,
        formLoading: {
          ...state.formLoading,
          loading: false,
          error: true,
          message: payload,
        },
      };
    case EDIT_INVOICE_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading, loading: true },
      };
    case EDIT_INVOICE_SUCCESS:
      let editIndex = findIndex([...state.data], function (o) {
        return o.id == get(payload, "id");
      });
      return {
        ...state,
        data: [
          ...state.data.slice(0, editIndex),
          payload,
          ...state.data.slice(editIndex + 1),
        ],
        formLoading: { ...state.formLoading, loading: false },
      };
      case DELETE_INVOICE_REQUEST:
        return {
          ...state,
          formLoading: { ...state.formLoading, loading: true },
        };
      case DELETE_INVOICE_SUCCESS:
          var pyaloadar = values(payload);
           var filterData =  filter([...state.data], (value)=>{
                if( indexOf(pyaloadar, get(value,'id')) == -1){
                    return values;
                }
            })

        return {
          ...state,
          data: filterData,
          formLoading: { ...state.formLoading, loading: false },
        };

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Invoice;
