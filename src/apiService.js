export default class PicturesAPI {
  constructor() {
    this.searchEl = ''
    this.page = 1
  }

  async fetchPictures() {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=21751722-1c715179d2c000e30188b4b67&image_type=photo&orientation=horizontal&q=${this.searchEl}&page=${this.page}&per_page=12`,
      )
      const pictures = await response.json()
      return pictures.hits
    } catch (error) {
      throw error
    }
  }

  set query(newQuery) {
    return (this.searchEl = newQuery)
  }
  resetPage() {
    this.page = 1
  }
}
