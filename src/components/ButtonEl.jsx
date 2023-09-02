import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function ButtonEl({ buttonTitle, destination }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(destination)}
      className="my-5 inline-block text-3xl rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-gray-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-10 py-8"
    >
      {buttonTitle}
    </button>
  );
}

ButtonEl.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  destination: PropTypes.isRequired,
};
