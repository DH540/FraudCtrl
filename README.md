# FraudControl
An AI-Based Detection System Against Fake Reviews in E-Commerce Websites

# Installation Setup Guide

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- An [OpenRouter](https://openrouter.ai/) account for the API key

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/DH540/FraudCtrl.git
```

### 2. Install Dependencies

Run `npm install` in each of the following folders:

```bash
# Project root
npm install

# Client folder
cd client
npm install

# Server folder
cd ../server
npm install
```

---

## Configuration

### 3. Create the `.env` File

Inside the **server** folder, create a `.env` file and add your OpenRouter API key:

```
OPENROUTER_API_KEY=your_api_key_here
```

### 4. Get an OpenRouter API Key

1. Go to [https://openrouter.ai](https://openrouter.ai)
2. Sign in or create an account
3. Navigate to the API Keys section and create a new key
4. Copy the key and paste it into the `.env` file as shown above

---

## Running the Project

Start both the server and the client in separate terminal windows:

```bash
# In the server folder
cd server
npm start

# In the client folder
cd client
npm start
```

> You can use either `npm start` or `npm run start`.
