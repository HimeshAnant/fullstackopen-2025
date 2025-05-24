import { useState } from 'react'


const DisplayPersons = ({ persons }) => {
  return (
    <div>
      {persons.map( person => 
        <p key={person.id}>{`${person.name} and his number ${person.number}`}</p>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleInputChange = (setFunc) => {
    return (event) => setFunc(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName.length === 0 || newNumber.length === 0) {
      alert('You need to fill both the entries first!')
      return
    }

    const person = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    const notUniqueName = persons.some( (person) => person.name.toLowerCase() === newName.toLowerCase() )
    const notUniqueNumber = persons.some( (person) => person.number === newNumber )

    if (notUniqueName) alert(`Name: ${newName} is already added to phonebook.`)
    else if (notUniqueNumber) alert(`Number: ${newNumber} is already added to phonebook`)
    else setPersons(persons.concat(person))

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
      <DisplayPersons persons={persons} />

    </div>
  )
}

export default App