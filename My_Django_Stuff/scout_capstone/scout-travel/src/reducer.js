function reducer(state = 0, action) {
  switch (action.type) {
    case 'increment':
      return state + action.payload
    case 'decrement':
      return state - action.payload
    case 'multiply':
      return state * action.payload
    default:
      return state
  }
}

export default reducer
