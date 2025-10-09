import { Container, Group, ActionIcon, Title, Anchor } from "@mantine/core"
import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function FooterSocial() {
	const { t } = useTranslation(["pages", "layout"])
	return (
		<div>
			<Container size="lg" py="lg">
				<Group spacing={0} position="apart">
					<Title order={1} component={Link} to="/" aria-label="home">
						NeoPromisance
					</Title>
					<Group>
						<Anchor
							color="dimmed"
							href="https://guide.neopromisance.com"
							target="_blank"
						>
							{t('layout:footer.guide')}
						</Anchor>
						<Anchor component={Link} to="/rules" color="dimmed">
							{t('layout:footer.rules')}
						</Anchor>
						<Anchor component={Link} to="/privacy" color="dimmed">
							{t('layout:footer.privacy')}
						</Anchor>
						<Anchor
							component="a"
							href="https://www.buymeacoffee.com/blakemorgan"
							target="_blank"
							color="dimmed"
						>
							{t('layout:footer.donate')}
						</Anchor>
						<ActionIcon
							size="lg"
							component="a"
							href="https://discord.gg/bnuVy2pdgM"
							aria-label="discord link"
						>
							<IconBrandDiscord size="2rem" stroke={1.5} />
						</ActionIcon>
						<ActionIcon
							size="lg"
							component="a"
							href="https://github.com/blake365/typescript_promisance"
							aria-label="github link"
						>
							<IconBrandGithub size="2rem" stroke={1.5} />
						</ActionIcon>
					</Group>
				</Group>
			</Container>
		</div>
	)
}
