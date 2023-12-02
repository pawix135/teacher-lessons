import type { NextPage, GetServerSideProps } from "next";
import AdminContextProvider from "../../context/admin";
import { getSession } from "next-auth/react";
import TeacherPanel from "../../components/admin/TeacherPanel";
import AdminPanel from "../../components/admin/AdminPanel";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let session = await getSession(context);

  return {
    props: {
      type: session?.user.type,
    },
  };
};

const Page: NextPage<{ type: string }> = ({ type }) => {
  return type === "TEACHER" ? (
    <AdminContextProvider>
      <TeacherPanel />
    </AdminContextProvider>
  ) : (
    <AdminPanel />
  );
};

export default Page;
