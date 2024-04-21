import { Button, Stack, Title } from '@mantine/core'
import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowSquareOut } from '@phosphor-icons/react'
import { useTour } from '@reactour/tour'

const Sidebar = ({ name }) =>
{
	const { setCurrentStep, meta } = useTour()

	const infoLinks = [
		'Summary',
		'Overview',
		'Scores',
		'Clan Stats',
		'Mailbox',
		'World News',
	]
	const turnLinks = [
		'Favorites',
		'Explore',
		'Build',
		'Farm',
		'Cash',
		'Industry',
		'Meditate',
		'Magic Center',
		'Heal',
	]
	const financeLinks = [
		'Black Market',
		'Public Market',
		'The Bank',
		'Lottery',
	]
	const foreignLinks = [
		'Clans',
		'War Council',
		'Intel Center',
		'Foreign Aid',
	]
	const statsLinks = [
		'Achievements',
		'Charts',
	]
	const managementLinks = [
		'Empire Settings',
	]

	const location = useLocation()
	// console.log(location.pathname.split('/app/')[1])
	let locationString = location.pathname.split('/app')[1]
	// remove the first character if it is a '/'
	if (locationString[0] === '/') {
		locationString = locationString.slice(1)
	}
	// console.log(locationString.split('%').length > 1)

	const setTutorialClassnames = (link) =>
	{
		if (link === 'Explore') {
			return 'first-step gremlin1 dwarf1 elf1 drow1 ghoul1 gnome1 pixie1 minotaur1 goblin1 orc1 hobbit1 vampire1'
		}
		if (link === 'Build') {
			return 'third-step gremlin3 dwarf3 elf3 drow3 ghoul3 gnome3 pixie3 minotaur3 goblin3 orc3 hobbit3 vampire3'
		}
		if (link === 'Farm') {
			return 'gremlin5 hobbit5'
		}
		if (link === 'Magic Center') {
			return 'gremlin11 dwarf11 elf7 gremlin11 drow7 ghoul11 gnome11 pixie7 minotaur11 goblin11 orc11 hobbit11 vampire11 '
		}
		if (link === 'Industry') {
			return 'dwarf5 orc5 goblin5'
		}
		if (link === 'Meditate') {
			return 'drow5 elf5 pixie5'
		}
		if (link === 'Cash') {
			return 'gnome5 minotaur5 vampire5'
		}
		if (link === 'Public Market') {
			return 'gremlin7 dwarf7 ghoul7 goblin7 orc7 hobbit7'
		}

		if (link === 'The Bank') {
			return 'gnome7 minotaur7 vampire7'
		}

		if (link === 'Black Market') {
			// return "gnome8 minotaur8"; // vampire8
		}

	}

	return (
		<Fragment>
			<Stack spacing='xs' sx={{ marginBottom: '1rem', marginRight: '0.5rem', marginTop: '0.5rem' }}>
				<Button radius={0} component={Link} to='/select'><Title order={3} align='center'
					color='white' w={'100%'}>{name}</Title>
				</Button>
				<Title order={4}>Information</Title>
				{infoLinks.map((link) =>
				{
					let variant = 'subtle'
					if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
						variant = 'filled'
					} else if (locationString === link) {
						variant = 'filled'
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${link}`}
							variant={variant}
							key={link}
						>
							{link}
						</Button>)
				})}
				<Button component='a' compact href='https://discord.gg/bnuVy2pdgM' target='_blank' variant='subtle' rightIcon={<ArrowSquareOut />}>Discord</Button>
				<Button component={Link} compact to='/app/Tips' variant='subtle'>Game Tips</Button>
				<Title order={4}>Use Turns</Title>
				{turnLinks.map((link) =>
				{
					let variant = 'subtle'
					if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
						variant = 'filled'
					} else if (locationString === link) {
						variant = 'filled'
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${link}`}
							variant={variant}
							fullWidth
							key={link}
							className={setTutorialClassnames(link)}
							onClick={() =>
							{
								if (meta && meta !== 'attacking tour' && meta !== 'build tour') {
									console.log(meta);
									if (link === "Explore" && meta !== "new player tour") {
										setCurrentStep(2);
									} else if (link === "Explore") {
										setCurrentStep(1);
									}

									if (link === "Build") {
										setCurrentStep(4);
									}

									if (
										link === "Farm" &&
										(meta === "Gremlin tutorial" || meta === "Hobbit tutorial")
									) {
										// console.log("farm tutorial");
										setCurrentStep(6);
									}

									if (
										link === "Cash" &&
										(meta === "Gnome tutorial" ||
											meta === "Minotaur tutorial" ||
											meta === "Vampire tutorial")
									) {
										setCurrentStep(6);
									}

									if (link === 'Industry' && (meta === 'Dwarf tutorial' || meta === 'Orc tutorial' || meta === 'Goblin tutorial')) {
										setCurrentStep(6)
									}

									if (link === 'Meditate' && (meta === 'Elf tutorial' || meta === 'Drow tutorial' || meta === 'Pixie tutorial')) {
										setCurrentStep(6)
									}

									if (link === "Magic Center" && meta.includes("tutorial") && !meta.includes("Elf") && !meta.includes("Drow") && !meta.includes("Pixie")) {
										setCurrentStep(12);
									}

									if (
										link === "Magic Center" &&
										(meta === "Elf tutorial" ||
											meta === "Drow tutorial" ||
											meta === "Pixie tutorial")
									) {
										setCurrentStep(8);
									}
								}
							}}
						>
							{link}
						</Button>
					)
				})}
				<Title order={4}>Finance</Title>
				{financeLinks.map((link) =>
				{
					let variant = 'subtle'
					if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
						variant = 'filled'
					} else if (locationString === link) {
						variant = 'filled'
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${link}`}
							variant={variant}
							fullWidth
							key={link}
							className={setTutorialClassnames(link)}
							onClick={() =>
							{
								console.log(meta)
								if (meta) {
									if (link === "Public Market" && meta !== "new player tour") {
										setCurrentStep(8);
									}

									if (
										link === "Public Market" &&
										(meta.includes("Gnome") ||
											meta.includes("Minotaur") ||
											meta.includes("Vampire"))
									) {
										setCurrentStep(10);
									}

									if (link === "The Bank" && meta !== "new player tour") {
										setCurrentStep(8);
									}

									if (link === "Black Market" && meta !== "new player tour") {
										setCurrentStep(9);
									}
								}
							}}
						>
							{link}
						</Button>
					)
				})}
				<Title order={4}>Diplomacy</Title>
				{foreignLinks.map((link) =>
				{
					let variant = 'subtle'
					if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
						variant = 'filled'
					} else if (locationString === link) {
						variant = 'filled'
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${link}`}
							variant={variant}
							fullWidth
							key={link}
						>
							{link}
						</Button>
					)
				})}
				<Title order={4}>Additional Stats</Title>
				{statsLinks.map((link) =>
				{
					let variant = 'subtle'
					if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
						variant = 'filled'
					} else if (locationString === link) {
						variant = 'filled'
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${link}`}
							variant={variant}
							fullWidth
							key={link}
						>
							{link}
						</Button>
					)
				})}
				<Title order={4}>Settings</Title>
				{managementLinks.map((link) =>
				{
					let variant = 'subtle'
					if (locationString.split('%').length > 1 && locationString.split('%')[0] === link.split(' ')[0]) {
						variant = 'filled'
					} else if (locationString === link) {
						variant = 'filled'
					}
					return (
						<Button
							component={Link}
							compact
							to={`/app/${link}`}
							variant={variant}
							fullWidth
							key={link}
						>
							{link}
						</Button>
					)
				})}
				<Button
					component={'a'}
					compact
					href='https://www.buymeacoffee.com/blakemorgan'
					fullWidth
					variant='subtle'
					target='_blank'
					rightIcon={<ArrowSquareOut />}
				>Donate</Button>
			</Stack>
		</Fragment>
	)
}

export default Sidebar
