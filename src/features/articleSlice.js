import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  url: '',
  summary: '',
  loading: false,
  error: '',
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload
    },
    setSummary: (state, action) => {
      state.summary = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setUrl, setSummary, setLoading, setError } = articleSlice.actions
export default articleSlice.reducer
