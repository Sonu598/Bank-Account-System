# **Bank Account System**

## **Overview**
The **Bank Account System** is a RESTful API that enables users to perform basic banking operations such as account registration, login, deposits, withdrawals, fund transfers, and transaction history management. The system ensures security using hashed PINs and JWT-based authentication and includes features like account locking after multiple failed login attempts.

---

## **Features**
- **Register**: Create accounts with unique usernames, a secure 4-digit PIN, and an optional initial deposit.
- **Login**: Log in using credentials to receive a JWT token for secure access.
- **Deposit**: Add funds to your account securely.
- **Withdraw**: Withdraw funds while ensuring sufficient balance.
- **Transfer**: Transfer money between accounts securely.
- **Transaction History**: View all past transactions, including deposits, withdrawals, and transfers.
- **Account Locking**: Lock accounts after 3 failed login attempts for 24 hours.

---

## **Technologies Used**
### **Backend**
- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Web framework for handling HTTP requests and routing.
- **MongoDB**: NoSQL database for data storage.
- **bcryptjs**: For hashing PINs securely.
- **jsonwebtoken (JWT)**: For secure authentication.

### **Frontend**
- **HTML, CSS, JavaScript**: Used for building the user interface.

---

## **API Endpoints**

### **Base URL** : https://bank-account-system-server.onrender.com/user


| Endpoint            | Method | Description                 | Auth Required |
|---------------------|--------|-----------------------------|---------------|
| `/register`         | POST   | Register a new user         | No            |
| `/login`            | POST   | Login and get JWT token     | No            |
| `/deposit`          | POST   | Deposit money               | Yes           |
| `/withdraw`         | POST   | Withdraw money              | Yes           |
| `/transfer`         | POST   | Transfer funds              | Yes           |
| `/transactions`     | GET    | View transaction history    | Yes           |

---

# Usage

## Register
1. Fill out the **Registration Form** with:
   - A unique username
   - A 4-digit PIN
   - An optional initial deposit
2. Submit the form to register and receive your account number.

## Login
1. Enter your **username** and **PIN** on the Login Page.
2. Upon successful login, access the dashboard to view your account information and transaction history.

## Perform Transactions
From the dashboard, you can:
- **Deposit**: Add funds to your account.
- **Withdraw**: Securely withdraw funds.
- **Transfer**: Send money to another user’s account.
- **View Transactions**: Review your account's transaction history.

## Security Features
- **Password Hashing**: User PINs are securely hashed using `bcryptjs`.
- **JWT Authentication**: Secure endpoints require a valid JWT token.
- **Account Locking**: Accounts are locked for 24 hours after 3 failed login attempts.

---

## Contributors
- **Ishupriya Rath** - [Sonu598](#Sonu598)

## Feedback
For suggestions or issues:
- Open an issue on this repository.
- Contact me via email at [ishupriyarath@gmail.com](mailto:ishupriyarath@gmail.com).

---


**Happy Coding! 🚀**




