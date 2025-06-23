import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import anecdotesReducer from './reducers/anecdotesReducer'

const store = createStore(anecdotesReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </ Provider>
)