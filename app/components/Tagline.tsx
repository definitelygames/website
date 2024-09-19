import Link from "next/link"
import classNames from "../lib/classNames"

interface Props {
	className?: string
	children?: any
}

export default function Tagline({ className, children }: Props) {
	return (
		<div className={classNames("text-lg font-medium text-primary", className)}>Making games since 2024.</div>
	)
}
