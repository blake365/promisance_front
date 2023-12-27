import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'

import { Loader } from '@mantine/core'

import
{
	BrowserRouter, Routes, Route,
} from 'react-router-dom'

const App = lazy(() => import('./App'))

import Summary from './components/summary'
const Overview = lazy(() => import('./components/overview'));
const Farm = lazy(() => import('./components/useTurns/farm'));
const Cash = lazy(() => import('./components/useTurns/cash'));
const Explore = lazy(() => import('./components/useTurns/explore'));
const Industry = lazy(() => import('./components/useTurns/industry'));
const Build = lazy(() => import('./components/useTurns/build'));
const Meditate = lazy(() => import('./components/useTurns/meditate'));
const ManageEmpire = lazy(() => import('./components/manageEmpire'));
const PrivateMarket = lazy(() => import('./components/markets/PrivateMarket'));
const PublicMarket = lazy(() => import('./components/markets/publicMarket'));
const WorldBank = lazy(() => import('./components/markets/WorldBank'));
const MagicCenter = lazy(() => import('./components/useTurns/magiccenter'));
const Scores = lazy(() => import('./components/scores'));
const Demolish = lazy(() => import('./components/useTurns/demolish'));
const Attack = lazy(() => import('./components/diplomacy/attack'));
const Heal = lazy(() => import('./components/useTurns/heal'));
const Mailbox = lazy(() => import('./components/mail/mailbox'));
const ForeignAid = lazy(() => import('./components/diplomacy/foreignAid'));
const Lottery = lazy(() => import('./components/markets/Lottery'));
const ClanPage = lazy(() => import('./components/diplomacy/clans/clanPage'));
const ClanStats = lazy(() => import('./components/diplomacy/clans/clanStats'));
const Favorites = lazy(() => import('./components/useTurns/favorites'));
const WorldNews = lazy(() => import('./components/news/worldNews'));
const IntelCenter = lazy(() => import('./components/diplomacy/intelCenter'));

import Home from './components/pages/Home'
import NewLogin from './components/pages/NewLogin'
import Signup from './components/layout/Signup'
import CreateEmpire from './components/pages/CreateEmpire'
import { NothingFoundBackground } from './components/pages/404'
import CreateDemoEmpire from './components/pages/CreateDemoEmpire'
import Archive from './components/pages/Archive'
import RoundArchive from './components/pages/RoundArchive'
import PrivacyPolicy from './components/pages/PrivacyPolicy'
import Disabled from './components/pages/disabled'
import GameRules from './components/pages/Rules'

const Admin = lazy(() => import('./components/pages/admin'));
const AdminSummary = lazy(() => import('./components/admin/adminSummary'));
const AdminUsers = lazy(() => import('./components/admin/adminUsers'));
const AdminEmpires = lazy(() => import('./components/admin/adminEmpires'));
const AdminMail = lazy(() => import('./components/admin/adminMail'));
const AdminMarket = lazy(() => import('./components/admin/adminMarket'));
const AdminNews = lazy(() => import('./components/admin/adminNews'));

import Axios from 'axios'
import { PersistGate } from 'redux-persist/integration/react'
import { inject } from '@vercel/analytics';

import { TourProvider } from '@reactour/tour'
import { steps } from './tour/steps'

inject();
// import Guide from './components/guide/guide'

if (import.meta.env.PROD) {
	Axios.defaults.baseURL = 'https://api.neopromisance.com/api'
} else {
	Axios.defaults.baseURL = 'http://localhost:5001/api'
}

// console.log(import.meta.env.PROD)
Axios.defaults.withCredentials = true


ReactDOM.render(
	<React.StrictMode>
		<TourProvider steps={steps} showCloseButton={true} styles={{
			popover: (base) => ({
				...base,
				'--reactour-accent': '#40c057',
				borderRadius: '10px',
				color: 'black',
				marginLeft: '8px',
				boxShadow: '0 0 3em rgba(0, 0, 0, 0.5)',
			}),
			button: (base) => ({
				...base,
				color: 'black',
			}),
		}}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='*' element={<NothingFoundBackground />} />
							<Route path='/login' element={<NewLogin />} />
							<Route path='/register' element={<Signup />} />
							<Route path='/create' element={<CreateEmpire />} />
							<Route path='/demo' element={<CreateDemoEmpire />} />
							<Route path='/privacy' element={<PrivacyPolicy />} />
							<Route path='/rules' element={<GameRules />} />
							<Route path='/archive' element={<Archive />} />
							<Route path='/archive/:roundId' element={<RoundArchive />} />
							<Route path='/admin/' element={<Suspense fallback={<Loader size='xl' />}><Admin /></Suspense>} >
								<Route path='*' element={<Suspense fallback={<Loader size='xl' />}><NothingFoundBackground /></Suspense>} />
								<Route path='' element={<Suspense fallback={<Loader size='xl' />}><AdminSummary /></Suspense>} />
								<Route path='Summary' element={<Suspense fallback={<Loader size='xl' />}><AdminSummary /></Suspense>} />
								<Route path='Users' element={<Suspense fallback={<Loader size='xl' />}><AdminUsers /></Suspense>} />
								<Route path='Empires' element={<Suspense fallback={<Loader size='xl' />}><AdminEmpires /></Suspense>} />
								<Route path='Mail' element={<Suspense fallback={<Loader size='xl' />}><AdminMail /></Suspense>} />
								<Route path='Market' element={<Suspense fallback={<Loader size='xl' />}><AdminMarket /></Suspense>} />
								<Route path='News' element={<Suspense fallback={<Loader size='xl' />}><AdminNews /></Suspense>} />
							</Route>

							<Route path='/app/' element={<Suspense fallback={<Loader size='xl' />}><App /></Suspense>}>
								<Route path='*' element={<NothingFoundBackground />} />
								{/* <Route path='guide' element={<Guide />} /> */}
								<Route path='' element={<Summary />} />
								<Route path='summary' element={<Summary />} />
								<Route path='overview' element={<Suspense fallback={<Loader size='xl' />}><Overview /></Suspense>} />
								<Route path='scores' element={<Suspense fallback={<Loader size='xl' />}><Scores /></Suspense>} />
								<Route path='favorites' element={<Suspense fallback={<Loader size='xl' />}><Favorites /></Suspense>} />
								<Route path='farm' element={<Suspense fallback={<Loader size='xl' />}><Farm /></Suspense>} />
								<Route path='cash' element={<Suspense fallback={<Loader size='xl' />}><Cash /></Suspense>} />
								<Route path='explore' element={<Suspense fallback={<Loader size='xl' />}><Explore /></Suspense>} />
								<Route path='meditate' element={<Suspense fallback={<Loader size='xl' />}><Meditate /></Suspense>} />
								<Route path='industry' element={<Suspense fallback={<Loader size='xl' />}><Industry /></Suspense>} />
								<Route path='build' element={<Suspense fallback={<Loader size='xl' />}><Build /></Suspense>} />
								<Route path='demolish' element={<Suspense fallback={<Loader size='xl' />}><Demolish /></Suspense>} />
								<Route path='Heal' element={<Suspense fallback={<Loader size='xl' />}><Heal /></Suspense>} />
								<Route path='Black%20Market' element={<Suspense fallback={<Loader size='xl' />}><PrivateMarket /></Suspense>} />
								<Route path='Public%20Market' element={<Suspense fallback={<Loader size='xl' />}><PublicMarket /></Suspense>} />
								<Route path='The%20Bank' element={<Suspense fallback={<Loader size='xl' />}><WorldBank /></Suspense>} />
								<Route path='Magic%20Center' element={<Suspense fallback={<Loader size='xl' />}><MagicCenter /></Suspense>} />
								<Route path='Empire%20Settings' element={<Suspense fallback={<Loader size='xl' />}><ManageEmpire /></Suspense>} />
								<Route path='War%20Council' element={<Suspense fallback={<Loader size='xl' />}><Attack /></Suspense>} />
								<Route path='Intel%20Center' element={<Suspense fallback={<Loader size='xl' />}><IntelCenter /></Suspense>} />
								<Route path='World%20News' element={<Suspense fallback={<Loader size='xl' />}><WorldNews /></Suspense>} />
								<Route path='Mailbox' element={<Suspense fallback={<Loader size='xl' />}><Mailbox /></Suspense>} />
								<Route path='Foreign%20Aid' element={<Suspense fallback={<Loader size='xl' />}><ForeignAid /></Suspense>} />
								<Route path='Clans' element={<Suspense fallback={<Loader size='xl' />}><ClanPage /></Suspense>} />
								<Route path='Clan%20Stats' element={<Suspense fallback={<Loader size='xl' />}><ClanStats /></Suspense>} />
								<Route path='disabled' element={<Suspense fallback={<Loader size='xl' />}><Disabled /></Suspense>} />
								<Route path='Lottery' element={<Suspense fallback={<Loader size='xl' />}><Lottery /></Suspense>} />
							</Route>
						</Routes>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</TourProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
