import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActions from './store/actions';

function TodoList ({ todos, addTodo }) {
// function TodoList ({ todos, requestTodoList }) {
  console.log("todos ", todos)
  // console.log("requestTodoList ", requestTodoList)
  return (
    <div>
      <ul>
      { todos.map(todo => (
        // { todos.data.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        )) }
      </ul>
      <button onClick={() => addTodo('Fazer café')}>novo todo</button>
      {/* <button onClick={() => requestTodoList()}>Carregar todos</button> */}
      { todos.loading && <p>Carregando...</p> }
    </div>
  );
} 

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(TodoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
