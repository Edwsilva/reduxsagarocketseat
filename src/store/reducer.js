const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

export default function todos(state = [], action) {
// export default function todos(state = INITIAL_STATE, action) {
  console.log("action.type ", action.type)
  switch (action.type) {
    case 'ADD_TODO':
    return [ ...state, { id: Math.random(), text: action.payload.text}];
   
    // case 'REQUEST_TODO_LIST':
    //   return { ...state, loading: true };
    // case 'SUCCESS_TODO_LIST':
    //   return { data: action.payload.data, loading: false, error: false };
    // case 'FAILURE_TODO_LIST':
    //   return { data: [], loading: false, error: true };
    default:
      return state;
  }
}
