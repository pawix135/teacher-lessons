interface Props {
  review: UserReview;
}

const Review: React.FunctionComponent<Props> = ({
  review: { name, review, image, created_at },
}) => {
  return (
    <div className="flex flex-col gap-3 py-5 bg-white/30 md:mr-5 mb-5 shadow-md px-2 relative">
      <span className="font-bold">
        Imie: <span className="font-medium">{name}</span>
      </span>

      <span className="font-bold">
        Opinia: <span className="font-medium">{review}</span>
      </span>

      <span className="font-bold">
        Dodano:
        <span className="font-medium">
          {" " + new Date(created_at).toLocaleString()}
        </span>
      </span>

      <div className="cursor-pointer absolute top-2 right-5 text-red-500 hover:cursor-pointer font-bold">
        Zgłoś
      </div>
    </div>
  );
};

export default Review;
