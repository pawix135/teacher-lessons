import { FiRefreshCcw } from "react-icons/fi";

const Spinner = () => {
  return (
    <div className="bottom-0 left-1/2 -translate-x-1/2">
      <FiRefreshCcw
        size={50}
        color="black"
        className="transition dura rotate-[360deg]"
      />
    </div>
  );
};

export default Spinner;
