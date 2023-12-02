import classNames from "classnames";
import { useContext, useEffect } from "react";
import AppContext from "../context/state";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

const Alert = () => {
  let ctx = useContext(AppContext);

  useEffect(() => {
    if (ctx?.state.alert.active) {
      setTimeout(() => {
        ctx?.setAlert({ message: "", active: false, type: "ERROR" });
      }, 3000);
    }
  }, [ctx?.state.alert.active]);

  return (
    <div
      className={classNames(
        "w-[250px] md:w-[350px] border-l-[10px] py-3 pr-10 pl-3 bg-white rounded-l-[5px] absolute top-5 left-1/2 -translate-x-1/2 -translate-y-[100px] transtion duration-500",
        {
          "bg-[#FFE0E3] border-[#FF4858] text-[#FF5E6C] font-medium ":
            ctx?.state.alert.type === "ERROR",
          "bg-[#C3F3D7] border-[#2FD573] text-[#47BC78] -translate-y-0":
            ctx?.state.alert.type === "SUCCESS",
          "-translate-y-0": ctx?.state.alert.active,
          "-translate-y-[100px]": !ctx?.state.alert.active,
        },
        "flex flex-row items-center gap-3"
      )}
    >
      {ctx?.state.alert.type === "SUCCESS" && (
        <FaCheckCircle size={24} color="#2FD573" />
      )}
      {ctx?.state.alert.type === "ERROR" && (
        <AiFillCloseCircle size={24} color="#FF4858" />
      )}
      <span>{ctx?.state.alert.message}</span>
    </div>
  );
};

export default Alert;
