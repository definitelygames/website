"use client"

import { extend, useLoader } from "@react-three/fiber"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import { MeshLineGeometry, MeshLineMaterial, MeshLineMaterialParameters } from "meshline"
import EmitMeshlines from "./EmitMeshlines"
import { BufferGeometry, Vector3 } from "three"
import { useEffect, useState } from "react"
import { useBreakpoint } from "@/app/hooks/useBreakpoint"

extend({ MeshLineGeometry, MeshLineMaterial })

declare global {
	module JSX {
		interface IntrinsicElements {
			meshLineGeometry: any
			meshLineMaterial: MeshLineMaterialParameters
			gradientLineMaterial: any
		}
	}
}

interface SvgParams {
	url: string
	rotation?: number
	scale?: number
}

export const SvgRingEmitter = ({ url, rotation, scale }: SvgParams) => {
	const svgData = useLoader(SVGLoader, url)
	const [meshPoints, setMeshPoints] = useState<Vector3[]>()
	const [spacing, setSpacing] = useState<number>(0)
	const [count, setCount] = useState<number>(0)
	const isSmallScreen = !useBreakpoint("sm")

	scale ??= 1

	useEffect(() => {
		const path = svgData.paths[0]
		const shapes = path.toShapes(true)

		// We are only rendering the first shape for now
		const shape = shapes[0]

		// Extract points from the shape
		const points = shape.getPoints()

		points.forEach((point) => {
			const x = point.x
			const y = point.y

			if (rotation) {
				const angle = rotation * (Math.PI / 180)
				point.x = x * Math.cos(angle) - y * Math.sin(angle)
				point.y = x * Math.sin(angle) + y * Math.cos(angle)
			}
			point.x *= scale
			point.y *= scale
		})

		// flip the y axis
		points.forEach((point) => {
			point.y = -point.y
		})

		// Calculate the bounding box and center the shape
		const geometry = new BufferGeometry().setFromPoints(points)
		geometry.computeBoundingBox()
		const box = geometry.boundingBox
		const center = new Vector3()

		if (box) {
			box.getCenter(center) // Calculate center of the bounding box
		}
		// Translate the points to center them around the origin
		points.forEach((point) => {
			point.sub(center)
		})

		// Convert points into the correct format for MeshLine
		const _meshPoints = points.map((p) => new Vector3(p.x, p.y, 0))
		setMeshPoints(_meshPoints)
	}, [svgData, meshPoints])

	useEffect(() => {
		// Force reset the lines when we adjust the spacing
		if (spacing > 0) setMeshPoints(undefined)

		setCount(98)

		if (isSmallScreen) {
			setSpacing(10)
		} else {
			setSpacing(12)
		}
	}, [isSmallScreen])

	return <>{meshPoints && <EmitMeshlines points={meshPoints} baseSpacing={spacing} count={count} />}</>
}
