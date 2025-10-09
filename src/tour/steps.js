export const getSteps = (t) => [
	{
		selector: '.first-step',
		content: t('tour:main.welcome'),
	},
	{
		selector: '.second-step',
		content: t('tour:main.explore'),
	},
	{
		selector: '.step-twopointfive',
		content: t('tour:main.results'),
	},
	{
		selector: '.third-step',
		content: t('tour:main.build'),
	},
	{
		selector: '.fourth-step',
		content: t('tour:main.buildings'),
	},
	{
		selector: '.fifth-step',
		content: t('tour:main.production'),
	},
	{
		selector: '.sixth-step',
		content: t('tour:main.conclusion'),
	},
]
