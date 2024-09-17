"use client"
import { useRef, useLayoutEffect, useState } from "react"

interface Dimensions {
	width: number
	height: number
}

export default function useResizeObserver(): [React.MutableRefObject<HTMLDivElement | null>, Dimensions] {
	const ref = useRef<HTMLDivElement | null>(null)
	const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

	useLayoutEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect()
			if (rect.width > 0 && rect.height > 0) {
				setDimensions(rect)
			}
		}

		const observer = new ResizeObserver(([entry]) => {
			const newDimensions = entry.contentRect
			if (newDimensions.width > 0 && newDimensions.height > 0) {
				setDimensions(newDimensions)
			}
		})

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current)
			}
		}
	}, [ref])

	return [ref, dimensions]
}
