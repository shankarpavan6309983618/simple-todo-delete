import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening', isCompleted: false},
  {id: 2, title: 'Rent the movie for tomorrow movie night', isCompleted: false},
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isCompleted: false,
  },
  {id: 4, title: 'Drop the parcel at Bloomingdale', isCompleted: false},
  {id: 5, title: 'Order fruits on Big Basket', isCompleted: false},
  {id: 6, title: 'Fix the production issue', isCompleted: false},
  {id: 7, title: 'Confirm my slot for Saturday Night', isCompleted: false},
  {id: 8, title: 'Get essentials for Sunday car wash', isCompleted: false},
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    inputText: '',
  }

  onChangeInput = event => {
    this.setState({inputText: event.target.value})
  }

  addTodo = () => {
    const {inputText, todosList} = this.state
    if (inputText.trim() === '') return

    const parts = inputText.trim().split(' ')
    const lastPart = parts[parts.length - 1]
    const count = Number(lastPart)

    let title = inputText
    let repeat = 1

    if (!Number.isNaN(count)) {
      title = parts.slice(0, parts.length - 1).join(' ')
      repeat = count
    }

    let nextId = todosList.length + 1
    const newTodos = []

    for (let i = 0; i < repeat; i += 1) {
      newTodos.push({
        id: nextId,
        title,
        isCompleted: false,
      })
      nextId += 1
    }

    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      inputText: '',
    }))
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    }))
  }

  updateTitle = (id, newTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: newTitle} : todo,
      ),
    }))
  }

  render() {
    const {todosList, inputText} = this.state

    return (
      <div className="bg-container">
        <div className="todos-container">
          <h1 className="heading">Simple Todos</h1>

          <div className="add-todo-container">
            <input
              type="text"
              value={inputText}
              onChange={this.onChangeInput}
              placeholder="Enter todo"
            />
            <button type="button" onClick={this.addTodo}>
              Add
            </button>
          </div>

          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                toggleComplete={this.toggleComplete}
                updateTitle={this.updateTitle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
