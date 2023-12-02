import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppContext from "../context/state";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import axios from "axios";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [alert, setAlert] = useState<Alert>({
    active: false,
    message: "",
    type: "ERROR",
  });
  const [review, setReview] = useState<UserReview>({
    name: "",
    review: "",
    image: "",
    teacherId: null,
    flagged: false,
    created_at: new Date(),
  });
  const [code, setCode] = useState<string>("");
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const checkCode = async () => {
    let { data } = await axios.post("/api/checkCode", {
      code: code,
      teacherId: review.teacherId,
    });

    return data as ICode;
  };

  const addReview = async () => {
    setIsFetching(true);

    try {
      let { data, status } = await axios.post("/api/addReview", {
        ...review,
        code,
      });

      if (status !== 200) {
        setIsFetching(false);
      }

      if (!data.ok) {
        setAlert((bf) => ({
          ...bf,
          active: true,
          message: data.message,
          type: "ERROR",
        }));
        return;
      } else {
        setAlert((bf) => ({
          ...bf,
          active: true,
          message: data.message,
          type: "SUCCESS",
        }));
        setReview({
          name: "",
          review: "",
          teacherId: null,
          image: "",
          reviewAdded: true,
          flagged: false,
          created_at: new Date(),
        });
        setIsValidated(false);
        setIsFetching(false);

        return;
      }
    } catch (error) {}
    setIsValidated(false);
    setIsFetching(false);
  };

  let context: AppContext = {
    state: {
      alert: alert,
      code: code,
      isFetching: isFetching,
      isValidated: isValidated,
      review: review,
    },
    setAlert: setAlert,
    setCode: setCode,
    setReview: setReview,
    setIsFetching: setIsFetching,
    setIsValidated: setIsValidated,
    checkCode: checkCode,
    addReview: addReview,
  };

  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          dedupingInterval: 5000,
          fetcher: (url: string) => axios(url).then((r) => r.data),
        }}
      >
        <AppContext.Provider value={context}>
          <Component {...pageProps} />
        </AppContext.Provider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
