import "./styles.css"
import {imgData} from "./imgData";

const selectors = document.querySelectorAll('.selector__item')
const imageBlock = document.querySelector('.images-block')
const basketButton = document.querySelector('.button')
const contentBlock = document.querySelector('.content')
const numberOfPage = document.querySelector('.slider-nav__number-of-page')
const sliderLine = document.getElementById('slider-line')
const buttonNext = document.getElementById('next')
const buttonPrev = document.getElementById('prev')

sliderLine.innerHTML = imgData.slider.map(el => `<img class="slider__image" alt="" src=${el.img}>`).join('')
imageBlock.innerHTML = imgData.gallery.map(el => `<img class="images-block__image" alt="" src=${el.img}>`).join('')

//popUp
const popUpCreate = (content: string) => {

  const popUp = document.createElement('div')

  popUp.className = 'popUp'

  popUp.innerHTML = `<div class="notification">
        ${content}
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
}

basketButton.addEventListener('click', () => popUpCreate(
  `<span class="notification__text">Продукт успешно добвален в корзину</span>
        <button class="button">Перейти в корзину</button>`
))

//slider
let offset = 0
let number = 1

buttonNext.addEventListener('click', () => {

  offset += 318
  number += 1

  if (offset > 318 * (imgData.slider.length - 1)) {
    offset = 0
    number = 1
  }
  sliderLine.style.left = -offset + 'px'
  numberOfPage.innerHTML = `Страница ${number}`

})

buttonPrev.addEventListener('click', () => {

  offset -= 318
  number -= 1

  if (offset < 0) {
    offset = 318 * (imgData.slider.length - 1)
    number = imgData.slider.length
  }
  sliderLine.style.left = -offset + 'px'
  numberOfPage.innerHTML = `Страница ${number}`

})

//selectorGroup
selectors.forEach(selector => {
  selector.addEventListener('click', () => {

    selectors.forEach(el => el.classList.remove('selector__item_active'))

    selector.classList.add('selector__item_active')

    if (selector.id === 'gallery') {
      imageBlock.innerHTML = imgData.gallery.map(el => `<img class="images-block__image" alt="" src=${el.img}>`).join('')
      pickerImg()
    } else if (selector.id === 'sample') {
      imageBlock.innerHTML = imgData.sample.map(el => `<img class="images-block__image images-block__image_noPointer" alt="" src=${el.img}>`).join('')
    } else {
      imageBlock.innerHTML = imgData.background.map(el => `<img class="images-block__image images-block__image_noPointer" alt="" src=${el.img}>`).join('')
    }
  })
})

//addImgToSlider
const pickerImg = () => {

  let images = document.querySelectorAll('.images-block__image')

  images.forEach(image => {
    image.addEventListener('click', () => {

      const pathImg = image.getAttribute('src')
      const index = imgData.slider.findIndex(el => el.img === pathImg)

      if (index === -1) {
        imgData.slider.unshift({img: pathImg})
        sliderLine.innerHTML = imgData.slider.map(el => `<img class="slider__image" alt="" src=${el.img}>`).join('')

        offset = 0
        sliderLine.style.left = offset + 'px'

        number = 1
        numberOfPage.innerHTML = `Страница ${number}`
      } else {
        popUpCreate(`<span class="notification__text">Фото уже было добалено на главное окно</span>`)
      }

    })
  })

}

pickerImg()


