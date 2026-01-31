//load the document
document.addEventListener('DOMContentLoaded',()=>{
   const products=[
    {id:1,name:"Product 1",price:29.99},
    {id:2,name:"Product 2",price:19.99},
    {id:3,name:"Product 3",price:59.999},
   ];
    const cart=[];

    const productList=document.getElementById("product-list");
    const  cartlist=document.getElementById("cart-items");
    const emptycart=document.getElementById("empty-cart");
    const  carttotal=document.getElementById("cart-total");
    const checkoutbtn=document.getElementById("checkout-btn");
    const totalprice=document.getElementById("total-price");
   
    products.forEach((product) => {
       const productDiv= document.createElement('div')
       productDiv.classList.add("product")
       productDiv.innerHTML=`
       <span>${product.name}-$${product.price.toFixed(2)}</span>
       <button data-id="${product.id}"> Add to cart</button>
       `;
       productList.appendChild(productDiv);
    });
    

    productList.addEventListener("click",(e)=>{
         if(e.target.tagName==="BUTTON"){
            //it is actually string lets conevrt into the int
           const productid=parseInt(e.target.getAttribute('data-id'));
          const product = products.find(p=>p.id===productid)
          addtocart(product);
         }
    });

    function addtocart(product){
        cart.push(product);
        renderCart();

    }
    function renderCart(){
        cartlist.innerText="";
        let totalPrice=0;
        if(cart.length>0){
            emptycart.classList.add("hidden");
            carttotal.classList.remove("hidden");
            cart.forEach((item,index)=>{
              totalPrice+=item.price;
              const cartItem=document.createElement('div')
              cartItem.innerHTML=`
              ${item.name} -$${item.price.toFixed(2)}    
             `;
              cartlist.appendChild(cartItem);       
              totalprice.textContent=`${totalPrice}`;
            });
        }else{
            emptycart.classList.remove("hidden");
            totalprice.textContent=`$0.00`;
        }

    }
    checkoutbtn.addEventListener('click',()=>{
        cart.length=0;
        alert("checkout succesfully");
        renderCart();
    })
});