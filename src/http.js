'use strict'

const querystringify = require('querystringify')

const { getMethods } = require('./utils')
const { HTTP } = require('./constants')
const json = require('./json')

const [
  get,
  post,
  put,
  del,
  options,
  patch,
  head,
  connect,
  trace,
  any,
  ws
] = Object.values(HTTP).map(getMethods)

const setHandler = (
  app,
  { pattern, method, handler, options, handlers, middlewares }
) => {
  if (method === HTTP.WEB_SOCKET) {
    app[method](pattern, {
      ...options,
      ...handlers
    })
  }

  app[method](pattern, (res, req) => {
    req.query = querystringify.parse(req.getQuery())
    return json(res, req, handler)
  })
}

module.exports = {
  HTTP,
  setHandler,
  get,
  post,
  put,
  del,
  options,
  patch,
  head,
  connect,
  trace,
  any,
  ws
}
