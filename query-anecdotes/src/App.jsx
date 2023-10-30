import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './components/NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const voteUpMutation = useMutation({
    mutationFn: updateAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    },
  })

  const handleVote = (anecdote) => {
    voteUpMutation.mutate({...anecdote, votes: (anecdote.votes) + 1})
    dispatch({ type: "SHOW", payload: `You voted '${anecdote.content}`})
    setTimeout(()=>{
      dispatch({ type: "CLEAR" })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  //Tämä tarvitaan muuten tulee virheitä
  if (result.isPending){
    return <span>Loading data</span>
  }
  if (result.isError){
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data
  const anecdotesForSort = [...anecdotes]

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification/>
      <AnecdoteForm />
    
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

export default App
