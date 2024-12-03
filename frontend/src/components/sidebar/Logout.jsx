import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

export const Logout = () => {
  const { loading, logout } = useLogout();
  return (
    <>
      <div className="mt-auto">
        {loading ? (
          <div className="loading loading-spinner"></div>
        ) : (
          <BiLogOut
            onClick={logout}
            className="w-6 h-6 text-white cursor-pointer"
          />
        )}
      </div>
    </>
  );
};
