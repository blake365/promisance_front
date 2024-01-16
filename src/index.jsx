import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'

import { Loader, Center } from '@mantine/core'

import
{
	BrowserRouter, Routes, Route,
} from 'react-router-dom'

const App = lazy(() => import('./App'))

import Summary from './components/summary'
import Explore from './components/useTurns/explore'
import Build from './components/useTurns/build'
const Overview = lazy(() => import('./components/overview'));
const Farm = lazy(() => import('./components/useTurns/farm'));
const Cash = lazy(() => import('./components/useTurns/cash'));
// const Explore = lazy(() => import('./components/useTurns/explore'));
const Industry = lazy(() => import('./components/useTurns/industry'));
// const Build = lazy(() => import('./components/useTurns/build'));
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
const Achievements = lazy(() => import('./components/achievements/achievements'))
const AdvancedStats = lazy(() => import('./components/stats/advanced'))

import Home from './components/pages/Home'
import NewLogin from './components/pages/NewLogin'
import Signup from './components/layout/Signup'
import CreateEmpire from './components/pages/CreateEmpire'
import { NothingFoundBackground } from './components/pages/404'
import CreateDemoEmpire from './components/pages/CreateDemoEmpire'
const Archive = lazy(() => import('./components/pages/Archive'));
const RoundArchive = lazy(() => import('./components/pages/RoundArchive'));
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
import Forgot from './components/pages/Forgot'
import Reset from './components/pages/Reset'
import ForgotUsername from './components/pages/ForgotUsername'
const NewPlayerTips = lazy(() => import('./components/guide/newPlayer'));

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
							<Route path='/forgot' element={<Forgot />} />
							<Route path='/forgot-username' element={<ForgotUsername />} />
							<Route path='/reset-password/:token' element={<Reset />} />
							<Route path='/create' element={<CreateEmpire />} />
							<Route path='/demo' element={<CreateDemoEmpire />} />
							<Route path='/privacy' element={<PrivacyPolicy />} />
							<Route path='/rules' element={<GameRules />} />
							<Route path='/archive' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Archive /></Suspense>} />
							<Route path='/archive/:roundId' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><RoundArchive /></Suspense>} />
							<Route path='/admin/' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Admin /></Suspense>} >
								<Route path='*' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><NothingFoundBackground /></Suspense>} />
								<Route path='' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><AdminSummary /></Suspense>} />
								<Route path='Summary' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><AdminSummary /></Suspense>} />
								<Route path='Users' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><AdminUsers /></Suspense>} />
								<Route path='Empires' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><AdminEmpires /></Suspense>} />
								<Route path='Mail' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><AdminMail /></Suspense>} />
								<Route path='Market' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><AdminMarket /></Suspense>} />
								<Route path='News' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><AdminNews /></Suspense>} />
							</Route>

							<Route path='/app/' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><App /></Suspense>}>
								<Route path='*' element={<NothingFoundBackground />} />
								{/* <Route path='guide' element={<Guide />} /> */}
								<Route path='' element={<Summary />} />
								<Route path='summary' element={<Summary />} />
								<Route path='overview' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Overview /></Suspense>} />
								<Route path='scores' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Scores /></Suspense>} />
								<Route path='favorites' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Favorites /></Suspense>} />
								<Route path='farm' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Farm /></Suspense>} />
								<Route path='cash' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Cash /></Suspense>} />
								<Route path='explore' element={<Explore />} />
								<Route path='meditate' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Meditate /></Suspense>} />
								<Route path='industry' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Industry /></Suspense>} />
								<Route path='build' element={<Build />} />
								<Route path='demolish' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Demolish /></Suspense>} />
								<Route path='Heal' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Heal /></Suspense>} />
								<Route path='Black%20Market' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><PrivateMarket /></Suspense>} />
								<Route path='Public%20Market' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><PublicMarket /></Suspense>} />
								<Route path='The%20Bank' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><WorldBank /></Suspense>} />
								<Route path='Magic%20Center' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><MagicCenter /></Suspense>} />
								<Route path='Empire%20Settings' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><ManageEmpire /></Suspense>} />
								<Route path='War%20Council' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Attack /></Suspense>} />
								<Route path='Intel%20Center' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><IntelCenter /></Suspense>} />
								<Route path='World%20News' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><WorldNews /></Suspense>} />
								<Route path='Mailbox' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Mailbox /></Suspense>} />
								<Route path='Foreign%20Aid' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><ForeignAid /></Suspense>} />
								<Route path='Clans' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><ClanPage /></Suspense>} />
								<Route path='Clan%20Stats' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><ClanStats /></Suspense>} />
								<Route path='disabled' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Disabled /></Suspense>} />
								<Route path='Lottery' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Lottery /></Suspense>} />
								<Route path='Achievements' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><Achievements /></Suspense>} />
								<Route path='Charts' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><AdvancedStats /></Suspense>} />
								<Route path='New%20Player' element={<Suspense fallback={<Center><Loader size='xl' /></Center>}><NewPlayerTips /></Suspense>} />
							</Route>
						</Routes>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</TourProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
