import test from 'node:test'
import assert from 'node:assert'
import { routes } from '../../src/routes/studentRoute.js'

const callTracker = new assert.CallTracker()
process.on('exit', () => callTracker.verify())

test('student routes - endpoints test suite', async (t) => {
  await t.test('it should call /alumnos:get route', async () => {
    const databaseMock = [{
      "id": "A14006178",
      "name": "Alumno A"
    },
    {
      "id": "A15036162",
      "name": "Alumno B"
    },
    {
      "id": "A18908138",
      "name": "Alumno C"
    },
    {
      "id": "A20328567",
      "name": "Alumno D"
    },
    {
      "id": "A21098841",
      "name": "Alumno E"
    }]

    const studentServiceStub = {
      find: async () => databaseMock
    }

    const endpoints = routes({
      studentService: studentServiceStub
    })

    const endpoint = '/alumnos:get'
    const request = {}
    const response = {
      write: callTracker.calls(item => {
        const expected = JSON.stringify({
          results: databaseMock
        })
        assert.strictEqual(
          item,
          expected,
          'Write should be called with the correct payload'
        )
      }),
      end: callTracker.calls(item => {
        assert.strictEqual(
          item,
          undefined,
          'end should be called without params'
        )
      })
    }

    const route = endpoints[endpoint]
    await route(request, response)
  })
})
