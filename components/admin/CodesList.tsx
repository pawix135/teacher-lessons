import { useContext, useEffect, useState } from "react";
import { AdminContextState, AdminContextUpdater } from "../../context/admin";
import InfinityScroll from "react-infinite-scroller";
import Review from "./Review";

const CodesList = () => {
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMonuted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const ctx = useContext(AdminContextState);
  const updater = useContext(AdminContextUpdater);

  const fetchMore = async () => {
    console.log("test");

    let response = await fetch("/api/admin/getReviews", {
      method: "POST",
      body: JSON.stringify({ teacherId: ctx?.teacherId, skip, take: 5 }),
      headers: {
        "Content-Type": "application/json;",
      },
    });
    let data = await response.json();
    console.log(data);

    if (data.hasMore === false) {
      setHasMore(false);
    }

    if (data.ok) {
      setSkip((bf) => bf + 5);
      updater?.setReviews((bf: UserReview[]) => [...bf, ...data.reviews]);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    // setIsMounted(true);
    // setIsLoading(false);
    fetchMore();
  }, []);

  return (
    <div className="overflow-y-auto h-full max-h-[1000px] reviews-bar">
      {ctx!.reviews.length > 0 ? (
        <InfinityScroll
          loadMore={fetchMore}
          hasMore={hasMore}
          initialLoad={true}
          loader={<div key={0}>Ładowanie...</div>}
          threshold={50}
          useWindow={false}
        >
          {ctx?.reviews.map((rev, i) => {
            return <Review review={rev} key={rev.id} />;
          })}
        </InfinityScroll>
      ) : (
        <p>Nie posiadasz opini.</p>
      )}
    </div>
  );
};

export default CodesList;
