const app = document.getElementById("app");

// API base URL
const API_BASE = "https://bank-account-system-server.onrender.com/user";

// Utility functions
function createElement(tag, className = "", content = "") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content) el.innerHTML = content;
  return el;
}

function navigateTo(page) {
  app.innerHTML = "";
  if (page === "register") renderRegister();
  if (page === "login") renderLogin();
  if (page === "dashboard") renderDashboard();
  if (page === "deposit") renderDeposit();
  if (page === "withdraw") renderWithdraw();
  if (page === "transfer") renderTransfer();
  if (page === "statement") renderStatement();
}

let token = null; // JWT token to manage authenticated requests
let currentUser = null; // Logged-in user details

// Pages
function renderRegister() {
  const container = createElement(
    "div",
    "flex flex-col items-center justify-center h-screen"
  );
  const form = createElement("div", "bg-white p-6 rounded shadow-md w-80");
  const title = createElement("h1", "text-xl font-bold mb-4", "Register");

  const usernameInput = createElement(
    "input",
    "block w-full mb-2 p-2 border rounded"
  );
  usernameInput.placeholder = "Username";
  const pinInput = createElement(
    "input",
    "block w-full mb-2 p-2 border rounded"
  );
  pinInput.type = "password";
  pinInput.placeholder = "4-digit PIN";
  const depositInput = createElement(
    "input",
    "block w-full mb-4 p-2 border rounded"
  );
  depositInput.placeholder = "Initial Deposit (optional)";
  depositInput.type = "number";

  const alreadyHaveAccount = createElement(
    "span",
    "",
    "Already have an account?"
  );
  const loginLink = createElement(
    "a",
    "text-blue-700 cursor-pointer ml-1",
    "Login"
  );
  loginLink.onclick = () => {
    navigateTo("login");
  };
  const alreadyHaveAccountDiv = createElement(
    "div",
    "w-full flex justify-center items-center mt-3"
  );
  alreadyHaveAccountDiv.append(alreadyHaveAccount, loginLink);

  const button = createElement(
    "button",
    "bg-blue-500 text-white p-2 rounded w-full",
    "Register"
  );
  button.onclick = async () => {
    const username = usernameInput.value.trim();
    const pin = pinInput.value.trim();
    const initialDeposit = parseFloat(depositInput.value) || 0;

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, pin, initialDeposit }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Account created! Your account number is ${data.accountNumber}`);
        navigateTo("login");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      alert("Server error during registration.");
    }
  };

  form.append(
    title,
    usernameInput,
    pinInput,
    depositInput,
    button,
    alreadyHaveAccountDiv
  );
  container.append(form);
  app.append(container);
}

function renderLogin() {
  const container = createElement(
    "div",
    "flex flex-col items-center justify-center h-screen"
  );
  const form = createElement("div", "bg-white p-6 rounded shadow-md w-80");
  const title = createElement("h1", "text-xl font-bold mb-4", "Login");

  const usernameInput = createElement(
    "input",
    "block w-full mb-2 p-2 border rounded"
  );
  usernameInput.placeholder = "Username";
  const pinInput = createElement(
    "input",
    "block w-full mb-4 p-2 border rounded"
  );
  pinInput.type = "password";
  pinInput.placeholder = "4-digit PIN";

  const dontHaveAccount = createElement("span", "", "Don't have an account?");
  const registerLink = createElement(
    "a",
    "text-blue-700 cursor-pointer ml-1",
    "Register"
  );
  registerLink.onclick = () => {
    navigateTo("register");
  };
  const dontHaveAccountDiv = createElement(
    "div",
    "w-full flex justify-center items-center mt-3"
  );
  dontHaveAccountDiv.append(dontHaveAccount, registerLink);

  const button = createElement(
    "button",
    "bg-blue-500 text-white p-2 rounded w-full",
    "Login"
  );
  button.onclick = async () => {
    const username = usernameInput.value.trim();
    const pin = pinInput.value.trim();

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, pin }),
      });

      const data = await response.json();
      if (response.ok) {
        token = data.token;
        currentUser = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", currentUser);
        navigateTo("dashboard");
      } else {
        console.log(response.message);
      }
    } catch (error) {
      // alert("Server error during login.");
      alert(error.message);
    }
  };

  form.append(title, usernameInput, pinInput, button, dontHaveAccountDiv);
  container.append(form);
  app.append(container);
}

async function renderDashboard() {
  // try {
  //   const response = await fetch(`${API_BASE}/details`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   const data = await response.json();
  //   if (response.ok) {
  //     localStorage.setItem("userData", data);
  //   }
  //   navigateTo("dashboard");
  // } catch (error) {
  //   alert("Server error during deposit.");
  //   console.log(error.message);
  // }
  const container = createElement("div", "p-6 bg-gray-100 min-h-screen");
  const title = createElement(
    "h1",
    "text-2xl font-bold",
    `Welcome, ${currentUser?.user?.username}!`
  );
  const accountNumber = createElement(
    "h1",
    "text-md",
    `Account Number -  ${currentUser?.user?.accountNumber}`
  );
  const balance = createElement(
    "h1",
    "text-md",
    `Account Balance -  ${currentUser?.user?.balance}`
  );

  const buttons = [
    {
      label: "Deposit Money",
      action: () => navigateTo("deposit"),
      className: "bg-green-500",
    },
    {
      label: "Withdraw Money",
      action: () => navigateTo("withdraw"),
      className: "bg-red-500",
    },
    {
      label: "Transfer Money",
      action: () => navigateTo("transfer"),
      className: "bg-blue-500",
    },
    {
      label: "View Statement",
      action: () => navigateTo("statement"),
      className: "bg-gray-500",
    },
    {
      label: "Logout",
      action: () => navigateTo("login"),
      className: "bg-black",
    },
  ];

  buttons.forEach((btn) => {
    const button = createElement(
      "button",
      `block ${btn.className} text-white p-2 rounded w-full mt-4`,
      btn.label
    );
    button.onclick = btn.action;
    container.append(button);
  });

  container.append(title, accountNumber, balance);
  app.append(container);
}

async function renderDeposit() {
  const amount = prompt("Enter amount to deposit:");
  const pin = prompt("Enter you pin");
  if (!amount || isNaN(amount) || amount <= 0) {
    alert("Invalid amount.");
    return;
  } else {
    try {
      const response = await fetch(`${API_BASE}/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: currentUser?.user?.username,
          amount,
          pin,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Deposit successful! New balance: ${data.balance}`);
        currentUser.user.balance += Number(amount);
      }
      navigateTo("dashboard");
    } catch (error) {
      alert("Server error during deposit.");
      console.log(error.message);
    }
  }
}

async function renderWithdraw() {
  const amount = prompt("Enter amount to withdraw:");
  const pin = prompt("Enter you pin");
  if (!amount || isNaN(amount) || amount <= 0) {
    alert("Invalid amount.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: currentUser?.user?.username,
        amount,
        pin,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(`Withdrawal successful! New balance: ${data.balance}`);
      currentUser.user.balance -= Number(amount);
    } else {
      alert(data.message || "Withdrawal failed.");
    }
    navigateTo("dashboard");
  } catch (error) {
    alert("Server error during withdrawal.");
  }
}
function calculateRemainingBalance(amount, variable) {
  const chargableAmount = amount * variable;
  document.querySelector(
    ".charge"
  ).innerText = `Chargable amount for this transaction will be ${chargableAmount}`;
}
function createCustomPrompt(callback) {
  // Create container div
  const promptDiv = document.createElement("div");
  promptDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      z-index: 1000;
  `;

  // Create overlay
  const overlay = document.createElement("div");
  overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 999;
  `;

  // Create input fields
  const racn = document.createElement("input");
  racn.placeholder = "Enter Recevier Account Number";
  racn.style.marginBottom = "10px";
  racn.style.display = "block";
  racn.style.width = "200px";
  racn.style.padding = "5px";

  const amount = document.createElement("input");
  amount.placeholder = "Enter amount";
  amount.onchange = function (e) {
    calculateRemainingBalance(Number(e.target.value), 0.002);
  };
  amount.style.marginBottom = "10px";
  amount.style.display = "block";
  amount.style.width = "200px";
  amount.style.padding = "5px";

  const pin = document.createElement("input");
  pin.placeholder = "Enter pin";
  pin.style.marginBottom = "10px";
  pin.style.display = "block";
  pin.style.width = "200px";
  pin.style.padding = "5px";

  const charge = document.createElement("p");
  charge.setAttribute("class", "charge");

  // Create submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.style.cssText = `
      padding: 5px 15px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
  `;

  // Add event listener for submit
  submitButton.addEventListener("click", () => {
    const values = {
      racn: racn?.value,
      amount: amount?.value,
      pin: pin?.value,
    };

    callback(values);
    // You can handle the values here as needed

    // Remove the prompt
    document.body.removeChild(promptDiv);
    document.body.removeChild(overlay);
  });

  // Append elements to prompt div
  promptDiv.appendChild(racn);
  promptDiv.appendChild(amount);
  promptDiv.appendChild(charge);
  promptDiv.appendChild(pin);
  promptDiv.appendChild(submitButton);

  // Add to document
  document.body.appendChild(overlay);
  document.body.appendChild(promptDiv);

  // Focus first input
  racn.focus();
}

// Call the function to show the prompt

async function renderTransfer() {
  createCustomPrompt(async (data) => {
    const recipientAccountNumber = data?.racn;
    const amount = data?.amount;
    const pin = data?.pin;
    if (!recipientAccountNumber || !amount || isNaN(amount) || amount <= 0) {
      alert("Invalid recipient or amount.");
    }

    try {
      const response = await fetch(`${API_BASE}/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderUsername: currentUser?.user?.username,
          recipientAccountNumber,
          amount,
          pin,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Transfer successful! New balance: ${data.senderBalance}`);
        currentUser.user.balance -= Number(amount);
      } else {
        alert(data.message || "Transfer failed.");
      }
      navigateTo("dashboard");
    } catch (error) {
      alert(error.message);
    }
  });
}
async function renderStatement() {
  try {
    const response = await fetch(`${API_BASE}/statement`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      const container = createElement("div", "p-6 bg-gray-100 min-h-screen");
      const button = createElement(
        "button",
        "bg-blue-500 px-4 py-2 rounded-lg mt-6 ml-6",
        "Back to Dashboard"
      );
      button.onclick = () => {
        navigateTo("dashboard");
      };
      const title = createElement(
        "h1",
        "text-2xl font-bold mb-4",
        "Account Statement"
      );
      const transactionList = createElement(
        "div",
        "bg-white rounded shadow-md p-4"
      );

      if (data.transactions.length === 0) {
        const noTransactions = createElement(
          "p",
          "text-gray-700",
          "No transactions found."
        );
        transactionList.append(noTransactions);
      } else {
        data.transactions.forEach((t) => {
          const item = createElement("div", "border-b py-2");
          item.innerHTML = `
            <p><strong>Type:</strong> ${t.type}</p>
            <p><strong>Amount:</strong> $${t.amount}</p>
            <p><strong>Balance After:</strong> $${t.balanceAfterTransaction}</p>
            <p><strong>Timestamp:</strong> ${new Date(
              t.timestamp
            ).toLocaleString()}</p>
            ${
              t.details
                ? `<p><strong>Details:</strong> ${JSON.stringify(
                    t.details
                  )}</p>`
                : ""
            }
          `;
          transactionList.append(item);
        });
      }

      container.append(title, transactionList);
      app.append(button, container);
    } else {
      alert(data.message || "Failed to fetch statement.");
      navigateTo("dashboard");
    }
  } catch (error) {
    alert("Server error while fetching statement.");
    console.log(error.message);
  }
}

navigateTo("login");
