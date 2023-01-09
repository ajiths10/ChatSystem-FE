import React, { useReducer } from "react";
import CommonContext from "./CommonContext";
import CommonReducer from "./CommonReducer";
import { useSnackbar } from "notistack";
import { api } from "../../common/api";

const initialState = {};

const CommonState = (props) => {
  const [state, dispatch] = useReducer(CommonReducer, initialState);

  const { enqueueSnackbar } = useSnackbar();

  const setAlert = (response) => {
    enqueueSnackbar(response.message, {
      variant: response.status === 1 ? "success" : "error",
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
      //   preventDuplicate: true,
    });
  };

  return (
    <CommonContext.Provider value={{ setAlert }}>
      {props.children}
    </CommonContext.Provider>
  );
};

export default CommonState;
