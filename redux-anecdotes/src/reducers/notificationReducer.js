import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
    }
})

export const { showNotification } = notificationSlice.actions
export const setNotification = (content, value) => {
    const time = value * 1000
    return dispatch => {
        dispatch(showNotification(content))
        setTimeout(() => {
            dispatch(showNotification(null))
        }, time)
    }
}

export default notificationSlice.reducer