import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function BackButton({ destination }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(destination)}
      className="my-5 text-right mx-12 text-md rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-gray-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed py-3 px-3"
    >
      Go to Home
    </button>
  );
}

BackButton.propTypes = {
  destination: PropTypes.isRequired,
};
