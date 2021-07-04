const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
//console.log('***');
function listTodos(unaccomplishedOnly = 'false' ,searchText = '') {
    
  return new Promise((resolve, reject) => {
    if (!fs.existsSync('data-todos.json')) {
      fs.writeFileSync('data-todos.json', '');
    }

    fs.readFile('data-todos.json', 'utf8', (err, data) => {
      if (err) reject(err);
      let todos = data ? JSON.parse(data) : [];
      if (unaccomplishedOnly === 'true') {
        todos = todos.filter((t) => {
           return !t.doneTs;
          //return true;
        });
      }
      if (searchText) {
        todos = todos.filter((t) => {
          return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        });
      }
      resolve(todos);
    });
  });
}

function createTodo(mood, text) {
  return new Promise((resolve, reject) => {
    const newTodo = {
        id: uuidv4(),
        mood: mood,
        text: text,
        ts: moment().unix(),
        doneTs: null,
      };
    
    listTodos().then((newTodos) => {
      newTodos = [newTodo, ...newTodos];
      fs.writeFile('data-todos.json', JSON.stringify(newTodos), (err) => {
        if (err) reject(err);

        resolve(newTodo);
      });
    });
  });
}

function accomplishTodo(id) {
    return new Promise((resolve, reject) => {
      
      let todo = null;
      listTodos().then((newTodos) => {
          newTodos = newTodos.map((p) => {
            if (p.id === id) {
              p.doneTs = moment().unix();
              todo = p;
            }
            return p;
          });
        fs.writeFile('data-todos.json', JSON.stringify(newTodos), (err) => {
          if (err) reject(err);
  
          resolve(todo);
        });
      });
    });
  }

/*
export function accomplishTodo(id) {
  return new Promise((resolve, reject) => {
    _accomplishTodo(id);
    resolve();
  });
}

// Simulated server-side code
function _accomplishTodo(id) {
  let todos = _listTodos();
  for (let t of todos) {
    if (t.id === id) {
      t.doneTs = moment().unix();
      break;
    }
  }
  localStorage.setItem(todoKey, JSON.stringify(todos));
}

*/

module.exports = {
  listTodos,
  createTodo,
  accomplishTodo,
};