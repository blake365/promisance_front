import { Scales, Sword, Shield, MagicWand, Coins, AirplaneTilt, Boat, UsersThree, ForkKnife, Skull, Grains, Mountains, MapTrifold, CreditCard, Trophy, Factory, Hammer, GitBranch, MedalMilitary, UsersFour, ShieldChevron } from "@phosphor-icons/react"


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
				message: 'Money Maker 1',
				icon: <Coins />,
			}
		} else if (level === '1') {
			return {
				message: 'Money Maker 2',
				icon: <Coins />,
			}
		} else if (level === '2') {
			return {
				message: 'Money Maker 3',
				icon: <Coins />,
			}
		} else if (level === '3') {
			return {
				message: 'Money Maker 4',
				icon: <Coins />,
			}
		} else if (level === '4') {
			return {
				message: 'Money Maker 5',
				icon: <Coins />,
			}
		}
	}

	// indy production
	else if (root === 'indyProd') {
		if (level === '0') {
			return {
				message: 'Industrialist 1',
				icon: <Factory />,
			}
		} else if (level === '1') {
			return {
				message: 'Industrialist 2',
				icon: <Factory />,
			}
		} else if (level === '2') {
			return {
				message: 'Industrialist 3',
				icon: <Factory />,
			}
		} else if (level === '3') {
			return {
				message: 'Industrialist 4',
				icon: <Factory />,
			}
		} else if (level === '4') {
			return {
				message: 'Industrialist 5',
				icon: <Factory />,
			}
		}
	}

	// magic production
	else if (root === 'magicProd') {
		if (level === '0') {
			return {
				message: 'Alchemy 1',
				icon: <MagicWand />,
			}
		} else if (level === '1') {
			return {
				message: 'Alchemy 2',
				icon: <MagicWand />,
			}
		} else if (level === '2') {
			return {
				message: 'Alchemy 3',
				icon: <MagicWand />,
			}
		} else if (level === '3') {
			return {
				message: 'Alchemy 4',
				icon: <MagicWand />,
			}
		} else if (level === '4') {
			return {
				message: 'Alchemy 5',
				icon: <MagicWand />,
			}
		}
	}

	// expenses
	else if (root === 'expenses') {
		if (level === '0') {
			return {
				message: 'Big Spender 1',
				icon: <CreditCard />,
			}
		} else if (level === '1') {
			return {
				message: 'Big Spender 2',
				icon: <CreditCard />,
			}
		} else if (level === '2') {
			return {
				message: 'Big Spender 3',
				icon: <CreditCard />,
			}
		} else if (level === '3') {
			return {
				message: 'Big Spender 4',
				icon: <CreditCard />,
			}
		} else if (level === '4') {
			return {
				message: 'Big Spender 5',
				icon: <CreditCard />,
			}
		}
	}

	// food consumption
	else if (root === 'foodcon') {
		if (level === '0') {
			return {
				message: 'Foodie 1',
				icon: <ForkKnife />,
			}
		} else if (level === '1') {
			return {
				message: 'Foodie 2',
				icon: <ForkKnife />,
			}
		} else if (level === '2') {
			return {
				message: 'Foodie 3',
				icon: <ForkKnife />,
			}
		} else if (level === '3') {
			return {
				message: 'Foodie 4',
				icon: <ForkKnife />,
			}
		} else if (level === '4') {
			return {
				message: 'Foodie 5',
				icon: <ForkKnife />,
			}
		}
	}

	// food production
	else if (root === 'food') {
		if (level === '0') {
			return {
				message: 'Farmer 1',
				icon: <Grains />,
			}
		} else if (level === '1') {
			return {
				message: 'Farmer 2',
				icon: <Grains />,
			}
		} else if (level === '2') {
			return {
				message: 'Farmer 3',
				icon: <Grains />,
			}
		} else if (level === '3') {
			return {
				message: 'Farmer 4',
				icon: <Grains />,
			}
		} else if (level === '4') {
			return {
				message: 'Farmer 5',
				icon: <Grains />,
			}
		}
	}

	// explore
	else if (root === 'exploreGains') {
		if (level === '0') {
			return {
				message: 'Explorer 1',
				icon: <Mountains />,
			}
		} else if (level === '1') {
			return {
				message: 'Explorer 2',
				icon: <Mountains />,
			}
		} else if (level === '2') {
			return {
				message: 'Explorer 3',
				icon: <Mountains />,
			}
		} else if (level === '3') {
			return {
				message: 'Explorer 4',
				icon: <Mountains />,
			}
		} else if (level === '4') {
			return {
				message: 'Explorer 5',
				icon: <Mountains />,
			}
		}
	}

	// land
	else if (root === 'land') {
		if (level === '0') {
			return {
				message: 'Expansionist 1',
				icon: <MapTrifold />,
			}
		} else if (level === '1') {
			return {
				message: 'Expansionist 2',
				icon: <MapTrifold />,
			}
		} else if (level === '2') {
			return {
				message: 'Expansionist 3',
				icon: <MapTrifold />,
			}
		} else if (level === '3') {
			return {
				message: 'Expansionist 4',
				icon: <MapTrifold />,
			}
		} else if (level === '4') {
			return {
				message: 'Expansionist 5',
				icon: <MapTrifold />,
			}
		}
	}

	// net worth
	else if (root === 'networth') {
		if (level === '0') {
			return {
				message: 'Net Worth 1',
				icon: <Scales />,
			}
		} else if (level === '1') {
			return {
				message: 'Net Worth 2',
				icon: <Scales />,
			}
		} else if (level === '2') {
			return {
				message: 'Net Worth 3',
				icon: <Scales />,
			}
		} else if (level === '3') {
			return {
				message: 'Net Worth 4',
				icon: <Scales />,
			}
		} else if (level === '4') {
			return {
				message: 'Net Worth 5',
				icon: <Scales />,
			}
		}
	}

	// peasants
	else if (root === 'peasants') {
		if (level === '0') {
			return {
				message: 'Populist 1',
				icon: <UsersThree />,
			}
		} else if (level === '1') {
			return {
				message: 'Populist 2',
				icon: <UsersThree />,
			}
		} else if (level === '2') {
			return {
				message: 'Populist 3',
				icon: <UsersThree />,
			}
		} else if (level === '3') {
			return {
				message: 'Populist 4',
				icon: <UsersThree />,
			}
		} else if (level === '4') {
			return {
				message: 'Populist 5',
				icon: <UsersThree />,
			}
		}
	}

	// guerilla
	else if (root === 'trpArm') {
		if (level === '0') {
			return {
				message: 'Guerilla Master 1',
				icon: <Sword />,
			}
		} else if (level === '1') {
			return {
				message: 'Guerilla Master 2',
				icon: <Sword />,
			}
		} else if (level === '2') {
			return {
				message: 'Guerilla Master 3',
				icon: <Sword />,
			}
		} else if (level === '3') {
			return {
				message: 'Guerilla Master 4',
				icon: <Sword />,
			}
		} else if (level === '4') {
			return {
				message: 'Guerilla Master 5',
				icon: <Sword />,
			}
		}
	}

	// seige
	else if (root === 'trpLnd') {
		if (level === '0') {
			return {
				message: 'Siege Master 1',
				icon: <ShieldChevron />,
			}
		} else if (level === '1') {
			return {
				message: 'Siege Master 2',
				icon: <ShieldChevron />,
			}
		} else if (level === '2') {
			return {
				message: 'Siege Master 3',
				icon: <ShieldChevron />,
			}
		} else if (level === '3') {
			return {
				message: 'Siege Master 4',
				icon: <ShieldChevron />,
			}
		} else if (level === '4') {
			return {
				message: 'Siege Master 5',
				icon: <ShieldChevron />,
			}
		}
	}

	// air
	else if (root === 'trpFly') {
		if (level === '0') {
			return {
				message: 'Air Master 1',
				icon: <AirplaneTilt />,
			}
		} else if (level === '1') {
			return {
				message: 'Air Master 2',
				icon: <AirplaneTilt />,
			}
		} else if (level === '2') {
			return {
				message: 'Air Master 3',
				icon: <AirplaneTilt />,
			}
		} else if (level === '3') {
			return {
				message: 'Air Master 4',
				icon: <AirplaneTilt />,
			}
		} else if (level === '4') {
			return {
				message: 'Air Master 5',
				icon: <AirplaneTilt />,
			}
		}
	}

	// sea
	else if (root === 'trpSea') {
		if (level === '0') {
			return {
				message: 'Sea Master 1',
				icon: <Boat />,
			}
		} else if (level === '1') {
			return {
				message: 'Sea Master 2',
				icon: <Boat />,
			}
		} else if (level === '2') {
			return {
				message: 'Sea Master 3',
				icon: <Boat />,
			}
		} else if (level === '3') {
			return {
				message: 'Sea Master 4',
				icon: <Boat />,
			}
		} else if (level === '4') {
			return {
				message: 'Sea Master 5',
				icon: <Boat />,
			}
		}
	}

	// wizard
	else if (root === 'trpWiz') {
		if (level === '0') {
			return {
				message: 'Magic Man 1',
				icon: <MagicWand />,
			}
		} else if (level === '1') {
			return {
				message: 'Magic Man 2',
				icon: <MagicWand />,
			}
		} else if (level === '2') {
			return {
				message: 'Magic Man 3',
				icon: <MagicWand />,
			}
		} else if (level === '3') {
			return {
				message: 'Magic Man 4',
				icon: <MagicWand />,
			}
		} else if (level === '4') {
			return {
				message: 'Magic Man 5',
				icon: <MagicWand />,
			}
		}
	}

	// attack gains
	else if (root === 'attackGains') {
		if (level === '0') {
			return {
				message: 'Warlord 1',
				icon: <Skull />,
			}
		} else if (level === '1') {
			return {
				message: 'Warlord 2',
				icon: <Skull />,
			}
		} else if (level === '2') {
			return {
				message: 'Warlord 3',
				icon: <Skull />,
			}
		} else if (level === '3') {
			return {
				message: 'Warlord 4',
				icon: <Skull />,
			}
		} else if (level === '4') {
			return {
				message: 'Warlord 5',
				icon: <Skull />,
			}
		}
	}

	// turns used
	else if (root === 'turns') {
		if (level === '0') {
			return {
				message: 'Into the World',
				icon: <GitBranch />,
			}
		} else if (level === '1') {
			return {
				message: 'Sticking Around',
				icon: <GitBranch />,
			}
		} else if (level === '2') {
			return {
				message: 'Committed',
				icon: <GitBranch />,
			}
		}
	}

	// offensive success
	else if (root === 'attacks') {
		if (level === '0') {
			return {
				message: 'Tactical Edge 1',
				icon: <MedalMilitary />,
			}
		} else if (level === '1') {
			return {
				message: 'Tactical Edge 2',
				icon: <MedalMilitary />,
			}
		} else if (level === '2') {
			return {
				message: 'Tactical Edge 3',
				icon: <MedalMilitary />,
			}
		} else if (level === '3') {
			return {
				message: 'Tactical Edge 4',
				icon: <MedalMilitary />,
			}
		} else if (level === '4') {
			return {
				message: 'Tactical Edge 5',
				icon: <MedalMilitary />,
			}
		}
	}

	// defensive success
	else if (root === 'defends') {
		if (level === '0') {
			return {
				message: 'Iron Tower 1',
				icon: <Shield />,
			}
		} else if (level === '1') {
			return {
				message: 'Iron Tower 2',
				icon: <Shield />,
			}
		} else if (level === '2') {
			return {
				message: 'Iron Tower 3',
				icon: <Shield />,
			}
		} else if (level === '3') {
			return {
				message: 'Iron Tower 4',
				icon: <Shield />,
			}
		} else if (level === '4') {
			return {
				message: 'Iron Tower 5',
				icon: <Shield />,
			}
		}
	}

	// rank
	else if (root === 'rank') {
		if (level === '1') {
			return {
				message: 'Top of the World',
				icon: <Trophy />,
			}
		}
	}

	// build
	else if (root === 'buil') {
		if (level === 'd') {
			return {
				message: 'Fully Built',
				icon: <Hammer />,
			}
		}
	}

	// clan
	else if (root === 'joinCla') {
		if (level === 'n') {
			return {
				message: 'Joined a Clan',
				icon: <UsersFour />,
			}
		}
	}

	return {
		message: root + ' ' + level,
		icon: null,
	}

}
