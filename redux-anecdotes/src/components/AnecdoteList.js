import { useSelector, useDispatch } from 'react-redux'
import {voteUp} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
      if (filter === ''){
        return anecdotes
      }
      return anecdotes.filter(a => a.content.includes(filter))
    })
    const dispatch = useDispatch()
  
    const handleVote = (anecdote) => {
      dispatch(voteUp(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    const anecdotesForSort = [...anecdotes]

    //Sort ensin sitten map
    return (
        <div>
          {anecdotesForSort.sort((a,b) => (a.votes < b.votes) ? 1 : -1)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList