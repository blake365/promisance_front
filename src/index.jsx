import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import reportWebVitals from './reportWebVitals'
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
import ManageEmpire from './components/manageEmpire'
import PrivateMarket from './components/markets/PrivateMarket'
import PublicMarket from './components/markets/publicMarket'
import WorldBank from './components/markets/WorldBank'
import MagicCenter from './components/useTurns/magiccenter'
import Scores from './components/scores'
import Demolish from './components/useTurns/demolish'
import Attack from './components/diplomacy/attack'
import Heal from './components/useTurns/heal'

import Home from './components/pages/Home'

import Axios from 'axios'
import CreateEmpire from './components/pages/CreateEmpire'
import { PersistGate } from 'redux-persist/integration/react'
import Favorites from './components/useTurns/favorites'

// import Guide from './components/guide/guide'

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
						<Route path='/app/' element={<App />}>
							{/* <Route path='guide' element={<Guide />} /> */}
							<Route path='' element={<Scores />} />
							<Route path='summary' element={<Summary />} />
							<Route path='overview' element={<Overview />} />
							<Route path='scores' element={<Scores />} />
							<Route path='favorites' element={<Favorites />} />
							<Route path='farm' element={<Farm />} />
							<Route path='cash' element={<Cash />} />
							<Route path='explore' element={<Explore />} />
							<Route path='meditate' element={<Meditate />} />
							<Route path='industry' element={<Industry />} />
							<Route path='build' element={<Build />} />
							<Route path='demolish' element={<Demolish />} />
							<Route path='Heal' element={<Heal />} />
							<Route path='Black%20Market' element={<PrivateMarket />} />
							<Route path='Public%20Market' element={<PublicMarket />} />
							<Route path='World%20Bank' element={<WorldBank />} />
							<Route path='Magic%20Center' element={<MagicCenter />} />
							<Route path='Manage%20Empire' element={<ManageEmpire />} />
							<Route path='War%20Council' element={<Attack />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
