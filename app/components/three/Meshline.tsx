import { useThree } from "@react-three/fiber"
import { useMemo } from "react"
import { CatmullRomCurve3, Color, Matrix4, Vector2, Vector3 } from "three"
import { clampRemap, remap } from "@/app/lib/remap"

export default function Meshline({
	points,
	baseOffset,
	time,
}: {
	points: Vector3[]
	baseOffset: number
	time: number
}) {
	const curve = useMemo(() => {
		const adjustedPoints = points.map((point) => adjustDistanceByPosition(point, baseOffset, time))
		return new CatmullRomCurve3(adjustedPoints, false).getPoints(200).flatMap((point) => point.toArray())
	}, [points, baseOffset, time])

	var pointSample = points[0]

	var distanceFromCenter = Math.sqrt(pointSample.x ** 2 + pointSample.y ** 2)

	var range = 250
	var distanceFactor = distanceFromCenter / range
	distanceFactor = Math.max(0, Math.min(1, distanceFactor))

	// ease out the distance factor
	distanceFactor = 1 - Math.pow(1 - distanceFactor, 2) * 1.4

	// lerp color based on how close to 0,0 the point is
	var color = interpolateColor("#1B0086", "#FF4F4F", distanceFactor)

	// var texture = useTexture("/Group.png")
	const { size } = useThree()
	const maxLineWidth = 0.008
	const minLineWidth = 0.006

	const maxSize = 1000
	const minSize = 500

	const sizeFactor = 1 - clampRemap(size.width, minSize, maxSize, 0, 1)
	const lineWidth = remap(sizeFactor, 0, 1, minLineWidth, maxLineWidth)

	return (
		<mesh>
			<meshLineGeometry points={curve} />
			<meshLineMaterial
				color={color}
				lineWidth={lineWidth}
				// transparent
				// resolution={new THREE.Vector2(window.innerWidth, window.innerHeight)}
				// resolution={new THREE.Vector2(Math.round(size.height), Math.round(size.height + 1))}
				resolution={new Vector2(2000, 1000)}
			/>
		</mesh>
	)
}

function interpolateColor(startColor: string, endColor: string, factor: number): string {
	const start = new Color(startColor)
	const end = new Color(endColor)
	const result = start.clone().lerp(end, factor)
	return `#${result.getHexString()}`
}

function adjustDistanceByPosition(point: Vector3, baseOffset: number, time: number): Vector3 {
	const direction = point.clone().normalize()
	const distortedPoint = point.clone()

	// time = time / 1000

	// Calculate the radial distance of the point from the center (0,0)
	const distanceFromCenter = Math.sqrt(point.x ** 2 + point.y ** 2)

	// Define a falloff range for smooth flattening near the center
	const falloffRadius = 300 // Adjust this value to control where the wave starts to appear

	// Calculate the falloff effect, which scales from 0 (center) to 1 (beyond falloffRadius)
	let falloffFactor = Math.min(distanceFromCenter / falloffRadius, 1)

	// Optional: Apply a non-linear easing function to control the smoothness of the transition (quadratic)
	falloffFactor = Math.pow(falloffFactor, 2) // Eases the wave distortion (quadratic falloff)

	// --- Radial Tree Ring Effect ---
	const ringFrequency = 60 // Controls the frequency of the rings
	const ringAmplitude = 10 // Controls the amplitude of the rings
	const timeEffect = Math.sin(time / 3) * 100 // Optional time effect to animate the rings

	// Apply a radial sine wave to create the ring effect
	const radialEffect = Math.sin((distanceFromCenter + timeEffect) / ringFrequency) * ringAmplitude

	// distort in a way that makes it less circular
	const distortionFactor = 40
	distortedPoint.x += Math.sin((distortedPoint.y + time) / 100) * distortionFactor * falloffFactor

	// Scale the radial effect by the falloff factor
	const adjustedWave = radialEffect * falloffFactor

	// slightly rotate based on distance from center
	const rotationFactor = Math.sin(time * 0.2) / 3000
	const rotation = -distanceFromCenter * rotationFactor * falloffFactor
	const rotationMatrix = new Matrix4().makeRotationZ(rotation)
	distortedPoint.applyMatrix4(rotationMatrix)

	// Apply the adjusted radial wave effect to the point
	return distortedPoint.add(direction.multiplyScalar(adjustedWave))
}
