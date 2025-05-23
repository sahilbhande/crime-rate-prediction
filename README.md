# 🚔 Crime Rate Prediction (Simulated Data)

This project is a **Crime Rate Prediction system** built using **Vite + React**. While it does not use machine learning or real-world datasets, it generates random data that appears to reflect realistic crime patterns. This approach is useful for prototyping interfaces, simulating analytics, or preparing for full data integration in the future.

---

## 🔍 Features

- 📊 Randomized crime rate predictions for cities or regions
- 🗺️ Clean and responsive React-based user interface
- 🔁 Realistic-looking data generation using JavaScript
- ⚡ Built with Vite for fast development and build times

---
## Project Structure
- `src/` - Frontend React application
- `backend/` - Python Flask backend
- `public/` - Static assets

## Setup Instructions

### Frontend Setup
1. Install Node.js dependencies:
```bash
npm install
```

2. Start the frontend development server:
```bash
npm run dev
```

### Backend Setup
1. Create a Python virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
.\venv\Scripts\activate
```
- Unix/MacOS:
```bash
source venv/bin/activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
python backend/app.py
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### POST /api/predict
Make predictions using the trained model.

### POST /api/train
Train the model with new data.

## Development
- Frontend runs on port 5173
- Backend runs on port 5000
- CORS is enabled to allow communication between frontend and backend #   c r i m e - r a t e - p r e d i c t i o n 
 
 #   c r i m e - r a t e - p r e d i c t i o n 
 
 