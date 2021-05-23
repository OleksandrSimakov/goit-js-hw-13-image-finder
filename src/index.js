import './styles.css'
import * as _ from 'lodash'
import PicturesAPI from './apiService.js'
import pictureTpl from './templates/pictureTemplate.hbs'

const inputEl = document.querySelector('.input')
const loadMoreBtn = document.querySelector('.load-more')
const picturesAPI = new PicturesAPI()
const galleryEl = document.querySelector('.gallery')

inputEl.addEventListener('input', _.debounce(onInput, 500))
loadMoreBtn.addEventListener('click', onLoadMore)

function onInput(e) {
  picturesAPI.resetPage()
  picturesAPI.searchEl = e.target.value

  getPictures()
  clearPictures()
}

function onLoadMore() {
  if (picturesAPI.searchEl === '') {
    return alert('enter search word')
  }
  picturesAPI.page += 1

  getPictures()
}

function getPictures() {
  picturesAPI
    .fetchPictures()
    .then(renderPictures)
    .catch((error) => console.log(error))
}

function renderPictures(pictures) {
  galleryEl.insertAdjacentHTML('beforeend', pictureTpl(pictures))

  // 1 вариант
  // window.scrollTo({
  //   top: document.documentElement.scrollHeight,
  //   behavior: 'smooth',
  // })

  // 2 вариант
  loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  })
}

function clearPictures() {
  galleryEl.innerHTML = ''
}
