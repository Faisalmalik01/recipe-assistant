
import React, { useState } from "react";
import { Users, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CommunityRecipeDetail from "./CommunityRecipeDetail";

// Local storage helpers
const loadCommunity = () => JSON.parse(localStorage.getItem("communityRecipes") || "[]");
const saveCommunity = (data) => localStorage.setItem("communityRecipes", JSON.stringify(data));

export default function CommunityRecipes({ onBack }) {
  const [recipes, setRecipes] = useState(loadCommunity());
  const [showForm, setShowForm] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);
  const navigate = useNavigate();

  const handleAdd = (recipe) => {
    const updated = [recipe, ...recipes];
    setRecipes(updated);
    saveCommunity(updated);
    setShowForm(false);
  };

  const handleEdit = (updated, idx) => {
    const arr = [...recipes];
    arr[idx] = updated;
    setRecipes(arr);
    saveCommunity(arr);
    setOpenIdx(idx);
  };

  const handleDelete = (idx) => {
    const arr = recipes.filter((_, i) => i !== idx);
    setRecipes(arr);
    saveCommunity(arr);
    setOpenIdx(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1C1C1E] text-slate-800 dark:text-[#F5F5F7] transition-colors duration-300 px-3 sm:px-6 pb-24 pt-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-primary dark:text-accent hover:bg-primary-light dark:hover:bg-[#FFD60022] px-4 py-2 rounded-full mb-4 font-medium transition"
        >
          <ArrowLeft size={22} /> Back
        </button>

        {/* Header + Share */}
        <section className="bg-primary-light dark:bg-[#2C2C2E]/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 mb-8 shadow flex flex-col sm:flex-row justify-between items-center transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users size={26} className="text-primary dark:text-accent" />
              <span className="text-lg font-bold text-primary dark:text-accent">
                Community Recipes
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-[#A1A1A1]">
              Explore creative recipes from our community or share your own favorite dish.
            </p>
          </div>
          <button
            className="flex items-center gap-2 mt-4 sm:mt-0 bg-primary text-white hover:bg-primary-light dark:hover:bg-accent dark:hover:text-white font-semibold rounded-full px-6 py-3 transition shadow w-full sm:w-auto justify-center"
            onClick={() => setShowForm((v) => !v)}
          >
            <Plus size={20} /> Share Recipe
          </button>
        </section>

        {/* Upload Form */}
        {showForm && (
          <RecipeUploadForm onSubmit={handleAdd} closeForm={() => setShowForm(false)} />
        )}

        {/* Recipes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {recipes.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 dark:text-[#A1A1A1] py-20 sm:py-24">
              No community recipes yet. Be the first to share!
            </div>
          ) : (
            recipes.map((rec, i) => (
              <button
                key={i}
                onClick={() => setOpenIdx(i)}
                className="group bg-white dark:bg-[#2C2C2E]/80 rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col items-center focus:ring-2 focus:ring-primary transition backdrop-blur-md cursor-pointer"
              >
                <div className="w-full h-[180px] sm:h-[210px] overflow-hidden">
                  {rec.image ? (
                    <img src={rec.image} alt={rec.name} className="w-full h-full object-cover rounded-t-2xl" />
                  ) : (
                    <div className="w-full h-full bg-primary-light dark:bg-[#3A3A3C] flex items-center justify-center text-primary dark:text-accent">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col items-center gap-1 w-full">
                  <h3 className="font-semibold text-base sm:text-lg text-primary dark:text-accent text-center line-clamp-2">
                    {rec.name}
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-light dark:bg-[#2C2C2E] text-primary dark:text-accent text-xs font-semibold">
                    by {rec.by || "Anonymous"}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Modal */}
        {openIdx !== null && (
          <CommunityRecipeDetail
            recipe={recipes[openIdx]}
            idx={openIdx}
            onClose={() => setOpenIdx(null)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

// ----------- Upload Form Component -----------
function RecipeUploadForm({ onSubmit, closeForm }) {
  const [form, setForm] = useState({
    name: "",
    by: "",
    image: "",
    category: "",
    ingredients: "",
    instructions: "",
  });
  const [error, setError] = useState("");

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      setError("Please upload a valid image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => setForm((f) => ({ ...f, image: evt.target.result }));
    reader.readAsDataURL(file);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(form.name && form.ingredients && form.instructions)) {
      setError("Name, ingredients, and instructions are required.");
      return;
    }
    onSubmit(form);
    setForm({ name: "", by: "", image: "", category: "", ingredients: "", instructions: "" });
    closeForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary-light dark:bg-[#2C2C2E]/80 backdrop-blur-md rounded-xl px-4 py-5 sm:px-6 sm:py-6 mb-7 shadow-md max-w-lg mx-auto transition-colors text-slate-800 dark:text-[#F5F5F7]"
    >
      <div className="grid grid-cols-1 gap-4">
        {[
          { label: "Recipe Name*", key: "name" },
          { label: "Your Name (optional)", key: "by" },
          { label: "Category (optional)", key: "category" },
        ].map(({ label, key }) => (
          <input
            key={key}
            type="text"
            placeholder={label}
            value={form[key]}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            className="bg-white dark:bg-[#1C1C1E]/80 text-sm placeholder:text-gray-400 dark:placeholder:text-[#A1A1A1] rounded p-2 border border-primary-light dark:border-[#3A3A3C]"
            required={key === "name"}
          />
        ))}
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="text-sm"
        />
        {form.image && (
          <img src={form.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg mt-2 mx-auto" />
        )}
        <textarea
          placeholder="Ingredients* (comma-separated)"
          value={form.ingredients}
          onChange={(e) => setForm((f) => ({ ...f, ingredients: e.target.value }))}
          required
          rows={3}
          className="bg-white dark:bg-[#1C1C1E]/80 text-sm placeholder:text-gray-400 dark:placeholder:text-[#A1A1A1] rounded p-2 border border-primary-light dark:border-[#3A3A3C]"
        />
        <textarea
          placeholder="Instructions*"
          value={form.instructions}
          onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))} required rows={3} className="bg-white dark:bg-[#1C1C1E]/80 text-sm placeholder:text-gray-400 dark:placeholder:text-[#A1A1A1] rounded p-2 border border-primary-light dark:border-[#3A3A3C]" /> {error && <span className="text-red-600 text-sm">{error}</span>} <div className="flex flex-col sm:flex-row gap-2 justify-end pt-1"> <button
type="button"
onClick={closeForm}
className="bg-gray-100 dark:bg-[#3A3A3C] text-gray-600 dark:text-[#F5F5F7] px-4 py-2 rounded-full font-medium hover:bg-gray-200 dark:hover:bg-[#505050] transition"
> Cancel </button> <button
type="submit"
className="bg-primary text-white px-4 py-2 rounded-full font-medium shadow hover:bg-primary-dark dark:hover:bg-accent transition"
> Share Recipe </button> </div> </div> </form> ); }
