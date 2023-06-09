const incomeSection = document.querySelector('.income-area')
const expensesSection = document.querySelector('.expenses-area')
const availableMoney = document.querySelector('.available-money')
const addTransactionPanel = document.querySelector('.add-transaction-panel')

const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')

const addTransactionBtn = document.querySelector('.add-transaction')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const deleteBtn = document.querySelector('.delete')
const deleteAllBtn = document.querySelector('.delete-all')

const lightBtn = document.querySelector('.light')
const darkBtn = document.querySelector('.dark')

let root = document.documentElement
let ID = 0
let categoryIcon
let selectedCategory
let moneyArr = [0]

const openPanel = () => {
	addTransactionPanel.style.display = 'flex'
}
const closePanel = () => {
	addTransactionPanel.style.display = 'none'
	cleanForm()
}
const checkForm = () => {
	if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none') {
		createNewTransaction()
		closePanel()
		cleanForm()
	} else {
		alert('Wypełnij wszystkie tabelki!')
	}
}
const cleanForm = () => {
	nameInput.value = ''
	amountInput.value = ''
	categorySelect.selectedIndex = 0
}

const createNewTransaction = () => {
	const newTransaction = document.createElement('div')
	newTransaction.classList.add('transaction')
	newTransaction.setAttribute('id', ID)
	checkCategory(selectedCategory)

	newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount">${amountInput.value}zł <button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button>
    </p>`

	amountInput.value > 0
		? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('income')
		: expensesSection.appendChild(newTransaction) && newTransaction.classList.add('expense')

	moneyArr.push(parseFloat(amountInput.value))
	countMoney(moneyArr)
	ID++
}

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text
}

const checkCategory = transaction => {
	switch (transaction) {
		case `Przychód`:
			categoryIcon = '<i class="fas fa-money-bill-wave"></i> '
			break
		case `Zakupy`:
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i> '
			break
		case `Jedzenie`:
			categoryIcon = '<i class="fas fa-hamburger"></i> '
			break
		case `Kino`:
			categoryIcon = '<i class="fas fa-film"></i> '
			break
			case `Inne`:
				categoryIcon = '<i class="fas fa-socks"></i> '
				break
			
	}
}
const countMoney = money => {
	const newMoney = money.reduce((a, b) => a + b)
	availableMoney.textContent = `${newMoney}zł`
}

const deleteTransaction = id => {
	const transactionToDelete = document.getElementById(id)
	const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText)
	const indexOfTransaction = moneyArr.indexOf(transactionAmount)
	moneyArr.splice(indexOfTransaction, 1)

	transactionToDelete.classList.contains('income')
		? incomeSection.removeChild(transactionToDelete)
		: expensesSection.removeChild(transactionToDelete)

	countMoney(moneyArr)
}

const deleteAllTransactions = () => {
	incomeSection.innerHTML = `<h3>Przychód:</h3>`
	expensesSection.innerHTML = `<h3>Wydatki:</h3>`
	availableMoney.textContent = '0zł'
	moneyArr = [0]
}

const darkStyle = () => {
	root.style.setProperty('--first-color', '#000')
	root.style.setProperty('--second-color', '#fff')
	root.style.setProperty('--border-color', '#fff')
	addTransactionPanel.style.backgroundImage = 'linear-gradient(315deg,#333 0%, #000 74%)'
}

const lightStyle = () => {
	root.style.setProperty('--first-color', '#f9f9f9')
	root.style.setProperty('--second-color', '#14161f')
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.2)')
	addTransactionPanel.style.backgroundImage = 'linear-gradient(315deg,#4c4177 0%, #2a5470 74%)'
}

addTransactionBtn.addEventListener('click', openPanel)
cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', checkForm)
deleteAllBtn.addEventListener('click', deleteAllTransactions)
darkBtn.addEventListener('click', darkStyle)
lightBtn.addEventListener('click', lightStyle)
