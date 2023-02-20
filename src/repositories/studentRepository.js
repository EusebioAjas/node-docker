import { readFile } from 'node:fs/promises'

export default class StudentRepository {
  constructor({ file }) {
    this.file = file
  }

  async #currentFileContent() {
    return JSON.parse(await readFile(this.file))
  }

  find() {
    return this.#currentFileContent()
  }

}
