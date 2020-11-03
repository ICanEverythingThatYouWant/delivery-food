




import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

///slider 

 const swiper = new Swiper('.swiper-container', {
  loop:true,
  autoplay:true,
  pagination:{
    el:".swiper-pagination",
    clicable: true
  }
})

//day 1
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth')
const modalAuth = document.querySelector('.modal-auth')
const closeAuth = document.querySelector('.close-auth')
const loginForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login')
const userName = document.querySelector('.user-name')
const buttonOut = document.querySelector('.button-out')
const cardsRestaurants = document.querySelector('.cards-restaurants')
const containerPromo = document.querySelector('.swiper-container')
const restaurants = document.querySelector('.restaurants')
const menu = document.querySelector('.menu')
const logo = document.querySelector('.logo')
const cardMenu = document.querySelector('.cards-menu')
const inputSearch = document.querySelector('.input-search')


const restaurantTitle = document.querySelector(".restaurant-title")
const restaurantRaiting = document.querySelector(".rating")
const restaurantPrice = document.querySelector(".price")
const restaurantCategory= document.querySelector(".category")
const modalBody = document.querySelector('.modal-body')
const modalPrice = document.querySelector('.modal-pricetag')
const buttonClearCart = document.querySelector('.clear-cart')


let login  = localStorage.getItem('gloDeliveri');


//наша корзина создаем для нееZZZZ
const cart = JSON.parse(localStorage.getItem(`gloDelivery_${login}`)) || [];

function sevCart(){
  localStorage.setItem(`gloDelivery_${login}`,JSON.stringify(cart))
}
// эта функция говорит если в локале есть данные то мы их сохраняем под определенным именем
// а если нету данных ничего не сохраняем, это для того чтоб если я ввел свой логин и вышел
// мои данные сохранились
function downloadCart(){
  if(localStorage.getItem(`gloDelivery_${login}`)){
    const data = JSON.parse(localStorage.getItem(`gloDelivery_${login}`));
    cart.push(...data)
    
  }
}

//ПОЛУЧЕМ КАРТОЧКИ ИЗЗ JSON
const getData = async function(url){
  const response = await fetch(url)
  if(!response.ok){
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`)
  }

  return await response.json()

}



function toggleModal() {
  modal.classList.toggle("is-open");
}

 function toogleModalAuth(){
   modalAuth.classList.toggle('is-open')
   loginInput.style.borderColor = "";
   if(modalAuth.classList.contains("is-open")){
    disableScroll()
   }else{
    enableScroll()
   }
 }
  


 
 // Тут я рассказваю про обработчик событий =========
 // раньше использовали buttonAuth.onclick = function(){}
 // но бывают случаи что какую-то функцию нужно убрать
 // поэтому onclick не лучший вариант.
 // вместо него мы используем addEventListener этот метод позволяет
 // навещивать сколько угодно событий на один и тот же элимент
 //  buttonAuth.addEventListener('click', toogleModalAuth)
//  closeAuth.addEventListener('click', toogleModalAuth)
 // =============================================



  function returnMain(){
    containerPromo.classList.remove('hide');
    swiper.init();
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  }
 // функция autorizovan 
 function autorized() {

  // внутри авторизования мы создали функцию которая при нажатии на кнопку выйти 
  // которую мы откр`ыли при авторизации, закроет вновь кнопку выйти удалит имя и добавит кнопку войти
  function logOut(){
    // тут мы очищаем текст который добавили при регистрации а то есть логин
    login = ""
    cart.length = 0;
    buttonAuth.style.display = ""
    userName.style.display = ""
    buttonOut.style.display = ""
    localStorage.removeItem("gloDelivery")
    buttonOut.style.display = ""

    //тут тоже самое
    buttonOut.removeEventListener('click', logOut)
    // это нам нужно для проверки авторизованы мы или нет
    checkAuth()
    returnMain()
  }

 // тут мы записываем то имя которое вводим через ungen
  userName.textContent = login;
   console.log('авторизован')
   // тут мы говорим если мы авторизовались то мы удаляем кнопку входа и добавляем текст и кнопку выхода
   buttonAuth.style.display = "none"
   userName.style.display = "inline"
   buttonOut.style.display = "flex"
   cartButton.style.display = "flex"
   buttonOut.addEventListener('click', logOut)
 }

 // функция не авторизован
 function notAuthorized(){
  
  console.log('не авторизован')
  cartButton.style.display = ""
  function logIn (e){
    
    e.preventDefault();
    if(loginInput.value.trim()){
      
      login = loginInput.value;
      localStorage.setItem('gloDeliveri',login)
      // тут мы добавляем toogleModalAuth() чтоб при клике окно закрылось таким образом функция вызывается
      toogleModalAuth();
      downloadCart();
      // тут мы удаляем наши дейисвия когда не авторизованы
      buttonAuth.removeEventListener('click', toogleModalAuth)
      closeAuth.removeEventListener('click', toogleModalAuth)
      loginForm.removeEventListener('submit', logIn)
       
      //удалчем то что написали в инпуте при закрыти окна
      loginForm.reset()
  
      // мы передаем сюда checkAuth() для проверки авторизации
      checkAuth();
    }else{
     loginInput.style.borderColor = "red"
     
    }
    
  }

  buttonAuth.addEventListener('click', toogleModalAuth)
  closeAuth.addEventListener('click', toogleModalAuth)
  loginForm.addEventListener('submit', logIn)
  modalAuth.addEventListener('click', e =>{
    if(e.target.classList.contains("is-open")){
      toogleModalAuth()
    }
  })

  //тут мы перенесли фунекции где мы нажимаем на вход когда не зарегестрированы

 }
function checkAuth(){
  if(login){
    autorized()
  }else{
    notAuthorized()
  }
}
// нужно вызвать единожды чтоб понять авторизировались мы или нет



 

/// ГЕНЕРАЦИЯ КАРТОЧЕК ресторанов

function cardsCardsRestaurants(resotant){
  //аргумент ресторан передает нам данные где мы их получили 
  //getData("./db/partners.json").then(data =>{
  //data.forEach(cardsCardsRestaurants) таким образом
//})
//тут мы пишем деструктаризацию для того чтоб удобнее было брать данные из 
//resotant, чтоб не писать resotant.name и тд
const {
  image,
  kitchen,
  name,
  price,
  stars,
  products,
  time_of_delivery: timeOfDelivery 
  } = resotant;


  const cardRestaurant = document.createElement('a')
  cardRestaurant.className = "card card-restaurant";
  cardRestaurant.products = products;
  cardRestaurant.info = { kitchen, name, price, stars };
   const card = `
          <img src="${image}" alt="${name}" class="card-image"/>
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title">${name}</h3>
              <span class="card-tag tag">${timeOfDelivery}</span>
            </div>
            <div class="card-info">
              <div class="rating">
              ${stars}
            </div>
            <div class="price">От ${price} ₽</div>
            <div class="category">${kitchen}</div>
          </div>
        </div>
   `;

   cardRestaurant.insertAdjacentHTML('afterbegin', card)
   cardsRestaurants.insertAdjacentElement('afterbegin', cardRestaurant)
}





//рендер карточек товара мы прописываем ее выше openGoods
//желательно писать так, сначала функция объявлена написана а потом внизу она будет
//использоваться


function creatCardGood(menuCards){
//тут мы с помощью деструкторизации получаем данные карточки меню нажав на
// рестораны
const {
  description, id, image, name, price
} = menuCards

  const card = document.createElement('section')
  card.className = 'card'
  card.insertAdjacentHTML("beforeend",`
  <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${name}</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">${description}
          </div>
        </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart" id="${id}">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price card-price-bold">${price}₽</strong>
      </div>
  </div>  
  `);
  cardMenu.insertAdjacentElement('beforeend', card)

}




// рендер карточек ресторана чтоб переходить к опредленному ресторану то есть к товару
function openGoods(e){
  //если мы не зарегались то нам откроется модалка для регистрации а если зарегались то все норм
    const target = e.target;
    //эта фунекуия делает следующее. При клике на ресторан он удаляет рестораны и добавляет карточки
    //это делается для того чтоб сайт не перезагружался. 
    // контейнер с промо убираем где пицца на весь экран
    //рестораны убираем 
    //и добавляем товары
    if(login){
      const restaurant = target.closest('.card-restaurant')
      if(restaurant){
        cardMenu.textContent = "";
        swiper.destroy(false)
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');
        
        const { kitchen, name, price, stars } = restaurant.info;
     
      restaurantTitle.textContent = name;
      restaurantRaiting.textContent = stars;
      restaurantPrice.textContent = price;
      restaurantCategory.textContent = kitchen;

        //тут мы переходим на те товары на какой ресторан мы кликнули
        //зашли в суши ресторан получили суши 
        getData(`./db/${restaurant.products}`).then(data =>{
          data.forEach(creatCardGood)
        })
      }
    }else{
      toogleModalAuth()
    }
}

//открываем корзину нажав на кноку корзина
function addToCard(e){
  const target = e.target;

  const buttonAddCart = target.closest('.button-add-cart')
  if(buttonAddCart){
    //тут мы при нажатии на корзину получаем данные карточку название продукта
    //ценц и айди для того чтоб товар не потворялся в корзине
     const card = target.closest('.card')
     const title = card.querySelector('.card-title-reg').textContent
     const cost = card.querySelector('.card-price').textContent
     const id = buttonAddCart.id;
     // эта функция проверяет есть ли корзине одинаковый товар 
     const food = cart.find(function(item){
        return item.id === id;
     })

     //тут говорится если у нас два одинаковых товара то  food.count добавляем к 1 и сохарняем снова в food.count.
     //если там будет одна пицца он положит туда вторую
     //если такой еды(food) нету у нас то мы добавим ее с нуля
     //то есть если мы заказали 2 пиццы они будут дити как один массив но внутри этого массива будет два товара
     if(food){
       food.count += 1;
     }else{
        //тут мы добавляем полученные наши данные при нажатии на кнопку(корзина)
     // в массив который мне создали свеху.
     //данные передаем в виде объекта
      cart.push({
        id,
        title,
        cost,
        count:1
       })
     }
     sevCart() 
  }
}



//эта функция делает рендер карт внутри корзины чтоб оформить заказ 
function renderCart(){
   modalBody.textContent = ""
   cart.forEach(function({ id, title, cost, count}){
     const itemCart = `
          <div class="food-row">
            <span class="food-name">${title}</span>
                <strong class="food-price">${cost}</strong>
                <div class="food-counter">
                  <button class="counter-button counter-minus" data-id=${id}>-</button>
                  <span class="counter">${count}</span>
              <button class="counter-button counter-plus" data-id=${id}>+</button>
            </div>
        </div>
     `;
     modalBody.insertAdjacentHTML('afterbegin', itemCart)
   })
  //тут мы считаем всю сумму товаров которые находятся в корзине 
   const totalPrice = cart.reduce(function(acc,i){
       return acc + (parseFloat(i.cost) * i.count)
   },0)
   
   modalPrice.textContent = totalPrice + 'p';

}

//тут мы удалчем ненужный товар из коризны

function changeCount(e){
  const target = e.target;

  if(target.classList.contains('counter-button')){
    const food = cart.find(function(item){
      return item.id === target.dataset.id;
    });
    if(target.classList.contains('counter-minus')){
      food.count--
      if(!food.count){
        cart.splice(cart.indexOf(food),1)
      }
    };
    if(target.classList.contains('counter-plus')) food.count++;
    renderCart()
  }
}


//мы записали все вызовы в одну функцию для удобства
function init(){
//тут мы получаем данные из json файла для дальнейшего использования
getData("./db/partners.json").then(data =>{
  data.forEach(cardsCardsRestaurants)
})

cardMenu.addEventListener('click',addToCard)

cartButton.addEventListener("click", function(){
  renderCart()
  toggleModal()
});

modalBody.addEventListener('click', changeCount)

close.addEventListener("click", toggleModal);

buttonClearCart.addEventListener('click', function(){
  cart.length = 0;
  renderCart();
  toggleModal();
})


cardsRestaurants.addEventListener('click', openGoods);
//тут мы пишеи фунекцию которая будет удалять товары и возвращать
// контейнер с промо добавляем где пицца на весь экран
//рестораны добавляем
//и удаляем товары
logo.addEventListener('click', function(){
      containerPromo.classList.remove('hide')
      restaurants.classList.remove('hide')
      menu.classList.add('hide')
      swiper.init()
})

checkAuth()


//тут мы пишем поск в инпуте товара
inputSearch.addEventListener('keypress', e =>{


  if(e.charCode == 13){
 
   const value = e.target.value.trim();
   if(!value){
    e.target.style.backgroundColor = 'red'
    setTimeout(function(){
      e.target.style.backgroundColor = ''
    },1500)
    e.target.value = ""
    return
   }
   getData('./db/partners.json')
     .then(data =>{
     return data.map(partner =>{
       return partner.products;
     })
    })
    .then(linksProduct =>{
      cardMenu.textContent = "";
      linksProduct.forEach(link =>{
        getData(`./db/${link}`)
        .then(data =>{

         const resultSearch = data.filter(item =>{
           const name = item.name.toLowerCase()
           return name.includes(value.toLowerCase())
         })

          containerPromo.classList.add('hide')
          swiper.destroy();
          restaurants.classList.add('hide')
          menu.classList.remove('hide')
  
          restaurantTitle.textContent = "Результат поиска";
          restaurantRaiting.textContent =  "";
          restaurantPrice.textContent = "";
          restaurantCategory.textContent = "";
          resultSearch.forEach(creatCardGood)
        })
      })
    })
   }
 })
}
init()











