import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import "./i18n"
import "./index.css"
import { Provider } from "react-redux"
import { persistor, store } from "./store/store"
import lazy from "./components/utilities/lazyWrapper"
import { Loader, Center } from "@mantine/core"
import * as Sentry from "@sentry/react"
import {
	BrowserRouter,
	Routes,
	Route,
	useLocation,
	useNavigationType,
	createRoutesFromChildren,
	matchRoutes,
} from "react-router-dom"

const App = lazy(() => import("./App"))
// import App from './App'

const Summary = lazy(() => import("./components/summary"))
// import Summary from './components/summary'
import Explore from "./components/useTurns/explore"
import Build from "./components/useTurns/build"
const Overview = lazy(() => import("./components/overview"))
// const Farm = lazy(() => import('./components/useTurns/farm'));
import Farm from "./components/useTurns/farm"
// const Cash = lazy(() => import('./components/useTurns/cash'));
import Cash from "./components/useTurns/cash"
// const Explore = lazy(() => import('./components/useTurns/explore'));
// const Industry = lazy(() => import('./components/useTurns/industry'));
import Industry from "./components/useTurns/industry"
// const Build = lazy(() => import('./components/useTurns/build'));
// const Meditate = lazy(() => import('./components/useTurns/meditate'));
import Meditate from "./components/useTurns/meditate"
const ManageEmpire = lazy(() => import("./components/manageEmpire"))
// import ManageEmpire from './components/manageEmpire'
// const PrivateMarket = lazy(() => import('./components/markets/PrivateMarket'));
import PrivateMarket from "./components/markets/PrivateMarket"
import PublicMarket from "./components/markets/publicMarket"
// const PublicMarket = lazy(() => import('./components/markets/publicMarket'));
import WorldBank from "./components/markets/WorldBank"
// const WorldBank = lazy(() => import('./components/markets/WorldBank'));
// const MagicCenter = lazy(() => import('./components/useTurns/magiccenter'));
import MagicCenter from "./components/useTurns/magiccenter"
const Scores = lazy(() => import("./components/scores"))
const Demolish = lazy(() => import("./components/useTurns/demolish"))
const Attack = lazy(() => import("./components/diplomacy/attack"))
const Heal = lazy(() => import("./components/useTurns/heal"))
const Mailbox = lazy(() => import("./components/mail/mailbox"))
const ForeignAid = lazy(() => import("./components/diplomacy/foreignAid"))
const Lottery = lazy(() => import("./components/markets/Lottery"))
const ClanPage = lazy(() => import("./components/diplomacy/clans/clanPage"))
const ClanStats = lazy(() => import("./components/diplomacy/clans/clanStats"))
const Favorites = lazy(() => import("./components/useTurns/favorites"))
// import Favorites from './components/useTurns/favorites'
const WorldNews = lazy(() => import("./components/news/worldNews"))
const IntelCenter = lazy(() => import("./components/diplomacy/intelCenter"))
const Achievements = lazy(
	() => import("./components/achievements/achievements"),
)
const AdvancedStats = lazy(() => import("./components/stats/advanced"))

import Home from "./components/pages/Home"
import NewLogin from "./components/pages/NewLogin"
import Signup from "./components/pages/Signup"
import CreateEmpire from "./components/pages/CreateEmpire"
import { NothingFoundBackground } from "./components/pages/404"
import CreateDemoEmpire from "./components/pages/CreateDemoEmpire"
const Archive = lazy(() => import("./components/pages/Archive"))
const RoundArchive = lazy(() => import("./components/pages/RoundArchive"))
import PrivacyPolicy from "./components/pages/PrivacyPolicy"
import Disabled from "./components/pages/disabled"
import GameRules from "./components/pages/Rules"
import LinkLogin from "./components/pages/LinkLogin"
const Admin = lazy(() => import("./components/pages/admin"))
const AdminSummary = lazy(() => import("./components/admin/adminSummary"))
const AdminUsers = lazy(() => import("./components/admin/adminUsers"))
const AdminEmpires = lazy(() => import("./components/admin/adminEmpires"))
const AdminMail = lazy(() => import("./components/admin/adminMail"))
const AdminMarket = lazy(() => import("./components/admin/adminMarket"))
const AdminNews = lazy(() => import("./components/admin/adminNews"))
const AdminClanMail = lazy(() => import("./components/admin/adminClanMail"))
const CreateGame = lazy(() => import("./components/admin/createGame"))
const EditGame = lazy(() => import("./components/admin/editGame"))
const GamesManager = lazy(() => import("./components/admin/GamesManager"))
// import GamesManager from './components/admin/GamesManager'

import Axios from "axios"
import { PersistGate } from "redux-persist/integration/react"
import { inject } from "@vercel/analytics"

import { TourProvider } from "@reactour/tour"
import { steps } from "./tour/steps"
import Forgot from "./components/pages/Forgot"
import Reset from "./components/pages/Reset"
import ForgotUsername from "./components/pages/ForgotUsername"
const NewPlayerTips = lazy(() => import("./components/guide/newPlayer"))
// import NewPlayerTips from './components/guide/newPlayer'
import ModeSelect from "./components/pages/ModeSelect"

inject()
// import Guide from './components/guide/guide'

if (import.meta.env.PROD) {
	Axios.defaults.baseURL = "https://api.neopromisance.com/api"
} else {
	Axios.defaults.baseURL = "http://localhost:5001/api"
}

// console.log(import.meta.env.PROD)
Axios.defaults.withCredentials = true

Sentry.init({
	dsn: "https://76ee19015c2862df287976ffc01c33db@o4505988856676352.ingest.sentry.io/4505988859559936",
	ignoreErrors: [
		"401",
		"403",
		"404",
		"500",
		"503",
		"unauthenticated",
		"Unauthorized",
	],
	integrations: [
		new Sentry.BrowserTracing({
			// See docs for support of different versions of variation of react router
			// https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
			routingInstrumentation: Sentry.reactRouterV6Instrumentation(
				React.useEffect,
				useLocation,
				useNavigationType,
				createRoutesFromChildren,
				matchRoutes,
			),
		}),
		new Sentry.Replay(),
	],
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	tracesSampleRate: 0.5,

	// Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
	tracePropagationTargets: [
		"localhost",
		"neopromisance.com",
		"api.neopromisance.com",
	],

	// Capture Replay for 10% of all sessions,
	// plus for 100% of sessions with an error
	replaysSessionSampleRate: 0,
	replaysOnErrorSampleRate: 1.0,
})

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes)

function LoadingComponent() {
	return (
		<Center>
			<Loader size="xl" />
		</Center>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<TourProvider
			steps={steps}
			showCloseButton={true}
			styles={{
				popover: (base) => ({
					...base,
					"--reactour-accent": "#40c057",
					borderRadius: "10px",
					color: "black",
					marginLeft: "8px",
					boxShadow: "0 0 3em rgba(0, 0, 0, 0.5)",
				}),
				button: (base) => ({
					...base,
					color: "black",
				}),
				maskWrapper: () => {
					return {
						display: "none",
					}
				},
			}}
		>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter>
						<SentryRoutes>
							<Route
								path="/"
								element={
									<Suspense fallback={<LoadingComponent />}>
										<Home />
									</Suspense>
								}
							/>
							<Route path="*" element={<NothingFoundBackground />} />
							<Route path="/login" element={<NewLogin />} />
							<Route path="/link-login/:auth" element={<LinkLogin />} />
							<Route path="/register" element={<Signup />} />
							<Route path="/select" element={<ModeSelect />} />
							<Route path="/forgot" element={<Forgot />} />
							<Route path="/forgot-username" element={<ForgotUsername />} />
							<Route path="/reset-password/:token" element={<Reset />} />
							<Route path="/games" element={<GamesManager />} />
							<Route path="/create" element={<CreateEmpire />} />
							<Route path="/demo" element={<CreateDemoEmpire />} />
							<Route path="/privacy" element={<PrivacyPolicy />} />
							<Route path="/rules" element={<GameRules />} />
							<Route
								path="/archive"
								element={
									<Suspense fallback={<LoadingComponent />}>
										<Archive />
									</Suspense>
								}
							/>
							<Route
								path="/archive/:roundId"
								element={
									<Suspense fallback={<LoadingComponent />}>
										<RoundArchive />
									</Suspense>
								}
							/>
							<Route
								path="/admin/"
								element={
									<Suspense fallback={<LoadingComponent />}>
										<Admin />
									</Suspense>
								}
							>
								<Route
									path="*"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<NothingFoundBackground />
										</Suspense>
									}
								/>
								<Route
									path=""
									element={
										<Suspense fallback={<LoadingComponent />}>
											<GamesManager />
										</Suspense>
									}
								/>
								<Route
									path="create"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<CreateGame />
										</Suspense>
									}
								/>
								<Route
									path="/admin/:gameId/Summary"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<AdminSummary />
										</Suspense>
									}
								/>
								<Route
									path="/admin/:gameId/Settings"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<EditGame />
										</Suspense>
									}
								/>
								<Route
									path="/admin/:gameId/Users"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<AdminUsers />
										</Suspense>
									}
								/>
								<Route
									path="/admin/:gameId/Empires"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<AdminEmpires />
										</Suspense>
									}
								/>
								<Route
									path="/admin/:gameId/Mail"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<AdminMail />
										</Suspense>
									}
								/>
								<Route
									path="/admin/:gameId/Market"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<AdminMarket />
										</Suspense>
									}
								/>
								<Route
									path="/admin/:gameId/News"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<AdminNews />
										</Suspense>
									}
								/>
								<Route
									path="/admin/:gameId/ClanMail"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<AdminClanMail />
										</Suspense>
									}
								/>
							</Route>

							<Route
								path="/app/"
								element={
									<Suspense fallback={<LoadingComponent />}>
										<App />
									</Suspense>
									// <App />
								}
							>
								<Route path="*" element={<NothingFoundBackground />} />
								{/* <Route path='guide' element={<Guide />} /> */}
								<Route path="" element={<Summary />} />
								<Route path="summary" element={<Summary />} />
								<Route
									path="overview"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Overview />
										</Suspense>
									}
								/>
								<Route
									path="scores"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Scores />
										</Suspense>
									}
								/>
								<Route
									path="favorites"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Favorites />
										</Suspense>
									}
								/>
								<Route
									path="farm"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Farm />
										</Suspense>
									}
								/>
								<Route
									path="cash"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Cash />
										</Suspense>
									}
								/>
								<Route path="explore" element={<Explore />} />
								<Route
									path="meditate"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Meditate />
										</Suspense>
									}
								/>
								<Route
									path="industry"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Industry />
										</Suspense>
									}
								/>
								<Route path="build" element={<Build />} />
								<Route
									path="demolish"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Demolish />
										</Suspense>
									}
								/>
								<Route
									path="Heal"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Heal />
										</Suspense>
									}
								/>
								<Route
									path="Black%20Market"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<PrivateMarket />
										</Suspense>
									}
								/>
								<Route
									path="Public%20Market"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<PublicMarket />
										</Suspense>
									}
								/>
								<Route
									path="The%20Bank"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<WorldBank />
										</Suspense>
									}
								/>
								<Route
									path="Magic%20Center"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<MagicCenter />
										</Suspense>
									}
								/>
								<Route
									path="Empire%20Settings"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<ManageEmpire />
										</Suspense>
									}
								/>
								<Route
									path="War%20Council"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Attack />
										</Suspense>
									}
								/>
								<Route
									path="Intel%20Center"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<IntelCenter />
										</Suspense>
									}
								/>
								<Route
									path="World%20News"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<WorldNews />
										</Suspense>
									}
								/>
								<Route
									path="Mailbox"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Mailbox />
										</Suspense>
									}
								/>
								<Route
									path="Foreign%20Aid"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<ForeignAid />
										</Suspense>
									}
								/>
								<Route
									path="Clans"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<ClanPage />
										</Suspense>
									}
								/>
								<Route
									path="Clan%20Stats"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<ClanStats />
										</Suspense>
									}
								/>
								<Route
									path="disabled"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Disabled />
										</Suspense>
									}
								/>
								<Route
									path="Lottery"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Lottery />
										</Suspense>
									}
								/>
								<Route
									path="Achievements"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<Achievements />
										</Suspense>
									}
								/>
								<Route
									path="Charts"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<AdvancedStats />
										</Suspense>
									}
								/>
								<Route
									path="Tips"
									element={
										<Suspense fallback={<LoadingComponent />}>
											<NewPlayerTips />
										</Suspense>
									}
								/>
							</Route>
						</SentryRoutes>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</TourProvider>
	</React.StrictMode>,
	document.getElementById("root"),
)
