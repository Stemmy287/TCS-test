import "./index.css"

export const imgData = {
  slider: [
    {img: 'img/5-dvuhetajnii-krasivii-dom.jpg'},
    {img: 'img/adigeya_118.jpg'},
    {img: 'img/images.jpg'},
    {img: 'img/landscape-of-morning-fog-and-mountains-with-hot-air-balloons-at-sunrise_335224-794.avif'}
  ],
  gallery: [
    {img: 'img/phonepicutres-TA.webp'},
    {img: 'img/jason-blackeye-364785-2.jpg'},
    {img: 'img/best-fall-pictures-russia-1657041577.png'},
    {img: 'img/hiker-mountains-picture-moon.jpg'}
  ],
  sample: [
    {img: 'img/image_optimzation.jpg'},
    {img: 'img/istockphoto-117211856-612x612.jpg'},
    {img: 'img/photo-1529665253569-6d01c0eaf7b6.jpg'},
    {img: 'img/28649660_web1_220331-WLT-PUSH-JesajaClass_1.jpg'}
  ],
  background: [
    {img: 'img/kirpich-kirpichnaia-stena-fon-fotofon-tekstura.jpg'},
    {img: 'img/1613710553_61-p-minimalistichnii-fon-dlya-prezentatsii-83.jpg'},
    {img: 'img/vivid-blurred-colorful-background_58702-2655.avif'},
    {img: 'img/white-brick-wall-textures-background_1203-3691.avif'}
  ]
}

//selectorsElements
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

//selectorBlock
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
//popUp
basketButton.addEventListener('click', () => popUpCreate(
  `<span class="notification__text">Продукт успешно добвален в корзину</span>
        <button class="button">Перейти в корзину</button>`
))
