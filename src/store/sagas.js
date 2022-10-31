import { delay, takeEvery } from 'redux-saga'; // parecido com setTimeOut
import { takeLatest, put, call, select } from 'redux-saga/effects';


// apiGet está simulando uma requisição a uma API qualquer (fetch. axios.get())
function apiGet(text, length) {
  console.log("apiGet ", text)
  // text e length não estão sendo usados (undefined)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //  resolve(text + ' da RocketSeat: ' + length);
      // reject("ERROR na chamda");
    // }, 1000);
      resolve([
        { id: 1, text: 'Fazer café' },
        { id: 2, text: 'Fazer café 2' },
        { id: 3, text: 'Fazer café 3' },
        { id: 4, text: 'Fazer café 4' },
      ]);
    }, 1000);
    reject(new Error('Something is not right!'));
  });
}

function apiGetTodoList() {
  console.log("API gettodolist")
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Fazer café' },
        { id: 2, text: 'Fazer café 2' },
        { id: 3, text: 'Fazer café 3' },
        { id: 4, text: 'Fazer café 4' },
      ]);
    }, 2000);
    // reject(new Error('Something is not right!'));
  });
}

// Essa função receve uma action que vem oculta do takeLatest e dispara as actions
function* asyncAddTodo(action) {
  //yield delay(3000)
  // yield put ({type: "ADD_TODO", payload: {text: action.payload.text}})
  
  // yield call - chama ações que retornam promisses.
  // Se tiver parâmetros devemos passar assim:
  //const response = yield call(apiGet, action.payload.text)

  // Pegando o conteúdo da resposta e repassando para a action
  //yield put ({type: "ADD_TODO", payload: {text: response}})

  // Controlando o try...catch em uma ação de call 
  console.log("ACTION TYPE no addTodo ", action)
  try {
    // select busca informações do estado do REDUX
    const todos = yield select(state => state.todos)

    //yield call para chamadas assyncronas(API's)
    const response = yield call(apiGet, action.payload.text, todos.length)
    yield put ({type: "ADD_TODO", payload: {text: response}})
    
    // const response_agtl = yield call(apiGetTodoList)
    
  } catch (err) {
    // console.log("ERROR")
    const todos = yield select(state => state.todos)
    yield put({ type:"ERROR_TODO", payload: {text: "ERROR CALL" + todos.length}})
    // yield put({ type:"FAILURE_TODO_LIST"})
  }
}

function* getTodoList() {
  try {
    
    const response = yield call(apiGetTodoList);
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

    // Adiciona todas as chamadas due eu fizer, nesse caso, com clik em novo todo
    //takeEvery('ASYNC_ADD_TODO', asyncAddTodo)
    // É como se o takeLatest chamasse o 'ASYNC_ADD_TODO e passasse a action dentro.
    
    // takeLatest só pega o último click dentro do tempo estimado. Para requisições assyncronas
    //  takeLatest('ASYNC_ADD_TODO', asyncAddTodo),
   
    takeLatest('REQUEST_TODO_LIST', getTodoList),
  ];
}
