import "./index.css"

export const imgData = {
  gallery: [
    {id: 1, img: 'https://clck.ru/34BVKh'},
    {id: 2, img: 'https://clck.ru/34BVMu'},
    {id: 3, img: 'https://clck.ru/34BVSQ'},
    {id: 4, img: 'https://clck.ru/34BVWB'}
  ],
  sample: [
    {id: 1, img: 'https://clck.ru/34BViX'},
    {id: 2, img: 'https://clck.ru/34BVk3'},
    {id: 3, img: 'https://clck.ru/34BVqB'},
    {id: 4, img: 'https://clck.ru/34BVto'}
  ],
  background: [
    {id: 1, img: 'https://clck.ru/34BVuX'},
    {id: 2, img: 'https://clck.ru/33kz2E'},
    {id: 3, img: 'https://clck.ru/34BVwN'},
    {id: 4, img: 'https://clck.ru/34BW2b'}
  ]
}

const selectors = document.querySelectorAll('.selector__item')
const imageBlock = document.querySelector('.image-picker-block')

imageBlock.innerHTML = imgData.gallery.map(el => `<img class="image-picker-block__image" src=${el.img}>`).join('')

selectors.forEach(selector => {
  selector.addEventListener('click', () => {
    selectors.forEach(el => el.classList.remove('selector__item-active'))
    selector.classList.add('selector__item-active')
    if (selector.id === 'gallery') {
      imageBlock.innerHTML = imgData.gallery.map(el => `<img class="image-picker-block__image" src=${el.img}>`).join('')
    } else if (selector.id === 'sample') {
      imageBlock.innerHTML = imgData.sample.map(el => `<img class="image-picker-block__image" src=${el.img}>`).join('')
    } else {
      imageBlock.innerHTML = imgData.background.map(el => `<img class="image-picker-block__image" src=${el.img}>`).join('')
    }
  })
})

