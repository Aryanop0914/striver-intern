import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import EntryTable from "./components/EntryTable";
import UserCode from "./components/UserCode";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/entries" element={<EntryTable />} />
        <Route path="/usercode/:userId" element={<UserCode />} />
      </Routes>
    </>
  );
}

export default App;
