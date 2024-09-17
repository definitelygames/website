"use client"

import { extend, useLoader } from "@react-three/fiber"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import { MeshLineGeometry, MeshLineMaterial, MeshLineMaterialParameters } from "meshline"
import EmitMeshlines from "./EmitMeshlines"
import { BufferGeometry, Vector3 } from "three"

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

	scale ??= 1

	return (
		<>
			{svgData.paths.map((path, index) => {
				const shapes = path.toShapes(true)

				// We are only rendering the first shape for now
				const shape = shapes[0]

				// Extract points from the shape
				const points = shape.getPoints()

				// Rotate the points by 90 degrees (π/2 radians) around the origin
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
				const meshPoints = points.map((p) => new Vector3(p.x, p.y, 0))

				const spacing = 12
				const count = 85
				const maxDistance = spacing * count

				return (
					<EmitMeshlines
						key={index}
						points={meshPoints}
						baseSpacing={spacing}
						count={count}
						maxDistance={maxDistance}
					/>
				)
			})}
		</>
	)
}
