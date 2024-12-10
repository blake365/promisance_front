import { useState, Suspense } from "react"
import Guide from "./guide"
import { Button, Modal, Title, Loader, Group, Anchor } from "@mantine/core"
import { useSelector, useDispatch } from "react-redux"
import {
	guideSelector,
	goBack,
	clearHistory,
	setPage,
} from "../../store/guideSlice"
import { useTranslation } from "react-i18next"

const GuideModalButton = ({ pageName, empire, protection }) => {
	const { t } = useTranslation(["guide"])
	const [modalOpened, setModalOpened] = useState(false)
	const dispatch = useDispatch()
	const { history, page } = useSelector(guideSelector)

	const handleCloseModal = () => {
		setModalOpened(false)
		dispatch(clearHistory())
	}

	return (
		<div>
			<Button
				compact
				variant="outline"
				onClick={() => {
					setModalOpened(true)
				}}
				sx={() => {
					if (empire.turnsUsed <= protection * 2) {
						return {
							border: "1px solid #40c057",
							boxShadow: "0 0 2px 1px #40c057",
							color: "#40c057",
						}
					}
				}}
				className="sixth-step"
			>
				{t(`guide:guide.links.${pageName}`)} {t("guide:guide.links.Guide")}
			</Button>
			<Modal
				opened={modalOpened}
				onClose={handleCloseModal}
				title={<Title order={2}>{t("guide:guide.content.common.title")}</Title>}
				centered
				overflow="inside"
				size="xl"
			>
				<Suspense fallback={<Loader size="xl" />}>
					<Group position="left" mb="md" spacing="xs">
						{history.length > 0 && (
							<Anchor size="sm" onClick={() => dispatch(goBack())}>
								← {t("guide:guide.content.common.back")}
							</Anchor>
						)}
						{page !== "index" && (
							<Anchor size="sm" onClick={() => dispatch(setPage("index"))}>
								{t("guide:guide.content.common.return")}
							</Anchor>
						)}
					</Group>
					<Guide empire={empire} />
				</Suspense>
			</Modal>
		</div>
	)
}

export default GuideModalButton
