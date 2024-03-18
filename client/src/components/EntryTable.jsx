import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const EntryTable = () => {
  const [userdetails, setUserDetails] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getUserData();
  }, [page]);
  const getUserData = async () => {
    try {
      const response = await axios.get(
        `https://striver-intern.onrender.com/getinfo`,
        {
          params: { page, limit: 5 },
          headers: { "content-type": "application/json" },
        }
      );
      setUserDetails(response.data.data);
    } catch (error) {
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
      <nav
        aria-label="Page navigation example"
        className="flex flex-row justify-center mt-10"
      >
        <ul className="inline-flex -space-x-px text-base h-10">
          <li
            onClick={() => {
              setPage((prev) => Math.max(prev - 1, 1));
            }}
          >
            <p className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </p>
          </li>
          {[1, 2, 3, 4, 5].map((pageNumber) => (
            <li
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`${
                page === pageNumber
                  ? "bg-gray-700 text-white"
                  : "text-white bg-gray-800"
              } border border-gray-700 hover:bg-gray-700 hover:text-white`}
            >
              <p className="flex items-center justify-center px-4 h-10 leading-tight">
                {pageNumber}
              </p>
            </li>
          ))}
          <li
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            <p className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default EntryTable;
