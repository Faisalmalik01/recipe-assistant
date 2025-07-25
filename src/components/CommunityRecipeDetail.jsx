import React, { useState } from "react";
import { X, Pencil, Trash } from "lucide-react";

export default function CommunityRecipeDetail({ recipe, idx, onClose, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(recipe);
  const [error, setError] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (!(form.name && form.ingredients && form.instructions)) {
      setError("Name, ingredients, and instructions are required.");
      return;
    }
    onEdit(form, idx);
    setEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="relative max-w-2xl w-full bg-white dark:bg-[#2C2C2E] text-slate-800 dark:text-[#F5F5F7] rounded-3xl shadow-2xl overflow-auto max-h-[95vh] transition-colors duration-300">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 bg-primary text-white rounded-full w-9 h-9 flex items-center justify-center shadow hover:bg-primary-light hover:text-primary dark:hover:bg-accent dark:hover:text-white transition"
        >
          <X size={24} />
        </button>

        {editing ? (
          <form onSubmit={handleSave} className="px-6 py-6 space-y-4">
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Recipe name"
              className="bg-primary-light dark:bg-[#1C1C1E]/80 rounded p-2 w-full text-lg font-semibold mb-1 border border-primary-light dark:border-[#3A3A3C]"
              required
            />
            <input
              value={form.by}
              onChange={(e) => setForm((f) => ({ ...f, by: e.target.value }))}
              placeholder="Your name"
              className="bg-gray-50 dark:bg-[#2C2C2E] rounded p-2 w-full mb-1 border border-gray-200 dark:border-[#3A3A3C]"
            />
            <input
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              placeholder="Category"
              className="bg-gray-50 dark:bg-[#2C2C2E] rounded p-2 w-full mb-1 border border-gray-200 dark:border-[#3A3A3C]"
            />
            <textarea
              value={form.ingredients}
              onChange={(e) => setForm((f) => ({ ...f, ingredients: e.target.value }))}
              placeholder="Ingredients (comma separated)"
              className="bg-gray-50 dark:bg-[#2C2C2E] rounded p-2 w-full mb-2 border border-gray-200 dark:border-[#3A3A3C]"
              rows={2}
              required
            />
            <textarea
              value={form.instructions}
              onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
              placeholder="Instructions"
              className="bg-gray-50 dark:bg-[#2C2C2E] rounded p-2 w-full mb-2 border border-gray-200 dark:border-[#3A3A3C]"
              rows={3}
              required
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-100 dark:bg-[#3A3A3C] text-gray-600 dark:text-[#F5F5F7] px-4 py-2 rounded-full font-medium hover:bg-gray-200 dark:hover:bg-[#505050] transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-full font-medium shadow hover:bg-primary-dark dark:hover:bg-accent transition"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <>
            {recipe.image && (
              <img src={recipe.image} alt={recipe.name} className="w-full h-56 object-cover rounded-t-3xl" />
            )}
            <div className="px-6 py-6 space-y-5">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold mb-1 text-primary dark:text-accent">{recipe.name}</h2>
                  <div className="text-xs text-gray-400 dark:text-[#A1A1A1] mb-2">
                    {recipe.category || "—"} • by {recipe.by || "Anonymous"}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-primary-light dark:bg-[#FFD60022] text-primary dark:text-accent hover:bg-primary dark:hover:bg-accent hover:text-white rounded-full px-3 py-2 font-semibold text-xs flex items-center transition"
                  >
                    <Pencil size={16} className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(idx)}
                    className="bg-red-50 dark:bg-[#3A3A3C] text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white rounded-full px-3 py-2 font-semibold text-xs flex items-center transition"
                  >
                    <Trash size={16} className="mr-1" /> Remove
                  </button>
                </div>
              </div>

              <div>
                <div className="font-semibold mb-1">Ingredients:</div>
                <ul className="list-disc ml-6 mb-1 text-sm">
                  {recipe.ingredients
                    .split(",")
                    .filter(Boolean)
                    .map((ing, j) => (
                      <li key={j}>{ing.trim()}</li>
                    ))}
                </ul>
              </div>

              <div>
                <div className="font-semibold mb-1">Instructions:</div>
                <div className="text-sm whitespace-pre-line">{recipe.instructions}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}