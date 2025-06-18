const Notification = ({ message, color }) => {
  const style = {
    color: color,
    background: 'lightGrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <p style={style}>{message}</p>
  )
}

export default Notification