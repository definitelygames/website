import classNames from "../lib/classNames"

interface Props {
	className?: string
}

export default function Tagline({ className }: Props) {
	return (
		<div className={classNames("text-lg font-medium text-primary", className)}>Making games since 2024.</div>
	)
}
