import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { AdminContextUpdater } from "../../context/admin";
import CodesList from "./CodesList";
import TopBar from "./TopBar";

const TeacherPanel: React.FunctionComponent = () => {
  let { data: session, status } = useSession();

  let updater = useContext(AdminContextUpdater);

  useEffect(() => {
    if (status === "authenticated") {
      updater?.setName(session?.user.name);
      updater?.setTeacherId(session?.user.id);
    }
  }, []);

  useEffect(() => {
    updater?.setName(session?.user.name);
  }, [session?.user]);

  return (
    <div className="flex pt-5 md:pt-0 md:items-center h-screen">
      <div className="flex flex-1 gap-5 flex-col max-w-[900px] mx-2 md:mx-auto bg-white/30 h-5/6 md:h-3/4 rounded-lg py-5 px-5">
        <TopBar />
        <CodesList />
      </div>
    </div>
  );
};

export default TeacherPanel;
