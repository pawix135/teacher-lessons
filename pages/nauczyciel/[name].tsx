import type { NextPage, GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import Alert from "../../components/Alert";
import TeacherComponent from "../../components/Teacher";
import { useRouter } from "next/router";
import AppContext from "../../context/state";
import ReviewForm from "../../components/RevieForm";
import Head from "next/head";
import { prisma } from "../../db";
import { Teacher } from "../../@types/teacher";

interface Props {
  teacher: Teacher & { code: string };
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.query || !ctx.query.code || !ctx.query.name)
    return {
      notFound: true,
    };

  let { code, name } = ctx.query;

  let teacher = await prisma.teacher.findFirst({
    where: {
      AND: {
        name: name as string,
        codes: {
          some: {
            code: code as string,
            active: true,
          },
        },
      },
    },
    select: {
      name: true,
      id: true,
    },
  });

  if (!teacher) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      teacher: {
        id: teacher.id,
        name: teacher.name,
        image: `/${teacher.name.toLocaleLowerCase()}.jpg`,
        code,
      },
    },
  };
};

const Teacher: NextPage<Props> = ({ teacher }) => {
  const router = useRouter();

  const ctx = useContext(AppContext);

  useEffect(() => {
    ctx?.setReview((bf: any) => ({ ...bf, teacherId: teacher.id }));
    ctx?.setCode(teacher.code);
  }, []);

  useEffect(() => {
    if (ctx?.state.review.reviewAdded) {
      router.push("/dziekujemy");
    }
  }, [ctx?.state.review.reviewAdded]);

  return (
    <>
      <Head>
        <title>{teacher.name} - Opinia</title>
      </Head>
      <div className="max-w-[500px] mx-auto mt-5">
        <TeacherComponent
          css="max-w-[300px] mx-auto"
          href="#"
          img={teacher.image!}
          name={teacher.name}
        />

        <ReviewForm />
        <Alert />
      </div>
    </>
  );
};

export default Teacher;
