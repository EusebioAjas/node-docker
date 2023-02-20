import StudentRepository from "../repositories/studentRepository.js";
import StudentService from "../services/studentService.js";

const generateInstance = ({ filePath }) => {
  const studentRepository = new StudentRepository({
    file: filePath
  })

  const studentService = new StudentService({
    studentRepository
  })

  return studentService
}

export {
  generateInstance
}

