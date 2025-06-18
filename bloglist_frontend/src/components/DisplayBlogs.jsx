import Blog from './Blog'

const DisplayBlogs = ({ user, blogs, setBlogs }) => {
  const blogStyle = {
    margin: 2,
    marginBottom: 10,

    font: 16,

    border: 'Solid',
    borderWidth: 1,

    paddingTop: 10,
    paddingLeft: 2,

    backgroundColor: '#f5f5f5',
  }

  return (
    <div>
      {blogs.filter(blog => blog.id).map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Blog user={user} blog={blog} blogs={blogs} setBlogs={setBlogs} />
        </div>
      )}
    </div>
  )
}

export default DisplayBlogs