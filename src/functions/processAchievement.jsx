import { Scales, Sword, Shield, MagicWand, Coins, AirplaneTilt, Boat, UsersThree, ForkKnife, Skull, Grains, Mountains, MapTrifold, CreditCard, Trophy, Factory, Hammer, GitBranch, MedalMilitary, UsersFour, ShieldChevron } from "@phosphor-icons/react"


export const processAchievement = (achievement) =>
{
	// set achievement message and icon based on name provided to function
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
	if (root === 'indyPro') {
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
	if (root === 'magicPro') {
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
	if (root === 'expenses') {
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
	if (root === 'foodcon') {
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
	if (root === 'foodpro') {
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
	if (root === 'explore') {
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
	if (root === 'land') {
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
	if (root === 'networth') {
		if (level === '0') {
			return {
				message: 'Growth Urge 1',
				icon: <Scales />,
			}
		} else if (level === '1') {
			return {
				message: 'Growth Urge 2',
				icon: <Scales />,
			}
		} else if (level === '2') {
			return {
				message: 'Growth Urge 3',
				icon: <Scales />,
			}
		} else if (level === '3') {
			return {
				message: 'Growth Urge 4',
				icon: <Scales />,
			}
		} else if (level === '4') {
			return {
				message: 'Growth Urge 5',
				icon: <Scales />,
			}
		}
	}

	// peasants
	if (root === 'peasants') {
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
	if (root === 'trpArm') {
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
	if (root === 'trpLnd') {
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
	if (root === 'trpFly') {
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
	if (root === 'trpSea') {
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
	if (root === 'trpWiz') {
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
	if (root === 'attackGains') {
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
	if (root === 'turns') {
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
	if (root === 'attacks') {
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
	if (root === 'defends') {
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
	if (root === 'rank') {
		if (level === '0') {
			return {
				message: 'Top of the World',
				icon: <Trophy />,
			}
		}
	}

	// build
	if (root === 'build') {
		if (level === '0') {
			return {
				message: 'Fully Built',
				icon: <Hammer />,
			}
		}
	}

	// clan
	if (root === 'clanId') {
		if (level === '0') {
			return {
				message: 'Joined a Clan',
				icon: <UsersFour />,
			}
		}
	}
}
