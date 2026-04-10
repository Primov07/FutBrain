import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/style.css'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
			<ToastContainer />
		</BrowserRouter>
	</React.StrictMode>,
);
