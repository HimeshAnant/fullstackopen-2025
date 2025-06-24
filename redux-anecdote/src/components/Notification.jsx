import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    color: 'green',

    fontSize: 20,

    marginBottom: 10,
    marginTop: 10,

    padding: 10,

    borderStyle: 'solid',
    borderWidth: 1,
  }

  if (notification === null) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification