document.addEventListener('DOMContentLoaded',()=>{
   const expenseform=document.getElementById("expense-form");
   const expensename=document.getElementById("expense-name");
   const expenseamount=document.getElementById("expense-amount");
   const expenselist=document.getElementById("expense-list");
   const expensetotal=document.getElementById("total");

   let expenses=JSON.parse(localStorage.getItem('expenses')) || [];
   let totalAmount=calculateTotal();
    renderExpenses();
    updatetotal();

   expenseform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=expensename.value.trim();
    const amount=parseFloat(expenseamount.value.trim());
    if(name!="" && !isNaN(amount) && amount>0){
        const newexpense={
            id:Date.now(),
            name:name,
            amount:amount
        }
        expenses.push(newexpense);
        saveexpensestolocal();
        renderExpenses();
        updatetotal();

        //clear input
        expensename.value="";
        expenseamount.value="";
    }
   });
   function renderExpenses(){
    expenselist.innerHTML="";
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML=`
        ${expense.name}-$${expense.amount}
        <button data-id="${expense.id}">Delete</button>
        `;
        expenselist.appendChild(li);
    })
   }
   function calculateTotal(){
     return expenses.reduce((sum,expense) => sum+expense.amount,0)
   }

   function saveexpensestolocal(){
    localStorage.setItem("expenses",JSON.stringify(expenses));
   }
   
   function updatetotal(){
    totalAmount=calculateTotal();
    expensetotal.textContent=totalAmount.toFixed(2);
   }
   expenselist.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON'){
       const expenseid=parseInt(e.target.getAttribute('data-id'))
       expenses=expenses.filter(expense => expense.id!==expenseid)
        saveexpensestolocal();
        renderExpenses();
        updatetotal()
    }
   })
});