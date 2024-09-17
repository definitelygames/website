"use client"

import { Canvas } from "@react-three/fiber"
import { SvgRingEmitter } from "./SvgRingEmitter"
import { useBreakpoint } from "@/app/hooks/useBreakpoint"

export default function Visualizer() {
	const isDesktop = useBreakpoint("md")
	return (
		<Canvas
			className="aspect-def-portrait absolute left-0 top-0 z-[0] md:aspect-def"
			orthographic
			camera={{ zoom: 1, position: [0, 0, 100] }}>
			<ambientLight intensity={0.5} />
			<SvgRingEmitter url="/def-outline.svg" scale={0.65} rotation={isDesktop ? 0 : 90} />
		</Canvas>
	)
}
