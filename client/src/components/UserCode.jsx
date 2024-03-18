import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const UserCode = () => {
  const { userId } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    getSourceCode();
  }, [userId]);
  const getSourceCode = async () => {
    try {
      const res = await axios.get(
        `https://striver-intern.onrender.com/store/getSourceCode/${userId}`
      );
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>{data.sourceCode}</h1>
    </div>
  );
};

export default UserCode;
