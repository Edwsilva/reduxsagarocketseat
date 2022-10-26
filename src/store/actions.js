export function addTodo(text) {
 // console.log("TEXT na actions.js ", text)
  return {
    // type: 'REQUEST_TODO_LIST',
    // As açoes precisam ser ouvidas no SAGA
    type: 'ASYNC_ADD_TODO',
    payload: {
      text,
    }
  }
}

// export function requestTodoList() {
//   // As ações precisam ser ouvidas no SAGA
//    return {
//      type: 'REQUEST_TODO_LIST',
//    }
//  }
 