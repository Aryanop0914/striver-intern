import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
const EntryTable = () => {
  const [loading, setLoading] = useState(false);
  const [userdetails, setUserDetails] = useState([]);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://striver-intern.onrender.com/getinfo`,
        {
          headers: { "content-type": "application/json" },
        }
      );
      setUserDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="w-full p-12">
      <Link to="/" className="top-8 left-8">
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
              <th scope="col" className="px-6 py-3">
                Standard Input
              </th>
              <th scope="col" className="px-6 py-3">
                Time Stamp
              </th>
              <th scope="col" className="px-6 py-3">
                View Profile
              </th>
            </tr>
          </thead>
          <tbody>
            {userdetails.map((user) => (
              <tr
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                key={user.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.username}
                </th>
                <td className="px-6 py-4">{user.language}</td>
                <td className="px-6 py-4">{user.stdInput}</td>
                <td className="px-6 py-4">{user.createdAt}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/userCode/${user.id}`}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    View Source Code
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="overlay fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default EntryTable;
