import { join, dirname } from 'node:path'
import { routes } from './routes/studentRoute.js'
import { generateInstance } from './factories/studentFactory.js'

import {
  parse,
  fileURLToPath
} from 'node:url'

const currentDir = dirname(
  fileURLToPath(import.meta.url)
)

const filePath = join(currentDir, './../db', 'data.json')

const studentService = generateInstance({
  filePath
})

const studentRoutes = routes({
  studentService
})

const allRoutes = {
  ...studentRoutes,
  default: (request, response) => {
    response.writeHead(404, { 'Content-Type': 'application/json' })
    response.write('Page not found')
    response.end()
  }
}

function handler(request, response) {
  const { url, method } = request
  const { pathname } = parse(url, true)
  const key = `${pathname}:${method.toLowerCase()}`

  const chosen = allRoutes[key] || allRoutes.default

  return Promise.resolve(chosen(request, response))
    .catch(handlerError(response))
}

function handlerError(response) {
  return error => {
    console.log('Something bad has happened**', error.stack)
    response.writeHead(500, DEFAULT_HEADER)
    response.write(JSON.stringify({
      error: 'Internal server error!!'
    }))

    return response.end()
  }
}

export default handler

