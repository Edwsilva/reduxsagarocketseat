const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

// export default function fazer(state = [], action) {
export default function fazer(state = INITIAL_STATE, action) {
// export default function todos(state = INITIAL_STATE, action) {
  console.log("action.type ", action.type)
  console.log("...state ", state)
  switch (action.type) {
    case 'ASYNC_ADD_TODO':
    // return [ ...state, { id: Math.random(), text: action.payload.text}];
    return {...state, data: [...state.data, { id: action.payload.indice, text: action.payload.text}]};

    case 'REQUEST_TODO_LIST':
      return { ...state, loading: true };
      
    case 'SUCCESS_TODO_LIST':
      return { data: action.payload.data, loading: false, error: false };

    case 'FAILURE_TODO_LIST':
      return { data: [], loading: false, error: true };

    case 'ERROR_TODO':
    return [ ...state, {  id: Math.random(), text: action.payload.text}]

    default:
      return state;
  }
}
