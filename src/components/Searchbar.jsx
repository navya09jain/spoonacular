import PropTypes from "prop-types";

export default function Searchbar({ value, onChange }) {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="Search here"
        className="w-100 my-8 mx-10 rounded-full bg-yellow-100 px-10 py-5 text-2xl transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 "
        value={value}
        onChange={onChange}
      />
    </form>
  );
}
Searchbar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
