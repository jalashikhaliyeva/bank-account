const balanceEl = document.querySelector("#balanceEl");
const moneyInput = document.querySelector("#moneyInput");
const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const list = document.querySelector("#list");

const bankAcc = {
  total: 1000,
  data: [],

  adding: function (amount) {
    if (amount > 0 && amount !== null && amount !== "") {
      amount = parseFloat(amount);
      if (amount > 0) {
        this.total += amount;
        balanceEl.innerHTML = `$${this.total}`;
        history1.call(this, "Cash", amount);
        alert(`New total balance: $${this.total}`);
      } else {
        alert("Invalid cash-in amount. Amount must be greater than 0.");
      }
    } else {
      alert("Invalid input or operation canceled.");
    }
  },

  withdraw: function (amount) {
    if (amount > 0 && amount !== null && amount !== "") {
      amount = parseFloat(amount);
      if (amount > 0 && amount <= this.total) {
        this.total -= amount;
        balanceEl.innerHTML = `$${this.total}`;
        history1.call(this, "Withdraw", -amount);
        alert(`New total balance: $${this.total}`);
      } else {
        alert(
          "Invalid withdraw amount. Amount must be greater than 0, less or equal to your balance."
        );
      }
    } else {
      alert("Invalid input or operation canceled.");
    }
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

function history1(type, amount) {
  const history = {
    type: type,
    amount: amount,
    created: new Date().toLocaleString(),
  };
  this.data.push(history);

  const newContent = this.data
    .slice()
    .reverse()
    .map(
      (item, index) =>
        `<tr>
            <th scope="row">${index + 1}</th>
            <td>${item.type}</td>
            <td class="text-${
              item.type === "Withdraw" ? "danger" : "success"
            }">${item.amount > 0 ? `+${item.amount}` : item.amount}</td>
            <td>${item.created}</td>
        </tr>`
    )
    .join("");
  list.innerHTML = newContent;
}
