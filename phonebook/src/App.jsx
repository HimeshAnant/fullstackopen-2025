import { useState, useEffect } from 'react'

import axios from 'axios'

import personService from './services/persons'
import persons from './services/persons'


const Notification = ({ message, isError }) => {
  if (message === null) return null

  const messageStyle = {
    backgroundColor:'lightGrey',
    color:isError? 'red' : 'green',
    padding:10,
    fontSize:20,
    borderStyle:'solid',
    borderRadius:10,
    marginBottom:10
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const deletePerson = (person, persons, setPersons) => {
  const name = person.name
  const id = person.id

  return  () => {
    if (confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then( deletedPerson => {
        setPersons( persons.filter( p => p.id !== id ) )
      } )
      .catch ( error => {
        console.log("Person doesn't exist in database")
        setPersons( persons.filter( p => p.id !== id ) )
      } )
    }
  }

}

const DisplayPersons = ({ persons, setPersons }) => {
  return (
    <div>
      {persons.map( person => 
        <p key={person.id}>
          {`${person.name} and his number ${person.number}`}
          <button onClick={deletePerson(person, persons, setPersons)}>delete</button>
        </p>
       )}
    </div>
  )
}

const DisplayFilteredPersons = ({ prefix, persons }) => {
  if (prefix === "") return null

  return (
    <div>
      {(persons.filter( person => person.name.slice(0, prefix.length).toLowerCase() === prefix.toLowerCase() )).map( person => 
        <p key={person.id}>{person.name}</p>
       )}
    </div>
  )
}

const Filter = (props) => {
  return (
      <div>
        <input value={props.value} onChange={props.onChange} />
        <DisplayFilteredPersons prefix={props.value} persons={props.persons}/>
      </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
        <div> name: <input value={props.newName} onChange={props.onChangeName} /> </div>
        <div> number: <input value={props.newNumber} onChange={props.onChangeNumber} /> </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [newError, setNewError] = useState(null)

  useEffect( () => {
    personService
    .getAll()
    .then( allPerson => {
      setPersons(allPerson)
    } )
  }, [])

  const handleInputChange = (setFunc) => {
    return (event) => setFunc(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName.length === 0 || newNumber.length === 0) {
      alert('You need to fill both the entries first!')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const notUniqueName = persons.some( (person) => person.name.toLowerCase() === newName.toLowerCase() )

    if (notUniqueName) {
      if (confirm(`${newName} already exists. Change his number?`)) {
        const existingPerson = persons.find( person => person.name == newName )
        personService
        .update( existingPerson.id, newPerson )
        .then( modifiedPerson => {
          setPersons(persons.map( person => person.id === modifiedPerson.id ? modifiedPerson : person ))
        })
        .catch( error => {
          if (error.response.status === 404) {
            setPersons( persons.filter( (person) => person.name.toLowerCase() !== newPerson.name.toLowerCase() ) )
            setNewError(`${newName} has already been deleted`)
            setTimeout( () => setNewError(null), 5000 )
          }else {
            setNewError(error.response.data.error)
            setTimeout(() => setNewError(null), 5000)
          }
        } )
      }
    }
    else {
      personService
      .create(newPerson)
      .then( person => {
        setPersons(persons.concat(person))
        setNewMessage(`Successfuly added ${person.name}`)
        setTimeout( () => setNewMessage(null), 5000 )
      } )
      .catch(error => {
        setNewError(error.response.data.error)
        setTimeout(() => setNewError(null), 5000)
      })
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={newMessage} isError={false}/>
      <Notification message={newError} isError={true} />
      <Filter persons={persons} value={newFilter} onChange={handleInputChange(setNewFilter)}/>

      <h1>Add a new</h1>
      <PersonForm 
        onSubmit={addPerson} onChangeName={handleInputChange(setNewName)}
        onChangeNumber={handleInputChange(setNewNumber)} newName={newName}
        newNumber={newNumber}
      />


      <h1>Numbers</h1>
      <DisplayPersons persons={persons} setPersons={setPersons}/>

    </div>
  )
}

export default App