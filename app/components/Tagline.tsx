import classNames from "../lib/classNames"
import FancyLink from "./FancyLink"

interface Props {
	className?: string
}

export default function Tagline({ className }: Props) {
	return (
		<div className={classNames("text-lg font-medium text-primary", className)}>
			Making games since 2024.{" "}
			<FancyLink
				text="We’re hiring!"
				href="https://pages.def.games/lead-game-artist"
				target="_blank"
				className="link"
			/>
		</div>
	)
}
