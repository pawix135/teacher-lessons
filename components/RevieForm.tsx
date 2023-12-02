import { ChangeEvent, useContext, useState } from "react";
import AppContext from "../context/state";
import Button from "./Button";

const ReviewForm: React.FunctionComponent = () => {
  const [revieCount, setRevieCount] = useState(0);

  const ctx = useContext(AppContext);

  const editReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRevieCount(e.target.textLength);
    ctx?.setReview((bf: any) => ({ ...bf, review: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-3 px-3 pb-5">
      <label className="font-bold tracking-wide" htmlFor="name">
        Imię
      </label>
      <input
        className="rounded-lg pl-2 py-2 shadow-lg outline-[#9c9c9ca9] text-[#131313] font-medium"
        type="text"
        id="name"
        value={ctx?.state.review.name}
        disabled={ctx?.state.isFetching}
        onChange={(e) =>
          ctx?.setReview((bf: any) => ({ ...bf, name: e.target.value }))
        }
      />
      <label className="font-bold tracking-wide" htmlFor="review">
        Twoja opinia
      </label>
      <textarea
        name="review"
        className="rounded-lg py-2 px-2 shadow-lg outline-[#9c9c9ca9] text-[#131313] font-medium"
        id="review"
        cols={30}
        rows={10}
        minLength={20}
        maxLength={500}
        disabled={ctx?.state.isFetching}
        onChange={editReview}
      ></textarea>
      <span className="text-right -mt-2">{revieCount} / 500</span>
      <Button onClick={() => ctx!.addReview()} disabled={ctx?.state.isFetching}>
        Dodaj opinię
      </Button>
    </div>
  );
};

export default ReviewForm;
