import React, { Fragment, useEffect, useState } from "react";
import { setBreadcrumbItems } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { findIndex, get } from "lodash";
import Detail from "./detail";

export default function DeliverDetail() {
  // dispatch action
  let { id } = useParams();
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.Driver
  );
  // component did mount alternative for functional component
  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Delivery", [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Delivery", link: "/delivery" },
        { title: `Delivery Driver ${id}`, link: "#" },
      ])
    );
    setUserData(
      findIndex(data, function (o) {
        return o.id === id;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // if contacts is fatching first time
  if (loading) {
    return <div>Loading...</div>;
  }
  // somthing wrong first time
  if (error) {
    return <div>Error</div>;
  }
  // unconditional error occur
  if (!data) {
    return null;
  }
  return (
    <Fragment>
    {userData === -1 ? (
      <div>not found</div>
    ) : <Detail detail={get(data, userData)} />}
    </Fragment>

  );
}

