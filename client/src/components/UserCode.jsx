import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
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
        `https://striver-intern.onrender.com/getSourceCode/${userId}`
      );
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Link to="/" className="top-8 left-8 mb-10">
        <svg
          className="w-6 h-6 text-gray-500 dark:text-gray-400 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>
      <Editor
        height="70vh"
        key={data.language}
        width={`100%`}
        className="block p-2.5 w-full mx-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        language={data.language}
        defaultValue={data.sourceCode}
      />
    </div>
  );
};

export default UserCode;
