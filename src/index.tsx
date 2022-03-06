import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'

import { persistor, store } from './store/store'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Farm from './components/useTurns/farm'
import Cash from './components/useTurns/cash'
import Explore from './components/useTurns/explore'
import Industry from './components/useTurns/industry'
import Build from './components/useTurns/build'
import Meditate from './components/useTurns/meditate'
import Summary from './components/summary'
import Overview from './components/overview'
import PrivateMarket from './components/markets/PrivateMarket'

import Home from './components/pages/Home'

import Axios from 'axios'
import CreateEmpire from './components/pages/CreateEmpire'
import { PersistGate } from 'redux-persist/integration/react'
import WorldBank from './components/markets/WorldBank'
import MagicCenter from './components/useTurns/magiccenter'

Axios.defaults.baseURL = 'http://localhost:5001/api'
Axios.defaults.withCredentials = true

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/createEmpire' element={<CreateEmpire />} />
					<Route path='/app' element={<App />}>
						<Route path='summary' element={<Summary />} />
						<Route path='overview' element={<Overview />} />
						<Route path='farm' element={<Farm />} />
						<Route path='cash' element={<Cash />} />
						<Route path='explore' element={<Explore />} />
						<Route path='meditate' element={<Meditate />} />
						<Route path='industry' element={<Industry />} />
						<Route path='build' element={<Build />} />
						<Route path='Black%20Market' element={<PrivateMarket />} />
						<Route path='World%20Bank' element={<WorldBank />} />
						<Route path='Magic%20Center' element={<MagicCenter />} />
					</Route>
				</Routes>
				</BrowserRouter>
				</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
