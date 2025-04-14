function addToCart(name, price) {
    const cart = getcart();
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cart.push({ name, price, quantity: 1 });
    }
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}
function getcart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function savecart(cart) {
    //const cart = getcart();
    localStorage.setItem("cart", JSON.stringify(cart));
}
function removedfromcart(name) {
    let cart = getcart();
    cart = cart.filter((item) => item.name !== name);
    savecart(cart);
    window.location.reload();
    console.log(cart);
    //cartview();
}
function clearcart() {
    localStorage.removeItem("cart");
    window.location.reload();
    //cartview();
}
if (window.location.pathname.includes('cart.html')) {
    const cart = getcart();
    const tbody = document.querySelector('#cartTable tbody');
    if (cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Your cart is empty</td></tr>';
    }
    else {
        let total = 0;
        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            tbody.innerHTML +=
                `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${itemTotal.toFixed(2)}</td>
                <td><button onclick="removedfromcart('${item.name}')">Remove</button></td>
            </tr>
            `;
        })
        tbody.innerHTML += `
        <tr>
           <td colspan="3" style="text-align:right">
           <strong> Grand Total:</strong></td>
           <td><strong>${total.toFixed(2)}</strong></td>
              <td></td>
        </tr>
        <tr>
            <td colspan="5" style="text-align:right">
            <button onclick="clearcart()">Clear Cart</button></td>
        </tr>`;
    }
}
