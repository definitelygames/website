import React from "react"
import Image from "next/image"
import gradientOverlayLandscape from "../images/gradient-overlay-landscape.svg"
import gradientOverlayPortrait from "../images/gradient-overlay-portrait.svg"
import Tagline from "./Tagline"
import classNames from "../lib/classNames"
import Visualizer from "./three/Visualizer"
import DefMask from "./DefMask"
import DefinitelyGamesLogo from "./DefinitelyGamesLogo"

interface Props {
	className?: string
}

const DefViz = React.forwardRef<HTMLDivElement, Props>(({ className }, ref) => {
	return (
		<div
			ref={ref}
			className={classNames(
				"relative z-0 mx-auto aspect-def-portrait w-full overflow-hidden md:aspect-def md:overflow-visible",
				className,
			)}>
			<div className="t-0 absolute z-30 m-4 flex w-full flex-col space-y-2 md:m-8 md:w-[15%]">
				<DefinitelyGamesLogo className="w-[39%] md:w-full" />
				<Tagline className="text-md w-[45%] leading-6 md:hidden" />
			</div>
			<Image
				src={gradientOverlayPortrait}
				alt=""
				className="t-0 theme1:block theme1:md:hidden absolute z-10 hidden w-full md:h-auto"
				draggable={false}
			/>
			<Image
				src={gradientOverlayLandscape}
				alt=""
				className="t-0 theme1:md:block absolute z-10 hidden w-full md:h-auto"
				draggable={false}
			/>
			<DefMask className="absolute top-0 z-10 aspect-def-portrait w-full rotate-90 scale-[1.915] md:aspect-def md:rotate-0 md:scale-[1.005]" />
			<Visualizer />
		</div>
	)
})

DefViz.displayName = "DEF"

export default DefViz
