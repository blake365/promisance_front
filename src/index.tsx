import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'

import { store } from './store/store'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Farm from './components/useTurns/farm'
import Cash from './components/useTurns/cash'
import Explore from './components/useTurns/explore'
import Industry from './components/useTurns/industry'
import Build from './components/useTurns/build'
import Meditate from './components/useTurns/meditate'
import Summary from './components/summary'
import Login from './components/Login'
import Signup from './components/Signup'

import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:5001/api'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />}>
						<Route path='' element={<Login />} />
						<Route path='login' element={<Login />} />
						<Route path='signup' element={<Signup />} />
						<Route path='summary' element={<Summary />} />
						<Route path='farm' element={<Farm />} />
						<Route path='cash' element={<Cash />} />
						<Route path='explore' element={<Explore />} />
						<Route path='meditate' element={<Meditate />} />
						<Route path='industry' element={<Industry />} />
						<Route path='build' element={<Build />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
