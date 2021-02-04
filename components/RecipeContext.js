import React, { createContext, useState, useEffect } from 'react'

const RecipeContext = createContext()

export const RecipeProvider = ({ children }) => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')

  const [recipe, setRecipe] = useState({})

  useEffect(() => {
    console.log('recipe derpidy dooo!!')
    console.log(recipe.name)
  },[recipe])

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
