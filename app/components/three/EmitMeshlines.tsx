import { useFrame } from "@react-three/fiber"
import { useState } from "react"
import { Vector3 } from "three"
import Meshline from "./Meshline"

interface Props {
	points: Vector3[]
	count: number
	baseSpacing: number
}

export default function EmitMeshlines({ points, count, baseSpacing }: Props) {
	const [time, setTime] = useState(0) // New state to hold elapsed time
	const [offsets, setOffsets] = useState<number[]>(() =>
		Array.from({ length: count }, (_, i) => i * baseSpacing),
	)
	const maxDistance = count * baseSpacing

	const generateOffsetPoints = (basePoints: Vector3[], offsetAmount: number) => {
		return basePoints.map((point) => {
			const direction = point.clone().normalize() // Get the direction from the center
			return point.clone().add(direction.multiplyScalar(offsetAmount)) // Move outward by the offset
		})
	}

	// Animate the outward movement and reset Fatlines when they exceed maxDistance
	useFrame((state, delta) => {
		setTime((prevTime) => prevTime + delta) // Update the elapsed time
		setOffsets(
			(prevOffsets) => prevOffsets.map((offset) => (offset + delta * 10) % maxDistance), // Animate outward, reset when reaching maxDistance
		)
	})

	return (
		<>
			{offsets.map((offset, i) => {
				return (
					<Meshline
						key={i}
						points={generateOffsetPoints(points, offset)}
						baseOffset={offset} // Pass the dynamic offset to adjust each Fatline
						time={time}
					/>
				)
			})}

			{/* <SVGMask svgUrl="/DEF.svg" position={[0, 0, 0]} scale={1} /> */}
		</>
	)
}
