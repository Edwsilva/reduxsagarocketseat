import { delay } from 'redux-saga';
import { takeLatest, put, call, select } from 'redux-saga/effects';


function apiGet(text, length) {
  // text e length não estão sendo usados (undefined)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Fazer café' },
        { id: 2, text: 'Fazer café 2' },
        { id: 3, text: 'Fazer café 3' },
        { id: 4, text: 'Fazer café 4' },
      ]);
    }, 1000);
    // reject(new Error('Something is not right!'));
  });
}

function* asyncAddTodo(action) {
  yield put ({type: "ADD_TODO", payload: {text: action.payload.text}})
}

function* getTodoList() {
  try {
    const response = yield call(apiGet);
    console.log("response ", response)
    // yield put chama uma action passando os dados
    yield put({ type: 'SUCCESS_TODO_LIST', payload: { data: response } });
  } catch (err) {
    yield put({ type: 'FAILURE_TODO_LIST' });
  }
}

// Generators são funções que percorremos parte dela sem a 
// necessidate de percorre-la por inteiro.
// Precisa ser importada no store
export default function* root() {
  // A função para no ponto onde tem o yield
  yield [
    // Passa o conteúdo da action para a função ao lado.
    // Pegue a REQUEST_TODO_LIST e execute a getTodoList
    takeLatest('ASYNC_ADD_TODO', asyncAddTodo),
    //takeLatest('REQUEST_TODO_LIST', getTodoList),
  ];
}
