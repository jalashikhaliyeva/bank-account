const balanceEl = document.querySelector("#balanceEl");
const moneyInput = document.querySelector("#moneyInput");
const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const list = document.querySelector("#list");
const paymentBtn = document.querySelector("#paymentBtn");
const cashbackEl = document.querySelector("#cashbackEl");

const bankAcc = {
  total: 1000,
  data: [],
  cashback: 0,

  adding: function (amount) {
    if (this.validateAmount(amount)) {
      this.total += amount;
      this.updateBalance();
      this.history("Cash", amount);
      alert(`New total balance: $${this.total}`);
    }
  },

  withdraw: function (amount) {
    if (this.validateAmount(amount) && this.validateWithdrawal(amount)) {
      this.total -= amount;
      this.updateBalance();
      this.history("Withdraw", -amount);
      alert(`New total balance: $${this.total}`);
    }
  },

  payment: function (amount) {
    if (this.validateAmount(amount) && this.validatePayment(amount)) {
      const cashBack = this.calculateCashback(amount);
      this.total -= amount;
      this.cashback += cashBack;
      this.updateBalance();
      this.updateCashback();
      this.history("Payment", -amount);
      this.history("Cashback", cashBack, "success");
      alert(`New total balance: $${this.total}`);
    }
  },
  updateCashback : function(){
    cashbackEl.innerHTML = `$${this.cashback.toFixed(2)}`;
  },

  calculateCashback: function (amount) {
    return amount * 0.03;
  },

  validateAmount: function (amount) {
    amount = parseFloat(amount);
    if (isNaN(amount) || amount <= 0) {
      alert("Invalid amount. Please enter a valid positive number.");
      return false;
    }
    return true;
  },

  validateWithdrawal: function (amount) {
    if (amount > this.total) {
      alert(
        "Invalid withdrawal amount. Amount must be less than or equal to your balance."
      );
      return false;
    }
    return true;
  },

  validatePayment: function (amount) {
    if (amount > this.total) {
      alert(
        "Invalid payment amount. Amount must be less than or equal to your balance."
      );
      return false;
    }
    return true;
  },

  updateBalance: function () {
    balanceEl.innerHTML = `$${this.total}`;
  },

  history: function (type, amount, color) {
    const historyItem = {
      type: type,
      amount: amount,
      created: new Date().toLocaleString(),
      color: color || (amount < 0 ? "danger" : "success"),
    };
    this.data.push(historyItem);

    const newContent = this.data
      .slice()
      .reverse()
      .map(
        (item, index) =>
          `<tr>
              <th scope="row">${index + 1}</th>
              <td>${item.type}</td>
              <td class="text-${item.color}">${
            item.amount.toFixed(2) > 0
              ? `+$${item.amount.toFixed(2)}`
              : item.amount.toFixed(2)
          }</td>
              <td>${item.created}</td>
          </tr>`
      )
      .join("");
    list.innerHTML = newContent;
  },
};

incrementBtn.addEventListener("click", function () {
  const value = moneyInput.value;
  bankAcc.adding(+value);
  moneyInput.value = "";
});

decrementBtn.addEventListener("click", function () {
  const value = moneyInput.value;
  bankAcc.withdraw(value);
  moneyInput.value = "";
});

paymentBtn.addEventListener("click", function () {
  const value = moneyInput.value;
  bankAcc.payment(value);
  moneyInput.value = "";
});
