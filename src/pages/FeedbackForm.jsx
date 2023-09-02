import { useState } from "react";
import BackButton from "../components/BackButton";
import { createClient } from "@supabase/supabase-js";

const supabase_url = import.meta.env.VITE_supabase_url;
const supabase_key = import.meta.env.VITE_supabase_key;
const supabase = createClient(supabase_url, supabase_key);

export default function FeedbackForm() {
  const [formData, setFormData] = useState({ name: "", feedback: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormData({ name: "", feedback: "" });

    try {
      setIsSubmitting(true);

      // Insert the form data into your Supabase table
      const { data, error } = await supabase
        .from("feedbackData")
        .upsert([formData]);

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted successfully:", data);
        // Optionally, display a success message to the user
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="px-4 text-center flex flex-col items-center">
      <BackButton destination="/" />
      <h1 className="text-3xl font-bold">
        <span className="mb-3 block">
          Your feedback, our recipe for improvement.
        </span>
        <span className="text-yellow-500 text-2xl font-bold">
          Share Your Feedback Here...
        </span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="my-7 block font-medium">Name</div>
        <input
          className="h-12 w-40 bg-gray-100 rounded-md px-2"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div className="my-7 block font-medium">Feedback</div>
        <textarea
          className="h-40 w-80 bg-gray-100 rounded-md px-2"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="my-7 flex flex-col mx-80 text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
