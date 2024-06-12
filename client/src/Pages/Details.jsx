import axios from "axios";
import React, { useEffect, useState } from "react"; // Import useState
import { useParams } from "react-router-dom";
import { BASEURL } from "../lib/data";

function Details() {
  let { id } = useParams();

  // Initialize state to hold the fetched data
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAPI = () => {
      axios.get(BASEURL + `task/details/${id}`).then((res) => {
        setData(res.data.task);
      });
    };
    fetchAPI();
  }, []);

  return (
    <div>
      <div>{data && data.title}</div>
      <div>{data && data.des}</div>
    </div>
  );
}

export default Details;
