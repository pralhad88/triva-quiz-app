// this is the redux reducer to return dispatched state.
export default (state = {
    name: "",
    score: 0
  }, action) => {
    switch (action.type) {
      case 'SET_NAME': 
        return Object.assign({}, state, {
          name: action.name
        });
      case 'UPDATE_SCORE': 
        return Object.assign({}, state, {
          score: action.score
        });
      default: return state
    }
  };