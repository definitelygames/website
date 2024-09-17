"use client"
import { CSSProperties, useEffect, useState } from "react"
import DefViz from "./components/DefViz"
import EmailSignup from "./components/EmailSignup"
import SocialIcons from "./components/SocialIcons"
import Tagline from "./components/Tagline"
import useResizeObserver from "./hooks/useResizeObserver"
import classNames from "./lib/classNames"
import StructuredSchema from "./components/StructuredSchema"

export default function Home() {
	const [ref, dimensions] = useResizeObserver()
	const [styles, setStyles] = useState<CSSProperties>()

	useEffect(() => {
		// shitty hack for very wide and short screen sizes
		// probably could do this in css but I'm lazy
		const windowAspect = window.innerWidth / window.innerHeight
		const divWidth = window.innerHeight * (1252 / 900)
		const padding = window.innerWidth - divWidth
		if (windowAspect > 1.7) {
			setStyles({
				paddingLeft: `${padding / 2}px`,
				paddingRight: `${padding / 2}px`,
			})
		} else {
			setStyles({})
		}
	}, [dimensions])

	return (
		<>
			<StructuredSchema />
			<div
				ref={ref}
				className={classNames(
					"mx-auto flex w-full flex-col place-content-center space-y-8 px-6 pb-8 md:h-screen md:px-14 md:pb-0",
				)}
				style={styles}>
				<div className="relative z-10 flex flex-row">
					<div className="flex-1"></div>
					<EmailSignup className="hidden w-[66%] md:inline-flex lg:w-[31.5%]" />
				</div>

				<DefViz />

				<div className="relative z-10 flex flex-row place-items-center">
					<Tagline className="hidden w-2/3 md:block" />
					<EmailSignup className="w-1/2 md:hidden" />
					<div className="flex-1 md:hidden"></div>
					<SocialIcons className="w-28 place-content-end md:w-full" />
				</div>
			</div>
		</>
	)
}
