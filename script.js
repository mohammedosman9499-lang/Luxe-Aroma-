const buttons = document.querySelectorAll(".add-btn");
const cartItems =document.getElementById("cart-items");
const cartCount =document.getElementById("cart-count");
const total = document.getElementById("total");
//تحليل البيانات من Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
//حفظ البيانات
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}
//عرض السلة
function displayCart(){
    cartItems.innerHTML = "";
    let totalPrice = 0;
    cart.forEach((Product, index) => {
        totalPrice += Product.price;
        const li = document.createElement("li");
        li.innerHTML = `${Product.name} - $${Product.price}
        <button onclick= "removeItem(${index})">Delete</button>
        `;
        cartItems.appendChild(li);
        
    });
    cartCount.textContent= cart.length;
    total.textContent= totalPrice;
    saveCart();
}
//اضافة منتج
buttons.forEach(button => {
    button.addEventListener("click", () => {
    const card = button.parentElement;
    const name = card.querySelector("h3").textContent;
    const price = Number(
        card.querySelector("p").textContent.replace("$","")
    );
    cart.push({
        name, price
    });
    displayCart();
    });
});
//حذف منتج
function removeItem(index){
    cart.splice(index, 1);
    displayCart();
}
//أول تشغيل للموقع
displayCart();