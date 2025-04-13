
# 📈 Stock Trading Web App

A full-stack stock trading platform where users can sign up, manage their portfolios, buy/sell stocks, and view order history. The UI is inspired by Bloomberg, featuring dark mode and a sleek financial dashboard look.

## 🔥 Features

- 🧾 **User Authentication** – Sign up, log in, and role-based account creation.
- 💼 **Stock Trading** – Buy and sell stocks with real-time updates to your balance and holdings.
- 📊 **Portfolio Management** – Track your owned stocks and order history.
- 📰 **News Section** – Live market-related news to stay informed.
- 📂 **Order History** – Organized display of intraday and delivery orders.
- 💡 **Responsive Design** – Optimized for various screen sizes.
- 🎨 **Dark Mode UI** – Financial dashboard vibe with stylish component layouts.

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Axios
- React Icons
- CSS (custom styling, inspired by Bloomberg UI)

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)

## 📁 Folder Structure

```
client/
│
├── src/
│   ├── components/
│   │   ├── Home.jsx
│   │   ├── History.jsx
│   │   ├── News.jsx
│   ├── styles/
│   │   ├── Home.css
│   │   ├── History.css
│   │   ├── Landing.css
│   ├── App.jsx
│   └── index.js
│
server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── index.js
```

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/stock-trading-app.git
cd stock-trading-app
```

### 2. Install dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 3. Run the app

#### Backend
```bash
npm start
```

#### Frontend
```bash
npm start
```

Ensure MongoDB is running on your machine or configured in the `.env` file.

## 🧪 API Endpoints

- `POST /register`
- `POST /login`
- `GET /stocks`
- `POST /buy`
- `POST /sell`
- `GET /fetch-orders`

## 🧑‍🎨 Styling

Custom CSS modules are used for modularity and clarity. Key style highlights:

- **Dark Mode** for history and trading screens
- **Glassmorphism** and gradients for the landing page
- **Scroll hiding**, card hovers, and adaptive flex layouts
- **Section-wise Styling**:
  - `.landingPage`: Full-height responsive landing
  - `.trending-stocks-container`: News-style card layout
  - `.user-history-stock`: Order card display with hover animations

## 📸 Screenshots

![Screenshot 2025-04-13 215500](https://github.com/user-attachments/assets/1066ffd1-59c7-414b-b69e-2a9bb414b507)
![Screenshot 2025-04-13 215335](https://github.com/user-attachments/assets/7e19f4a3-2046-4fff-bd1d-bd4d3ec3158b)
![Screenshot 2025-04-13 215148](https://github.com/user-attachments/assets/e4a65f0c-f43f-4f95-bea7-5c21562b188c)
![Screenshot 2025-04-13 215045](https://github.com/user-attachments/assets/4102735f-3eb6-4887-afac-3b9d89bbb303)
![Screenshot 2025-04-13 214923](https://github.com/user-attachments/assets/b53a786b-d8c8-4584-a16c-fed51f590175)

## 🙌 Acknowledgements

- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- UI inspired by Bloomberg Terminal

## 📃 License

This project is licensed under the MIT License.
