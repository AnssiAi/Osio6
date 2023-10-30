import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(content))
        dispatch(setNotification(`you created '${content}'`, 5))
      }

    return (
            <form onSubmit={createNew}>
              <div>
                <input name="anecdote"/>
              </div>
              <button type="submit">create</button>
            </form>
    )
}

export default AnecdoteForm

