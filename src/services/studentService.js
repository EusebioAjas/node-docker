export default class StudentService {
  constructor({ studentRepository }) {
    this.studentRepository = studentRepository
  }

  find() {
    return this.studentRepository.find()
  }

}

