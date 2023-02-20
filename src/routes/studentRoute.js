const routes = ({ studentService }) => ({
  '/alumnos:get': async (_request, response) => {
    const students = await studentService.find()
    response.write(JSON.stringify({ results: students }))
    response.end()
  }
})

export {
  routes
}

