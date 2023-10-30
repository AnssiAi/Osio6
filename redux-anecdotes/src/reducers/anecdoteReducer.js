import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
      addVote(state, action) {
        
        const changedAnecdote = action.payload
        const id = action.payload.id

        return state.map(a =>
          a.id !== id ? a : changedAnecdote)
      },
      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
  }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteUp = anecdote => {
  const newObject = {...anecdote, votes: (anecdote.votes) +1}
  return async dispatch => {
    const vote = await anecdoteService.voteAnecdote(anecdote.id, newObject)
    dispatch(addVote(vote))
  }
}

export default anecdoteSlice.reducer