import classNames from "../lib/classNames"

export default function Tagline({ className }: { className?: string }) {
	return (
		<div className={classNames("text-lg font-medium text-primary", className)}>Making games since 2024.</div>
	)
}
