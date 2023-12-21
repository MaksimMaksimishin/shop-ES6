import { Product } from './product.js';
import { Cart } from './cart.js';
import { Popup } from './popup.js';

document.addEventListener('DOMContentLoaded', function () {
    const products = [
        new Product(1, 'LENOVO IdeaPad Gaming 3 ', 999, 'image1.jpg', 'Intel Core i5-12450H, 4.4GHz, 15.6" Full HD, 120Hz,16GB, SSD 512GB, NVIDIA GeForce RTX 3050 Ti 4GB, DOS, Onyx Grey'),
        new Product(2, 'Ноутбук Acer Nitro 5 ', 1199, 'image2.jpg', 'Intel Core i5-11400H, 6 ядер / 16 GB RAM / SSD 512 GB / NVIDIA GeForce RTX 3050 Ti, 4 GB GDDR6 / 144 Гц '),
        new Product(3, 'Lenovo IdeaPad Gaming 3', 1499, 'image3.jpg', 'i5-11/16/512/3050/120Hz 15.6"'),
        new Product(4, 'Ноутбук игровой Acer Nitro 5 AN515-58', 1699, 'image4.jpg', 'Intel Core i5-12500H, 4.5GHz, 15.6" Full HD, 144Hz, 8GB, SSD 512GB, NVIDIA GeForce RTX 4050 6GB'),
        new Product(5, 'Ноутбук HP Victus 16-e0304nw', 1999, 'image5.jpg', 'Дисплей: 16,1";IPS;1920x1080;144 ГцПроцесор: AMD Ryzen 5 5600H;3,3 (Turbo 4,2) ГГцВідеокарта: NVIDIA GeForce RTX 3050, 4 ГБ GDDR6ОЗП: 16 ГБ;DDR4SSD: 512 ГБ'),
        new Product(6, 'Ноутбук Razer Blade 17 D8-NT Black', 2300, 'image6.jpg', 'Модель графического процессора: GeForce RTX 3070 Ti, Объем видеопамяти, ГБ: 8,Серия процессора: Core i7,Разрешение экрана: 2560x1440'),
    ];

    const cart = new Cart();
    const popup = new Popup();

    function renderProducts(products) {
        const appElement = document.getElementById('app');
        appElement.innerHTML = '';

        products.forEach(product => {
            const productContainer = document.createElement('div');
            productContainer.classList.add('product-container');

            const imageElement = document.createElement('img');
            imageElement.src = product.imageUrl;
            imageElement.alt = product.name;
            imageElement.title = product.description;
            imageElement.classList.add('product-image');

            imageElement.addEventListener('click', () => {
                alert(product.description);
            });

            const nameElement = document.createElement('p');
            nameElement.textContent = product.name;

            const priceElement = document.createElement('p');
            priceElement.textContent = `$${product.price}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Добавить в корзину';
            addToCartButton.classList.add('add-to-cart-btn');

            addToCartButton.addEventListener('click', () => {
                addProductToCart(product);
            });

            productContainer.appendChild(imageElement);
            productContainer.appendChild(nameElement);
            productContainer.appendChild(priceElement);
            productContainer.appendChild(addToCartButton);

            appElement.appendChild(productContainer);
        });
    }

    function addProductToCart(product) {
        cart.addItem(product);
        popup.showPopup(`Добавлен товар: ${product.name} в корзину.`);
        renderCart();
    }

    function removeProductFromCart(product) {
        cart.removeItem(product);
        renderCart();
    }

    function renderCart() {
        const cartItemsElement = document.getElementById('cart-items');
        const cartIcon = document.getElementById('cart-icon');
    
        cartItemsElement.innerHTML = '';
    
        if (cart.items.length === 0) {
            const emptyCartMessage = document.createElement('p');
            emptyCartMessage.textContent = 'Корзина пуста';
            cartItemsElement.appendChild(emptyCartMessage);
        } else {
            cart.items.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
    
                const itemImage = document.createElement('img');
                itemImage.src = item.product.imageUrl;
                itemImage.alt = item.product.name;
    
                const itemDetails = document.createElement('div');
                itemDetails.classList.add('item-details');
    
                const itemName = document.createElement('span');
                itemName.textContent = item.product.name;
    
                const itemQuantity = document.createElement('span');
                itemQuantity.textContent = `Количество: ${item.quantity}`;
    
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Убрать';
                removeButton.classList.add('remove-from-cart-btn');
    
                removeButton.addEventListener('click', () => {
                    removeProductFromCart(item.product);
                });
    
                itemDetails.appendChild(itemName);
                itemDetails.appendChild(itemQuantity);
    
                cartItem.appendChild(itemImage);
                cartItem.appendChild(itemDetails);
                cartItem.appendChild(removeButton);
    
                cartItemsElement.appendChild(cartItem);
            });
    
            const totalPriceElement = document.createElement('p');
            totalPriceElement.textContent = `Итого: $${cart.getTotalPrice()}`;
            cartItemsElement.appendChild(totalPriceElement);
        }
    
        const clearCartBtn = document.createElement('button');
        clearCartBtn.textContent = 'Убрать все';
        clearCartBtn.classList.add('clear-cart-btn');
        clearCartBtn.addEventListener('click', () => {
            clearCart();
        });

        cartItemsElement.appendChild(clearCartBtn);

        cartItemsElement.style.display = cart.items.length > 0 ? 'block' : 'none';
        cartIcon.textContent = cart.items.length.toString();
        cart.saveToLocalStorage();
        popup.showPopup(cartItemsElement.name);
    }

    function clearCart() {
        cart.clearCart();
        renderCart();
    }

    const cartIcon = document.getElementById('cart-icon');
    cartIcon.addEventListener('click', () => {
        renderCart();
    });

    renderProducts(products);
    renderCart();
});