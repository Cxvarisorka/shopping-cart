const shopDiv = document.querySelector('.bottom-shop');

// Class for products objects
class Product{
    constructor(divId,productName,productPrice,imgSrc){
        this.divId = divId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.imgSrc = imgSrc;
    }
}

// Arr for products
const products = [];

// Create and push product objects
products.push(new Product('appleDiv','Apple',400,'./images/apple.png'));
products.push(new Product('cameraDiv','Camera',700,'./images/camera.png'));
products.push(new Product('watchDiv','Watch',200,'./images/watch.png'));

// Add products to UI
products.forEach((product) => {
    const html = `
    <div id="${product.divId}">
        <img src="${product.imgSrc}" style="width: 100px;">
        <p class="product-name">${product.productName}</p>
        <p class="product-price">$${product.productPrice}</p>
        <button class="button-cart">Add To Cart</button>
    </div>
    `;
    shopDiv.insertAdjacentHTML("afterbegin",html);
});

// Get essential elemenst from DOM

const btnEmptyCart = document.querySelector('#clear-cart');
const btnsAddCart = document.querySelectorAll('.button-cart');
const cartDiv = document.querySelector('.bottom-cart table');
const totalText = document.querySelector('#total-amount');

// Arr for cart

let cartArr = [];

// Empty Cart

btnEmptyCart.addEventListener('click',function(e){
    e.preventDefault();

    cartArr = [];
    
    displayCart(cartArr,null);
    calculateTotal(cartArr);
});

// Calculate Total

const calculateTotal = function(cartArr){
    let total = 0;
    
    cartArr.forEach((cur) => {
        total += cur.productPrice * cur.quantity;
    });

    console.log(total)

    totalText.innerHTML = `Total: $${total}`;
}

// Display cart items

let btnsDeleteItems;

const displayCart = function (cartArr, elem) {
    
    cartDiv.innerHTML = `
    <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Actions</th>
    </tr>
    `; // Clear the cart before re-rendering
  
    cartArr.forEach((cur) => {
      console.log(cartArr)
  
      const html = `
          <tr id="${cur.productName}">
              <td>
                  <img src="${cur.imgSrc}" width="50px">
              </td>
  
              <td>
                  <p>${cur.productName}</p>
              </td>
  
              <td>
                  <p>$${cur.productPrice}</p>
              </td>
  
              <td>
                  <p>${cur.quantity}</p>
              </td>
  
              <td>
                  <button class="delete-item">Delete Item</button>
              </td>
          </tr>
      `;
      cartDiv.insertAdjacentHTML('beforeend', html);
    });

    // Delete items button activated after we add new item in to cart arr
    btnsDeleteItems = new Array(...document.getElementsByClassName('delete-item'));

    btnsDeleteItems.forEach((cur) => {
        cur.addEventListener('click',function(e){
            e.preventDefault();

            const parentDiv = this.parentElement.parentElement.id;

            const productObj = cartArr.find(x => x.productName === parentDiv);

            productObj.quantity--;

            console.log(cartArr.indexOf(productObj))

            if(productObj.quantity === 0){
                const indexToRemove = cartArr.indexOf(productObj);
                cartArr.splice(indexToRemove,1);
            }

            displayCart(cartArr,this);
            calculateTotal(cartArr);
        });
    });
};

// Each items btn event listener

btnsAddCart.forEach((btn) => {
    btn.addEventListener('click',function(e){
        e.preventDefault();

        const clickedItemsDiv = this.parentElement.id;
        const clickedItemObj = products.find((cur) => cur.divId === clickedItemsDiv);

        const existingCartItem = cartArr.find(
            (item) => item.divId === clickedItemObj.divId
        );

        if (existingCartItem) {
            // If the item already exists in the cart, just increase its quantity
            existingCartItem.quantity = (existingCartItem.quantity || 1) + 1;
        } else {
            // If it doesn't exist, add it to the cart array
            clickedItemObj.quantity = 1;
            cartArr.push(clickedItemObj);
        }
        displayCart(cartArr,this);
        calculateTotal(cartArr);
    });
});





