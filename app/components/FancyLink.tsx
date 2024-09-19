import Link from "next/link"
import { HTMLAttributeAnchorTarget } from "react"
import classNames from "../lib/classNames"

interface Props {
	href: string
	text: string
	className?: string
	target?: HTMLAttributeAnchorTarget
}
export default function FancyLink({ href, text, className, target }: Props) {
	// Split text into an array of chars
	const chars = text.split("")
	return (
		<Link href={href} target={target} className={classNames("group inline-block", className)}>
			{chars.map((char, index) => {
				return (
					<span
						key={index}
						className={`group-hover:animate-linkbounce inline-block`}
						style={{
							animationTimingFunction: "ease-out",
							animationDelay: `${index * 75}ms`,
						}}>
						{char}
					</span>
				)
			})}
		</Link>
	)
}
