//Данные о товарах
let goods = {
    'id': [0,1, 2, 3, 4, 5],
    'name':['Мячи', "Кросовки", "Форма", "Сумки", "Защита", "Уход за обувью и одеждой"],
    'price1':[5980, 21230, 4420, 13200, 2500, 3124],
    'price2': [2990, 10615, 2210, 6600, 1250, 1562],
    'count1':[23,43, 27, 32,38,19],
    'count2':[60,70,65,80,50,50]
}
const table = document.querySelector('.wrapper'); //переменная в которой хранится объект с таблицей

//функция Renedering заполняет таблицу с данными и считает прибыль и сколько нужно заказать
function Rendering() {
    let money = 0;
    //Добавляем первую строку с заголовками в таблицу
     table.innerHTML = `

        <div class="div heading">Товар</div>
        <div class="div heading">Цена на продажу</div>
        <div class="div heading">Цена покупки</div>
        <div class="div heading">Количество на складе</div>
        <div class="div heading">Начальное количество</div>
        <div class="div heading">Сколько заказать</div>
        <div class="div heading">Чистая прибыль</div>
        <div class="div heading">Продано/закуплено</div>

`;

    for (let i = 0; i <6; i++) {
        table.innerHTML += `<div>${goods.name[i]}</div>`;
        table.innerHTML += `<div>${goods.price1[i]}</div>`;
        table.innerHTML += `<div>${goods.price2[i]}</div>`;
        table.innerHTML += `<div>${goods.count1[i]}</div>`;
        table.innerHTML += `<div>${goods.count2[i]}</div>`;
        table.innerHTML += `<div>` + (goods.count2[i] - goods.count1[i]) + `</div>`;
        table.innerHTML += `<div>` + ((goods.count2[i] - goods.count1[i]) * (goods.price1[i] - goods.price2[i])) + `</div>`;

        money += ((goods.count2[i] - goods.count1[i]) * (goods.price1[i] - goods.price2[i]));
        table.innerHTML += `
        <div class="div">
            <button class='btn sell' data-id='${i}'>Продано</button>
            <button class='btn buy' data-id='${i}'>Купить</button>
        </div>
        `;
    }
    table.innerHTML += `

        <div class="div"></div>
        <div class="div"></div>
        <div class="div"></div>
        <div class="div"></div>
        <div class="div"></div>
        <div class="div">Общий доход оставляет:</div>
        <div class="div">${money}</div>
        <div class="div"></div>`;

}
//Назначаем функции кнопок
function buttons() {
    //То что будет происходить при продаже товара
    function sell(id){
        if (goods.count1[id] > 0) {
            goods.count1[id]-=1;
            Rendering();
        }else{
            alert('Товаров на складе больше не осталось');
        }
    }
    //То что будет происходить при закупке товара
    function buy(id) {
        if(goods.count2[id]-goods.count1[id]<=0){
            alert("Вы закупили больше товара, чем нужно");
        }
        goods.count1[id]++;
        Rendering();

    }

    //Назначаем по клику значение кнопок
    table.addEventListener('click', (event) => {
        if (event.target.classList.contains('sell')) {
            sell(event.target.dataset.id)
        }
        if (event.target.classList.contains('buy')) {
            buy(event.target.dataset.id)
        }
    })
}

Rendering();
buttons();
