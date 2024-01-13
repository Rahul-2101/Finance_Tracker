// start
// const editForm = document.getElementById("editForm");
// const editedNameInput = document.getElementById("editedName");
// const editedDateInput = document.getElementById("editedDate");
// const editedAmountInput = document.getElementById("editedAmount");


// editButton.addEventListener("click", () => {
//   // Switch to edit mode
//   editForm.classList.remove("hidden");
//   editButton.style.display = "none";
  
//   // Populate the edit fields with current values
//   editedNameInput.value = nameSpan.textContent;
//   editedDateInput.value = dateSpan.textContent;
//   editedAmountInput.value = amountSpan.textContent;
// });

// saveButton.addEventListener("click", () => {
//   // Update the displayed values with edited ones
//   nameSpan.textContent = editedNameInput.value;
//   dateSpan.textContent = editedDateInput.value;
//   amountSpan.textContent = editedAmountInput.value;
  
//   // Switch back to view mode
//   editForm.classList.add("hidden");
//   editButton.style.display = "block";
// });


// end


document.getElementById('expForm').addEventListener('submit', addTransaction);
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
    e.preventDefault();
  
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let date = document.getElementById('date').value;
    let amount = document.getElementById('amount').value;
  
    if (type != 'chooseOne'
      && name.length > 0
      && amount > 0 && date!=0) {
      const transaction = {
        type,
        name,
        date,
        amount,
        id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
      }
  
      transactions.push(transaction);
     
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  
    document.getElementById('expForm').reset();
    showTransactions();
    updateBalance();
  }
  
  const showTransactions = () => {
  
    const transactionTable = document.getElementById('transactionTable');
  
    transactionTable.innerHTML = '';
  
    for (let i = 0; i < transactions.length; i++) {
      transactionTable.innerHTML += `
            <tr>
                <td>${transactions[i].type}</td>
                <td>${transactions[i].name}</td>
                <td>${transactions[i].date}</td>
                <td>$${transactions[i].amount}</td>
                <td><a class="deleteButton" onclick="deleteTransaction(${transactions[i].id})">
                    Delete</td>
            </tr>
        `;

        // function editRow(){
        //     table.rows.transactions[i].type = document.getElementById("type").value;
        //     table.rows.transactions[i].name = document.getElementById("name").value;
        //     table.rows.transactions[i].date = document.getElementById("date").value;
        //     table.rows.transactions[i].amount = document.getElementById("amount").value;
        // }
        
        // Data Update Table Here
        function editTableDisplay(){
            document.querySelector('.editTable').setAttribute('style', 'display: block;')
      } 
    }
  }

  const deleteTransaction = (id) => {
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].id == id) {
        transactions.splice(i, 1);
      }
    }
  
    localStorage.setItem('transactions', JSON.stringify(transactions));
    showTransactions();
    updateBalance();
  }


  const updateBalance = () => {
    let balance = 0;
  
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        balance += Number(transaction.amount);
      } else if (transaction.type === "expense") {
        balance -= transaction.amount;
      }
    });
  
    document.querySelector(".balance").textContent = balance;

    
}