export const getAttackSteps = (t) => [
	{
		selector: '.attk-first-step',
		content: t('tour:attack.intro'),
	},
	{
		selector: '.attk-second-step',
		content: t('tour:attack.army'),
	},
	{
		selector: '.attk-step-twopointfive',
		content: t('tour:attack.values'),
	},
	{
		selector: '.attk-third-step',
		content: t('tour:attack.targeting'),
	},
	{
		selector: '.attk-fourth-step',
		content: t('tour:attack.types'),
	},
	{
		selector: '.attk-fifth-step',
		content: t('tour:attack.magical'),
	},
	{
		selector: '.attk-sixth-step',
		content: t('tour:attack.conclusion'),
	},
]
