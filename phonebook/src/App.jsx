import { useState, useEffect } from 'react'

import axios from 'axios'

import personService from './services/persons'
import persons from './services/persons'


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
      }
    }
    else {
      personService
      .create(newPerson)
      .then( person => {
        setPersons(persons.concat(person))
      } )
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} value={newFilter} onChange={handleInputChange(setNewFilter)}/>

      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addPerson} onChangeName={handleInputChange(setNewName)}
        onChangeNumber={handleInputChange(setNewNumber)} newName={newName}
        newNumber={newNumber}
      />


      <h2>Numbers</h2>
      <DisplayPersons persons={persons} setPersons={setPersons}/>

    </div>
  )
}

export default App