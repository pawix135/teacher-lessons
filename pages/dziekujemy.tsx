import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title>Dziękujemy ♥</title>
      </Head>
      <div className="w-screen h-screen flex flex-row items-center justify-center">
        <h1 className="text-center font-bold text-3xl text-white">
          Dziękujemy za Twoją opinię :)
        </h1>
      </div>
    </>
  );
};

export default Page;
