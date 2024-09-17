"use client"
import { useEffect, useState } from "react"
import DefViz from "./components/DefViz"
import EmailSignup from "./components/EmailSignup"
import SocialIcons from "./components/SocialIcons"
import Tagline from "./components/Tagline"
import useResizeObserver from "./hooks/useResizeObserver"
import classNames from "./lib/classNames"

export default function Home() {
	const [ref, dimensions] = useResizeObserver()
	const [className, setClassName] = useState<string>("place-content-center")

	useEffect(() => {
		// fix for very wide and short screen sizes
		const aspect = dimensions.width / dimensions.height

		if (aspect > 1.6) {
			setClassName("")
		} else {
			setClassName("place-content-center")
		}
	}, [dimensions])

	return (
		<div
			ref={ref}
			className={classNames(
				"mx-auto flex w-full max-w-[120rem] flex-col space-y-8 px-6 py-8 md:h-screen md:px-14",
				className,
			)}>
			<div className="relative z-10 flex flex-row">
				<div className="flex-1"></div>
				<EmailSignup className="hidden w-[66%] md:inline-flex lg:w-[31.5%]" />
			</div>

			<DefViz />

			<div className="relative z-10 flex flex-row place-items-center pb-8">
				<Tagline className="hidden w-2/3 md:block" />
				<EmailSignup className="w-1/2 md:hidden" />
				<div className="flex-1 md:hidden"></div>
				<SocialIcons className="w-28 place-content-end md:w-full" />
			</div>
		</div>
	)
}
