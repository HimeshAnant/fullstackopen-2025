const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('----')
  next()
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const tokenExtractor = (request) => {
  request.token = getTokenFrom(request)
}

const userExtractor = (request, response, next) => {
  tokenExtractor(request)

  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    request.user = decodedToken.id
  }

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'ValidationError') {
    return response.status(400).end()
  } else if (error.name === 'MongoServerError' && error.message.includes('duplicate key error')) {
    return response.status(400).json({ error: 'username already taken' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid or missing token' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
}