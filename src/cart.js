let label = document.querySelector('#label')
let shoppingCart = document.querySelector('#shopping-cart')
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.querySelector('#cartAmount')
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = ShopItemsData.find((y) => y.id === id) || [];
            let { img, name, price } = search;
            return `
            <div class="cart-item">
            <img width="100" src=${img} alt="">
            <div class="details">
             <div class="title-price-x">
                <h4 class="title-price">
                    <p>${name}</p>
                    <p class="cart-item-price">$ ${price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
    
            <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
    
            <h3>$ ${item * search.price}</h3>
        </div>
        </div>
            `
        }).join('')
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="homeBtn">Back to home</button>
        </a>
        `
    }
}

generateCartItems()


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
    generateCartItems() // re-renders the cards being displayed 
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
    generateCartItems() // re-renders the cards being displayed 
    localStorage.setItem("data", JSON.stringify(basket))
}

// updating the value of the item on the count
let update = (id) => { 
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculation()
    totalAmount();
}

let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems() // re-renders the cards being displayed
    localStorage.setItem("data", JSON.stringify(basket))
    calculation();
    totalAmount();
}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x
            let search = ShopItemsData.find((y) => y.id === id) || []
            return item * search.price
        }).reduce((a, b) => a + b, 0);
        // console.log(amount);
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear cart</button>
        `
    } else return
}

let clearCart = () => {
    basket = []
    generateCartItems()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))
}

totalAmount();