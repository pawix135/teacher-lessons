import { signOut } from "next-auth/react";
import { useContext } from "react";
import { AdminContextState } from "../../context/admin";
import Button from "../Button";
import CodeInput from "./CodeInput";
import { FaArrowAltCircleUp } from "react-icons/fa";

const TopBar: React.FunctionComponent = () => {
  let ctx = useContext(AdminContextState);

  return (
    <div className="flex flex-row justify-between mx-2">
      <CodeInput />
      <Button className="group relative">
        <span className="flex flex-row gap-3 items-center">
          {ctx?.name}
          <FaArrowAltCircleUp
            size={15}
            color="white"
            className="transition duration-150 group-hover:rotate-180"
          />
        </span>
        <div className="z-50 flex-col gap-3 py-5 absolute translate-y-1/2 -bottom-1/2 -translate-x-1/2 left-1/2 transition duration-200 opacity-0 hidden group-hover:flex group-hover:opacity-100 bg-white rounded-lg w-max px-16">
          <span className="text-[#A946FE] hover:text-[#8e3bd6]">
            zmień hasło
          </span>
          <span
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-[#A946FE] hover:text-[#8e3bd6]"
          >
            wyloguj się
          </span>
        </div>
      </Button>
    </div>
  );
};

export default TopBar;
