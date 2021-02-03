import React, { createContext, useState } from 'react'

const RecipeContext = createContext()

export const RecipeProvider = ({ children }) => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')

  const [recipe, setRecipe] = useState({})

  return (
    <RecipeContext.Provider
      value={{
        recipe,
        setRecipe
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext as default }
