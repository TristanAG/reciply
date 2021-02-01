import React, { createContext, useState } from 'react'

const RecipeContext = createContext()

export const RecipeProvider = ({ children }) => {
  const [name, setName] = useState("William");
  // const [location, setLocation] = useState("Mars");

  return (
    <RecipeContext.Provider
      value={{
        name,
        setName
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

function doSomething(word) {

}

export { RecipeContext as default, doSomething }
