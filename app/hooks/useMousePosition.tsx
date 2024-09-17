import { useEffect, useState } from "react"

export type MousePos = {
	x: number
	y: number
}
/**
 * Returns the current mouse position as a ratio of the window size
 */
export default function useMousePosition() {
	const [mousePos, setMousePos] = useState<MousePos>({ x: 0.5, y: 0.5 })

	function setMousePosition(e: MouseEvent) {
		setMousePos({
			x: e.clientX / window.innerWidth,
			y: e.clientY / window.outerHeight,
		})
	}

	useEffect(() => {
		window.addEventListener("mousemove", setMousePosition)

		return () => {
			window.removeEventListener("mousemove", setMousePosition)
		}
	}, [])

	return mousePos
}
