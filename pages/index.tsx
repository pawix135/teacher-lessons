import type { NextPage, GetStaticProps } from "next";

type Teacher = {
  name: string;
  href: string;
  img: string;
};

interface Props {
  teaches: Teacher[];
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    notFound: true,
  };
};

const Home: NextPage<Props> = () => {
  return <div></div>;
};

export default Home;
