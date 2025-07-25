import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import All from "./components/All";
import Favorites from "./components/Favorites";
import CommunityRecipes from "./components/CommunityRecipes";
import RecipeDetail from "./components/RecipeDetail";
import BottomNav from "./components/BottomNav";


// Keep modal access universal for all routes
function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const location = useLocation();


  return (
    <div className="min-h-screen bg-neutral dark:bg-neutral-900 text-slate-900 dark:text-white pb-20">
      <Routes>
        <Route path="/" element={<All setSelectedRecipeId={setSelectedRecipeId} selectedRecipeId={selectedRecipeId} />} />
        <Route path="/favorites" element={<Favorites onSelectRecipe={setSelectedRecipeId} />} />
        <Route path="/community" element={<CommunityRecipes />} />
      </Routes>


      {selectedRecipeId && (
        <RecipeDetail id={selectedRecipeId} onClose={() => setSelectedRecipeId(null)} />
      )}


      {/* Persistent BottomNav */}
      <BottomNav location={location} />
    </div>
  );
}


export default App