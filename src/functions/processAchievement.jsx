import { Scales, Sword, Shield, MagicWand, Coins, AirplaneTilt, Boat, UsersThree, ForkKnife, Skull, Grains, Mountains, MapTrifold, CreditCard, Trophy, Factory, Hammer, GitBranch, MedalMilitary, UsersFour, ShieldChevron } from "@phosphor-icons/react"
import { Text } from '@mantine/core'

import { achievements } from "../config/achievements"

export const processAchievement = (achievement) =>
{
	// set achievement message and icon based on name provided to function
	// console.log(achievement)
	const root = achievement.slice(0, -1)
	const level = achievement.slice(-1)
	// income
	if (root === 'income') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Money Maker 1</Text>
					<Text size='sm' color="dimmed">Total Income of ${achievements[0].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <Coins />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Money Maker 2</Text>
					<Text size='sm' color="dimmed">Total Income of ${achievements[0].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <Coins />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Money Maker 3</Text>
					<Text size='sm' color="dimmed">Total Income of ${achievements[0].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <Coins />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Money Maker 4</Text>
					<Text size='sm' color="dimmed">Total Income of ${achievements[0].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <Coins />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Money Maker 5</Text>
					<Text size='sm' color="dimmed">Total Income of ${achievements[0].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <Coins />,
			}
		}
	}

	// indy production
	else if (root === 'indyProd') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Industrialist 1</Text>
					<Text size='sm' color="dimmed">Total Industrial Output of ${achievements[1].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <Factory />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Industrialist 2</Text>
					<Text size='sm' color="dimmed">Total Industrial Output of ${achievements[1].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <Factory />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Industrialist 3</Text>
					<Text size='sm' color="dimmed">Total Industrial Output of ${achievements[1].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <Factory />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Industrialist 4</Text>
					<Text size='sm' color="dimmed">Total Industrial Output of ${achievements[1].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <Factory />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Industrialist 5</Text>
					<Text size='sm' color="dimmed">Total Industrial Output of ${achievements[1].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <Factory />,
			}
		}
	}

	// magic production
	else if (root === 'magicProd') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Alchemy 1</Text>
					<Text size='sm' color="dimmed">Total Magical Output of ${achievements[2].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <MagicWand />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Alchemy 2</Text>
					<Text size='sm' color="dimmed">Total Magical Output of ${achievements[2].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <MagicWand />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Alchemy 3</Text>
					<Text size='sm' color="dimmed">Total Magical Output of ${achievements[2].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <MagicWand />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Alchemy 4</Text>
					<Text size='sm' color="dimmed">Total Magical Output of ${achievements[2].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <MagicWand />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Alchemy 5</Text>
					<Text size='sm' color="dimmed">Total Magical Output of ${achievements[2].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <MagicWand />,
			}
		}
	}

	// expenses
	else if (root === 'expenses') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Big Spender 1</Text>
					<Text size='sm' color="dimmed">Total Expenses of ${achievements[3].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <CreditCard />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Big Spender 2</Text>
					<Text size='sm' color="dimmed">Total Expenses of ${achievements[3].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <CreditCard />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Big Spender 3</Text>
					<Text size='sm' color="dimmed">Total Expenses of ${achievements[3].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <CreditCard />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Big Spender 4</Text>
					<Text size='sm' color="dimmed">Total Expenses of ${achievements[3].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <CreditCard />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Big Spender 5</Text>
					<Text size='sm' color="dimmed">Total Expenses of ${achievements[3].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <CreditCard />,
			}
		}
	}

	// food consumption
	else if (root === 'foodcon') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Foodie 1</Text>
					<Text size='sm' color="dimmed">Total Food Consumption of {achievements[4].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <ForkKnife />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Foodie 2</Text>
					<Text size='sm' color="dimmed">Total Food Consumption of {achievements[4].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <ForkKnife />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Foodie 3</Text>
					<Text size='sm' color="dimmed">Total Food Consumption of {achievements[4].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <ForkKnife />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Foodie 4</Text>
					<Text size='sm' color="dimmed">Total Food Consumption of {achievements[4].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <ForkKnife />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Foodie 5</Text>
					<Text size='sm' color="dimmed">Total Food Consumption of {achievements[4].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <ForkKnife />,
			}
		}
	}

	// food production
	else if (root === 'food') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Farmer 1</Text>
					<Text size='sm' color="dimmed">Total Food Production of {achievements[5].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <Grains />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Farmer 2</Text>
					<Text size='sm' color="dimmed">Total Food Production of {achievements[5].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <Grains />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Farmer 3</Text>
					<Text size='sm' color="dimmed">Total Food Production of {achievements[5].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <Grains />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Farmer 4</Text>
					<Text size='sm' color="dimmed">Total Food Production of {achievements[5].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <Grains />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Farmer 5</Text>
					<Text size='sm' color="dimmed">Total Food Production of {achievements[5].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <Grains />,
			}
		}
	}

	// explore
	else if (root === 'exploreGains') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Explorer 1</Text>
					<Text size='sm' color="dimmed">Total Exploration Gains of {achievements[6].thresholds[4].toLocaleString()} land</Text>
				</div>,
				icon: <Mountains />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Explorer 2</Text>
					<Text size='sm' color="dimmed">Total Exploration Gains of {achievements[6].thresholds[3].toLocaleString()} land</Text>
				</div>,
				icon: <Mountains />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Explorer 3</Text>
					<Text size='sm' color="dimmed">Total Exploration Gains of {achievements[6].thresholds[2].toLocaleString()} land</Text>
				</div>,
				icon: <Mountains />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Explorer 4</Text>
					<Text size='sm' color="dimmed">Total Exploration Gains of {achievements[6].thresholds[1].toLocaleString()} land</Text>
				</div>,
				icon: <Mountains />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Explorer 5</Text>
					<Text size='sm' color="dimmed">Total Exploration Gains of {achievements[6].thresholds[0].toLocaleString()} land</Text>
				</div>,
				icon: <Mountains />,
			}
		}
	}

	// land
	else if (root === 'land') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Expansionist 1</Text>
					<Text size='sm' color="dimmed">Total Land of {achievements[7].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <MapTrifold />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Expansionist 2</Text>
					<Text size='sm' color="dimmed">Total Land of {achievements[7].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <MapTrifold />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Expansionist 3</Text>
					<Text size='sm' color="dimmed">Total Land of {achievements[7].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <MapTrifold />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Expansionist 4</Text>
					<Text size='sm' color="dimmed">Total Land of {achievements[7].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <MapTrifold />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Expansionist 5</Text>
					<Text size='sm' color="dimmed">Total Land of {achievements[7].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <MapTrifold />,
			}
		}
	}

	// net worth
	else if (root === 'networth') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Net Worth 1</Text>
					<Text size='sm' color="dimmed">Reach Net Worth of ${achievements[8].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <Scales />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Net Worth 2</Text>
					<Text size='sm' color="dimmed">Reach Net Worth of ${achievements[8].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <Scales />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Net Worth 3</Text>
					<Text size='sm' color="dimmed">Reach Net Worth of ${achievements[8].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <Scales />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Net Worth 4</Text>
					<Text size='sm' color="dimmed">Reach Net Worth of ${achievements[8].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <Scales />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Net Worth 5</Text>
					<Text size='sm' color="dimmed">Reach Net Worth of ${achievements[8].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <Scales />,
			}
		}
	}

	// peasants
	else if (root === 'peasants') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Populist 1</Text>
					<Text size='sm' color="dimmed">Total Population of {achievements[9].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <UsersThree />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Populist 2</Text>
					<Text size='sm' color="dimmed">Total Population of {achievements[9].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <UsersThree />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Populist 3</Text>
					<Text size='sm' color="dimmed">Total Population of {achievements[9].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <UsersThree />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Populist 4</Text>
					<Text size='sm' color="dimmed">Total Population of {achievements[9].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <UsersThree />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Populist 5</Text>
					<Text size='sm' color="dimmed">Total Population of {achievements[9].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <UsersThree />,
			}
		}
	}

	// guerilla
	else if (root === 'trpArm') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Guerilla Master 1</Text>
					<Text size='sm' color="dimmed">Total Guerilla Units of {achievements[10].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <Sword />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Guerilla Master 2</Text>
					<Text size='sm' color="dimmed">Total Guerilla Units of {achievements[10].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <Sword />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Guerilla Master 3</Text>
					<Text size='sm' color="dimmed">Total Guerilla Units of {achievements[10].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <Sword />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Guerilla Master 4</Text>
					<Text size='sm' color="dimmed">Total Guerilla Units of {achievements[10].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <Sword />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Guerilla Master 5</Text>
					<Text size='sm' color="dimmed">Total Guerilla Units of {achievements[10].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <Sword />,
			}
		}
	}

	// seige
	else if (root === 'trpLnd') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Siege Master 1</Text>
					<Text size='sm' color="dimmed">Total Siege Units of {achievements[11].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <ShieldChevron />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Siege Master 2</Text>
					<Text size='sm' color="dimmed">Total Siege Units of {achievements[11].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <ShieldChevron />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Siege Master 3</Text>
					<Text size='sm' color="dimmed">Total Siege Units of {achievements[11].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <ShieldChevron />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Siege Master 4</Text>
					<Text size='sm' color="dimmed">Total Siege Units of {achievements[11].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <ShieldChevron />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Siege Master 5</Text>
					<Text size='sm' color="dimmed">Total Siege Units of {achievements[11].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <ShieldChevron />,
			}
		}
	}

	// air
	else if (root === 'trpFly') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Air Master 1</Text>
					<Text size='sm' color="dimmed">Total Air Strike Units of {achievements[12].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <AirplaneTilt />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Air Master 2</Text>
					<Text size='sm' color="dimmed">Total Air Strike Units of {achievements[12].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <AirplaneTilt />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Air Master 3</Text>
					<Text size='sm' color="dimmed">Total Air Strike Units of {achievements[12].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <AirplaneTilt />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Air Master 4</Text>
					<Text size='sm' color="dimmed">Total Air Strike Units of {achievements[12].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <AirplaneTilt />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Air Master 5</Text>
					<Text size='sm' color="dimmed">Total Air Strike Units of {achievements[12].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <AirplaneTilt />,
			}
		}
	}

	// sea
	else if (root === 'trpSea') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Sea Master 1</Text>
					<Text size='sm' color="dimmed">Total Coastal Assault Units of {achievements[13].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <Boat />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Sea Master 2</Text>
					<Text size='sm' color="dimmed">Total Coastal Assault Units of {achievements[13].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <Boat />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Sea Master 3</Text>
					<Text size='sm' color="dimmed">Total Coastal Assault Units of {achievements[13].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <Boat />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Sea Master 4</Text>
					<Text size='sm' color="dimmed">Total Coastal Assault Units of {achievements[13].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <Boat />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Sea Master 5</Text>
					<Text size='sm' color="dimmed">Total Coastal Assault Units of {achievements[13].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <Boat />,
			}
		}
	}

	// wizard
	else if (root === 'trpWiz') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Magic Men 1</Text>
					<Text size='sm' color="dimmed">Total Magic Units of {achievements[14].thresholds[4].toLocaleString()}</Text>
				</div>,
				icon: <MagicWand />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Magic Men 2</Text>
					<Text size='sm' color="dimmed">Total Magic Units of {achievements[14].thresholds[3].toLocaleString()}</Text>
				</div>,
				icon: <MagicWand />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Magic Men 3</Text>
					<Text size='sm' color="dimmed">Total Magic Units of {achievements[14].thresholds[2].toLocaleString()}</Text>
				</div>,
				icon: <MagicWand />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Magic Men 4</Text>
					<Text size='sm' color="dimmed">Total Magic Units of {achievements[14].thresholds[1].toLocaleString()}</Text>
				</div>,
				icon: <MagicWand />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Magic Men 5</Text>
					<Text size='sm' color="dimmed">Total Magic Units of {achievements[14].thresholds[0].toLocaleString()}</Text>
				</div>,
				icon: <MagicWand />,
			}
		}
	}

	// attack gains
	else if (root === 'attackGains') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Conqueror 1</Text>
					<Text size='sm' color="dimmed">Total Attack Gains of {achievements[15].thresholds[4].toLocaleString()} land</Text>
				</div>,
				icon: <Skull />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Conqueror 2</Text>
					<Text size='sm' color="dimmed">Total Attack Gains of {achievements[15].thresholds[3].toLocaleString()} land</Text>
				</div>,
				icon: <Skull />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Conqueror 3</Text>
					<Text size='sm' color="dimmed">Total Attack Gains of {achievements[15].thresholds[2].toLocaleString()} land</Text>
				</div>,
				icon: <Skull />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Conqueror 4</Text>
					<Text size='sm' color="dimmed">Total Attack Gains of {achievements[15].thresholds[1].toLocaleString()} land</Text>
				</div>,
				icon: <Skull />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Conqueror 5</Text>
					<Text size='sm' color="dimmed">Total Attack Gains of {achievements[15].thresholds[0].toLocaleString()} land</Text>
				</div>,
				icon: <Skull />,
			}
		}
	}

	// turns used
	else if (root === 'turns') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Into The World</Text>
					<Text size='sm' color="dimmed">Exited New Player Protection</Text>
				</div>,
				icon: <GitBranch />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Sticking With It</Text>
					<Text size='sm' color="dimmed">Used 1,000 Turns</Text>
				</div>,
				icon: <GitBranch />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Committed</Text>
					<Text size='sm' color="dimmed">Used 2,600 Turns</Text>
				</div>,
				icon: <GitBranch />,
			}
		}
	}

	// offensive success
	else if (root === 'attacks') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Tactical Edge 1</Text>
					<Text size='sm' color="dimmed">{achievements[17].thresholds[4].toLocaleString()} Successful Attacks</Text>
				</div>,
				icon: <MedalMilitary />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Tactical Edge 2</Text>
					<Text size='sm' color="dimmed">{achievements[17].thresholds[3].toLocaleString()} Successful Attacks</Text>
				</div>,
				icon: <MedalMilitary />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Tactical Edge 3</Text>
					<Text size='sm' color="dimmed">{achievements[17].thresholds[2].toLocaleString()} Successful Attacks</Text>
				</div>,
				icon: <MedalMilitary />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Tactical Edge 4</Text>
					<Text size='sm' color="dimmed">{achievements[17].thresholds[1].toLocaleString()} Successful Attacks</Text>
				</div>,
				icon: <MedalMilitary />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Tactical Edge 5</Text>
					<Text size='sm' color="dimmed">{achievements[17].thresholds[0].toLocaleString()} Successful Attacks</Text>
				</div>,
				icon: <MedalMilitary />,
			}
		}
	}

	// defensive success
	else if (root === 'defends') {
		if (level === '0') {
			return {
				message: <div>
					<Text>Iron Wall 1</Text>
					<Text size='sm' color="dimmed">{achievements[18].thresholds[4].toLocaleString()} Successful Defenses</Text>
				</div>,
				icon: <Shield />,
			}
		} else if (level === '1') {
			return {
				message: <div>
					<Text>Iron Wall 2</Text>
					<Text size='sm' color="dimmed">{achievements[18].thresholds[3].toLocaleString()} Successful Defenses</Text>
				</div>,
				icon: <Shield />,
			}
		} else if (level === '2') {
			return {
				message: <div>
					<Text>Iron Wall 3</Text>
					<Text size='sm' color="dimmed">{achievements[18].thresholds[2].toLocaleString()} Successful Defenses</Text>
				</div>,
				icon: <Shield />,
			}
		} else if (level === '3') {
			return {
				message: <div>
					<Text>Iron Wall 4</Text>
					<Text size='sm' color="dimmed">{achievements[18].thresholds[1].toLocaleString()} Successful Defenses</Text>
				</div>,
				icon: <Shield />,
			}
		} else if (level === '4') {
			return {
				message: <div>
					<Text>Iron Wall 5</Text>
					<Text size='sm' color="dimmed">{achievements[18].thresholds[0].toLocaleString()} Successful Defenses</Text>
				</div>,
				icon: <Shield />,
			}
		}
	}

	// rank
	else if (root === 'rank') {
		if (level === '1') {
			return {
				message: <div>
					<Text>Top of the World</Text>
					<Text size='sm' color="dimmed">Take the number 1 rank</Text>
				</div>,
				icon: <Trophy />,
			}
		}
	}

	// build
	else if (root === 'buil') {
		if (level === 'd') {
			return {
				message: <div>
					<Text>Fully Built</Text>
					<Text size='sm' color="dimmed">Build on all available land</Text>
				</div>,
				icon: <Hammer />,
			}
		}
	}

	// clan
	else if (root === 'joinCla') {
		if (level === 'n') {
			return {
				message: <div>
					<Text>Join a Clan</Text>
					<Text size='sm' color="dimmed">Join or create a clan</Text>
				</div>,
				icon: <UsersFour />,
			}
		}
	}

	return {
		message: root + ' ' + level,
		icon: null,
	}

}
