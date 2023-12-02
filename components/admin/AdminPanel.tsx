import classNames from "classnames";
import { signOut } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { Teacher } from "../../@types/teacher";
import { fetchTeachers } from "../../fetchers";
import Button from "../Button";
import Tetcher from "../Teacher";

const AdminPanel: React.FunctionComponent = () => {
  const [teachers, setTeachers] = useState<Teacher[]>();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>();

  let { data } = useSWR<{ ok: boolean; teachers: Teacher[] }>(
    "/api/getTeachers"
  );

  useEffect(() => {
    setTeachers(
      data?.teachers.map((teacher) => ({
        ...teacher,
        image: `/${teacher.name.toLocaleLowerCase()}.jpg`,
      }))
    );
  }, [data]);

  const selectTeacher = (e: MouseEvent, teacherId: number) => {
    e.preventDefault();

    setSelectedTeacher(teachers?.filter((tech) => tech.id === teacherId)[0]);
  };

  return (
    <div className="w-full h-screens">
      <Button onClick={() => signOut()}>Wyloguj się</Button>
      <div className="grid lg:grid-cols-1 lg:grid-rows-5 gap-5 md:max-w-[1300px] bg-white/40 rounded-lg lg:mx-auto px-2 py-2 my-5">
        {teachers &&
          teachers.map((teacher, i) => {
            return (
              <div
                className="flex flex-col md:flex-row px-2 py-2"
                key={`${teacher}-${i}`}
              >
                <Tetcher
                  img={teacher.image!}
                  href="#"
                  name={teacher.name}
                  css={classNames("w-[300px]", {
                    "bg-red-500 text-white": selectedTeacher?.id === teacher.id,
                  })}
                  onClick={(e) => {
                    selectTeacher(e, teacher.id);
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminPanel;
