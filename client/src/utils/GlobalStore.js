import React, { createContext, useReducer, useContext } from "react"

// any variables we depend on for UI/flow we must pre-set
const initialData = {
  nav: false, 
  start: true, 
  game: false, 
  end: false, 
  activity: false, 
  countdown: false, 
  score: 0
}

/*! IMPORTANT all your reducer functionality goes here */
const dataReducer = (state, action) => {
  switch (action.type) {
    case "NAV_CLOSE":
      return { ...state, nav:false}
    case "NAV_OPEN":
      return { ...state, nav:true}
    case "START_SCREEN":
          return { ...state, start: true, game: false, activity: false, end: false, countdown: false}
      case "GAME_BOARD":
          return { ...state, start: false, game: true, activity: false, end: false, countdown: true, score: 0}
      case "GAME_START":
          return { ...state, start: false, game: true, activity: true, end: false, countdown: false}
      case "GAMEOVER":
          return { ...state, start: false, game: false, activity: false, end: true, countdown: false}
      case "SCORE":
          return { ...state, ...action.data}  
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