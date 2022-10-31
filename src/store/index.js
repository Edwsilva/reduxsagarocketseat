import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import todos from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    todos: todos,
  }),

  // Configurando o SAGA
  //Preciso criar um arquivo de SAGA
  applyMiddleware(sagaMiddleware),
);


sagaMiddleware.run(rootSaga);

export default store;
