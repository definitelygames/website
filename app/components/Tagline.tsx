import Link from "next/link"
import classNames from "../lib/classNames"

interface Props {
	className?: string
	children?: any
}

export default function Tagline({ className, children }: Props) {
	return (
		<div className={classNames("text-lg font-medium text-primary", className)}>
			Making games since 2024. <br />
			Founded by{" "}
			<Link href="https://www.caseypugh.com" target="_blank" className="link">
				Casey
			</Link>{" "}
			&{" "}
			<Link href="https://charlietran.com/" target="_blank" className="link">
				Charlie
			</Link>
			.
		</div>
	)
}
