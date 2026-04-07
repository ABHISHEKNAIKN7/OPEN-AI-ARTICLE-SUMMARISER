import { configureStore } from '@reduxjs/toolkit'
import articleSlice from './features/articleSlice.js'

export default configureStore({
  reducer: {
    article: articleSlice,
  },
})
