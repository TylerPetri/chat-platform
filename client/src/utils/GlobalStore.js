import React, { createContext, useReducer, useContext } from "react"

// any variables we depend on for UI/flow we must pre-set
const initialData = {
  nav: false
}

/*! IMPORTANT all your reducer functionality goes here */
const dataReducer = (state, action) => {
  switch (action.type) {
    case "NAV_CLOSE":
      return { ...state, nav:false}
    case "NAV_OPEN":
      return { ...state, nav:true}
    default:
      console.log(`Invalid action type: ${action.type}`)
      return state
  }
}



const StoreContext = createContext()

const useStoreContext = function(){
  return useContext(StoreContext)
}

const StoreProvider = function(props){
  const [state, dispatch] = useReducer( dataReducer, initialData )
  return <StoreContext.Provider value={[state, dispatch]} {...props} />
}

export { StoreProvider, useStoreContext }