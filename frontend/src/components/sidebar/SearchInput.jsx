import React from "react";

import { CiSearch } from "react-icons/ci";
const SearchInput = () => {
  return (
    <form className="flex items-center gap-2" action="">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <CiSearch className=" w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
