import classNames from "classnames";
import {
  InputHTMLAttributes,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { AdminContextState } from "../../context/admin";
import AppContext from "../../context/state";
import Alert from "../Alert";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  ma?: boolean;
}

const CodeInput: React.FunctionComponent<Props> = ({ ma, ...props }) => {
  let ctx = useContext(AdminContextState);
  let appCtx = useContext(AppContext);

  const [code, setCode] = useState("");

  const selectAll = (e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
    navigator.clipboard.writeText(code).then(
      () => {
        console.log("Copied to clipboard");
        appCtx?.setAlert({
          active: true,
          message: "Skopiowano link!",
          type: "SUCCESS",
        });
      },
      (error) => {
        appCtx?.setAlert({
          active: true,
          message: "Coś poszło nie tak!",
          type: "ERROR",
        });
        console.log("Rejected");
      }
    );
  };

  const refreshCode = async () => {
    let response = await fetch("/api/admin/refreshCode", {
      method: "POST",
      body: JSON.stringify({ teacherId: ctx?.teacherId }),
      headers: { "Content-Type": "application/json;" },
    });
    let data = await response.json();

    if (data.ok)
      setCode(
        `https://gosia-opinie.vercel.app/nauczyciel/${ctx?.name.toLocaleLowerCase()}?code=${
          data.code
        }`
      );
    else setCode("ErRoR");

    return;
  };

  useEffect(() => {
    if (!ctx?.name) return;
    refreshCode();
  }, [ctx?.name]);

  return (
    <>
      <div
        className={classNames("flex flex-row flex-1 gap-0 relative md:mr-3", {
          "mx-auto": ma,
        })}
      >
        <input
          type="text"
          value={code}
          onChange={(e) => e.preventDefault()}
          onClick={selectAll}
          {...props}
          className={classNames(
            "md:py-3 flex-1 font-bold rounded-md border-b-4 bg-white/20 border-white text-black md:text-xl transition duration-150 outline-none",
            "py-3 pl-2 "
          )}
        />
        <div className="absolute right-0 -translate-y-1/2 top-1/2 mr-5 transition duration-500 hover:rotate-180 group">
          <FiRefreshCcw
            size={24}
            className="group-hover:text-white text-black"
            onClick={refreshCode}
          />
        </div>
      </div>
      {appCtx?.state.alert.active && <Alert />}
    </>
  );
};

export default CodeInput;
