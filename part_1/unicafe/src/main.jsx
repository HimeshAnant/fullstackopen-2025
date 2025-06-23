import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducer/counterReducer'

const store = createStore(counterReducer)

const App = () => {
  const stats = store.getState()

  const handleClick = (type) => {
    return () => store.dispatch({ type })
  }

  return (
    <div>
      <div>
        <button onClick={ handleClick('GOOD') }>good</button>
        <button onClick={ handleClick('OK') }>ok</button>
        <button onClick={ handleClick('BAD') }>bad</button>
        <button onClick={ handleClick('RESET') }>reset stats</button>
      </div>
      <div>
        <p>good {stats.good}</p>
        <p>ok {stats.ok}</p>
        <p>bad {stats.bad}</p>
      </div>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'))

const render = () => {
  root.render(
    <App />
  )
}

render()
store.subscribe(render)