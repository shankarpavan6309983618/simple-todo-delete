import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo, toggleComplete, updateTitle} = props
  const {id, title, isCompleted} = todoDetails

  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  const onSave = () => {
    updateTitle(id, editedTitle)
    setIsEditing(false)
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => toggleComplete(id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
        />
      ) : (
        <p className={`todo-title ${isCompleted ? 'completed' : ''}`}>
          {title}
        </p>
      )}

      {isEditing ? (
        <button type="button" onClick={onSave}>
          Save
        </button>
      ) : (
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}

      <button type="button" onClick={() => deleteTodo(id)}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
