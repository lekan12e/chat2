import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import { Logout } from "./Logout";

const Sidebar = () => {
  return (
    <div className="border-r p4 flex flex-col border-r-slate-500">
      <SearchInput />
      <div
        className="divider px-3"
        style={{ backgroundColor: "white", height: "1px" }}></div>
      <Conversations />
      <Logout />
    </div>
  );
};

export default Sidebar;
