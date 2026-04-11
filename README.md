# 🏪 Store Rating Web Application

A full-stack web application where users can browse stores and submit ratings. The platform supports role-based access for Admins, Users, and Store Owners.

---

## Tech Stack

### Frontend
- React.js
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MySQL (FreeSQLDatabase)

### Deployment
- Frontend: Vercel
- Backend: Render

---

## User Roles

### 1. Admin
- View dashboard (users, stores, ratings)
- Create users and stores
- View all users and stores

### 2. Normal User
- Signup & Login
- Search stores
- Submit & update ratings
- Change password

### 3. Store Owner
- View store ratings
- View users who rated
- See average rating

---

## Features

- JWT-based authentication
- Role-based access control
- Store search (name & address)
- Rating system (1–5)
- Update existing rating
- Password update

---

## Setup Instructions

### 1) Clone the repository

git clone https://github.com/pruthi-shivin/store-rating-app ->
cd store-rating-app 

### 2) Backend Setup
cd backend ->
npm install

run command: npm run dev

### 3) Frontend Setup
cd frontend ->
npm install

run command: npm start


### Dependencies:
#### backend:
##### Install using: 

cd backend ->
npm install

##### Packages used:

express,
mysql2,
cors,
dotenv,
bcryptjs,
jsonwebtoken,
nodemon


#### frontend:
##### Install using:

cd frontend ->
npm install

##### Packages used:

react,
react-router-dom,
axios
