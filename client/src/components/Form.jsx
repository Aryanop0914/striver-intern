import React, { useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import languages from "../constants/language";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "./Loader";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const sucessNotify = (message) => toast.success(message);
  const errorNotify = (message) => toast.error(message);
  const defaultOption = languages[0].vs;
  const defaultOptionl = languages[0].id;
  const [language_id, setLanguageId] = useState(defaultOptionl);
  const [output, setOutput] = useState(" ");
  const [userdata, setUserData] = useState({
    username: "",
    language: defaultOption,
    stdInput: "",
    sourceCode: "",
  });
  const handleSubmit = async () => {
    const timestamp = new Date().toLocaleString();
    try {
      setLoading(true);
      const res = await axios.post(
        `https://striver-intern.onrender.com/store`,
        { ...userdata, timestamp },
        {
          "content-type": "application/json",
        }
      );
      setLoading(false);
      sucessNotify(res.data.message);
    } catch (error) {
      setLoading(false);
      errorNotify("Something Went Wrong!!");
    }
  };
  const handleRun = async () => {
    setOutput(" ");
    const data = {
      language_id: language_id,
      source_code: userdata.sourceCode,
      stdin: userdata.stdInput,
    };
    if (data.source_code != null || data.language_id != null) {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://judge0-ce.p.rapidapi.com/submissions",
          data,
          {
            params: {
              base64_encoded: "false",
              fields: "*",
            },
            headers: {
              "content-type": "application/json",
              "Content-Type": "application/json",
              "X-RapidAPI-Key":
                "4a26b10084msh5ebdf2e16ed7a98p136d3djsnfd2145dd2f00",
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );
        const output = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}`,
          {
            params: {
              base64_encoded: "false",
              fields: "*",
            },
            headers: {
              "X-RapidAPI-Key":
                "4a26b10084msh5ebdf2e16ed7a98p136d3djsnfd2145dd2f00",
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );
        if (output.data.stderr == null) {
          setOutput(output.data.stdout);
          setLoading(false);
          sucessNotify("Complied successfully!!");
        } else {
          setOutput(output.data.stderr);
          setLoading(false);
          errorNotify("Something Went Wrong!!");
        }
      } catch (error) {
        setLoading(false);
        errorNotify("Something Went Wrong!!");
      }
    } else {
      setLoading(false);
      errorNotify("Fill all the Inputs!!");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="mb-4 mt-20 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-6xl dark:text-white">
        TUF (SDE Intern)
      </h1>
      <p className="mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Aryan Patel
      </p>
      <div className="flex items-center mx-auto w-full px-12 mb-4 mt-4">
        <div className="relative w-full flex flex-row">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
            placeholder="Username"
            onChange={(e) => {
              setUserData({ ...userdata, username: e.target.value });
            }}
            required
          />
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
            onChange={(e) => {
              const selectedLanguageId = e.target.value;
              setLanguageId(selectedLanguageId);
              const selectedLanguage = languages.find(
                (language) => language.id === selectedLanguageId
              );
              if (selectedLanguage) {
                setUserData({ ...userdata, language: selectedLanguage.vs });
              }
            }}
          >
            {languages.map((language) => (
              <option value={language.id} key={language.id}>
                {language.name}
              </option>
            ))}
          </select>
          <textarea
            type="text"
            rows="1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
            placeholder="stdInput"
            onChange={(e) => {
              setUserData({ ...userdata, stdInput: e.target.value });
            }}
            required
          />
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-row basis-3/4 pl-6">
          <Editor
            height="70vh"
            key={userdata.language}
            width={`100%`}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            language={userdata.language}
            defaultValue="// some comment"
            onChange={(value) => {
              setUserData({ ...userdata, sourceCode: value });
            }}
          />
        </div>
        <div className="flex flex-col basis-1/4 px-4">
          <div className="flex flex-row  w-full h-3/4">
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-white-900 bg-black-50 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Output"
              value={output}
              disabled
            />
          </div>
          <div className="flex justify-between mt-4 mx-12">
            <button
              type="button"
              onClick={handleRun}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Run
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mx-auto w-full bg-white text-black dark:bg-black dark:text-white">
        <Link
          to={"/entries"}
          className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          View Entries
        </Link>
      </div>
      {loading && (
        <div className="overlay fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Form;
