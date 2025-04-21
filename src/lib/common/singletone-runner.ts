export class SingletonRunner<T> {
  protected runningPromise: Promise<T> | null = null

  run(callback: () => Promise<T>) {
    if (this.runningPromise) return this.runningPromise

    this.runningPromise = callback()

    return this.runningPromise.then(result => {
      this.runningPromise = null
      return result
    })
  }
}
