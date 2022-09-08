let shop = document.querySelector('#shop')




// basket to store items added to cart
// stored in the localStorage and retrieved from it too
// below staatement means = if the objects exist in the localStorage then retrieve it , if not return an empty array
let basket = JSON.parse(localStorage.getItem("data")) || []


// generating the shop items htmls elements with js
let generateShop = () => { 
    return (shop.innerHTML = ShopItemsData.map((x) => {
        let { id, name, price, desc, img } = x
        let search = basket.find((x) => x.id === id) || []

        return  `
        <div id=poduct-id-${id} class="item">
         <img width="220" src=${img} alt="">
         <div class="details">
            <h3>${name}</h3>
            <p>${desc}.</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>
    
        `
    }).join(""))
}

generateShop()

// incrementing the value of items 
let increment = (id) => { 
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)
    
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        });
    } else {
        search.item++;
    }

    // console.log(basket);
    
    update(selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))
}

// decrementing the value of items 
let decrement = (id) => { 
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)
    
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item--;
    }

    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0) // remove objects with 0 item count 
    localStorage.setItem("data", JSON.stringify(basket))
}

// updating the value of the item on the count
let update = (id) => { 
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculation()
}

// adding total items and displaying the result in the cart 
let calculation = () => {
    let cartIcon = document.querySelector('#cartAmount')
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation();