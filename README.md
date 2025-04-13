
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

> _Add screenshots here of the landing page, dashboard, trading UI, and news section._

## 🙌 Acknowledgements

- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- UI inspired by Bloomberg Terminal

## 📃 License

This project is licensed under the MIT License.
