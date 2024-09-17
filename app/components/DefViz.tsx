import React from "react"
import Image from "next/image"
import defsubtract from "../images/def-subtract.svg"
import defgames from "../images/def-games.svg"
import gradientOverlayLandscape from "../images/gradient-overlay-landscape.svg"
import gradientOverlayPortrait from "../images/gradient-overlay-portrait.svg"
import Tagline from "./Tagline"
import classNames from "../lib/classNames"
import Visualizer from "./three/Visualizer"

interface Props {
	className?: string
}

const DefViz = React.forwardRef<HTMLDivElement, Props>(({ className }, ref) => {
	return (
		<div
			ref={ref}
			className={classNames(
				"aspect-def-portrait relative z-0 mx-auto w-full overflow-hidden md:aspect-def md:overflow-visible",
				className,
			)}>
			<div className="t-0 absolute z-30 m-4 flex w-2/5 flex-col space-y-2 md:m-8 md:w-[15%]">
				<Image src={defgames} alt="Definitely Games" className="w-full" draggable={false} />
				<Tagline className="text-md leading-6 md:hidden" />
			</div>
			<Image
				src={gradientOverlayPortrait}
				alt=""
				className="t-0 absolute z-10 w-full md:hidden md:h-auto"
				draggable={false}
			/>
			<Image
				src={gradientOverlayLandscape}
				alt=""
				className="t-0 absolute z-10 hidden w-full md:block md:h-auto"
				draggable={false}
			/>
			<Image
				src={defsubtract}
				alt="DEF"
				className="aspect-def-portrait absolute top-0 z-10 w-full rotate-90 scale-[1.915] md:aspect-def md:rotate-0 md:scale-[1.005]"
				draggable={false}
			/>
			<Visualizer />
		</div>
	)
})

DefViz.displayName = "DEF"

export default DefViz
