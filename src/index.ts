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
const mainImage = document.querySelector('.image')
const basketButton = document.querySelector('.button')
const contentBlock = document.querySelector('.content')

imageBlock.innerHTML = imgData.gallery.map(el => `<img class="image-picker-block__image" alt="" src=${el.img}>`).join('')
mainImage.setAttribute('src', imgData.gallery[0].img)

const pickerImg = () => {

  let images = document.querySelectorAll('.image-picker-block__image')

  images.forEach(image => {
    image.addEventListener('click', () => {
      mainImage.setAttribute('src', image.getAttribute('src'))
    })
  })

}

pickerImg()

selectors.forEach(selector => {
  selector.addEventListener('click', () => {
    selectors.forEach(el => el.classList.remove('selector__item-active'))
    selector.classList.add('selector__item-active')
    if (selector.id === 'gallery') {
      imageBlock.innerHTML = imgData.gallery.map(el => `<img class="image-picker-block__image" alt="" src=${el.img}>`).join('')
      pickerImg()
    } else if (selector.id === 'sample') {
      imageBlock.innerHTML = imgData.sample.map(el => `<img class="image-picker-block__image" alt="" src=${el.img}>`).join('')
    } else {
      imageBlock.innerHTML = imgData.background.map(el => `<img class="image-picker-block__image" alt="" src=${el.img}>`).join('')
    }
  })
})

basketButton.addEventListener('click', () => {

  const popUp = document.createElement('div')

  popUp.className = 'popUp'

  popUp.innerHTML = `<div class="notification">
    <span class="notification__text">Продукт успешно добвален в корзину</span>
    <button class="button">Перейти в корзину</button>
</div>`

  contentBlock.appendChild(popUp)

  popUp.querySelector('.notification').addEventListener('click', (e) => e.stopPropagation())

  popUp.addEventListener('click', () => {
    popUp.remove()
  })

  const notification = popUp.querySelector('.notification')

  const closeEl = document.createElement('div')
  closeEl.className = 'close'
  closeEl.innerHTML = 'x'
  notification.appendChild(closeEl)

  closeEl.addEventListener('click', () => {
    popUp.remove()
  })
})
