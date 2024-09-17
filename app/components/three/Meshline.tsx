import { useFrame, useThree } from "@react-three/fiber"
import { useMemo, useState } from "react"
import { CatmullRomCurve3, Color, Matrix4, Vector2, Vector3 } from "three"
import { clampRemap, remap } from "@/app/lib/remap"
import useMousePosition, { MousePos } from "@/app/hooks/useMousePosition"
import { useBreakpoint } from "@/app/hooks/useBreakpoint"
import useWindowFocus from "@/app/hooks/useMouseInWindow"

interface Props {
	points: Vector3[]
	time: number
}
export default function Meshline({ points, time }: Props) {
	const mousePos = useMousePosition()
	const [mouseFactor, setMouseFactor] = useState<MousePos>({ x: 0.5, y: 0.5 })
	const isSmallScreen = !useBreakpoint("sm")
	const isWindowFocused = useWindowFocus()

	useFrame(() => {
		if (isSmallScreen) {
			setMouseFactor({ x: 0.5, y: 0.5 })
			return
		}

		const lerpFactor = 0.01

		if (!isWindowFocused) {
			// reset if user left window
			setMouseFactor((prev) => {
				return {
					x: prev.x + (0.5 - prev.x) * lerpFactor,
					y: prev.y + (0.5 - prev.y) * lerpFactor,
				}
			})
			return
		}

		setMouseFactor((prev) => {
			return {
				x: prev.x + (mousePos.x - prev.x) * lerpFactor,
				y: prev.y + (mousePos.y - prev.y) * lerpFactor,
			}
		})
	})

	const curve = useMemo(() => {
		const adjustedPoints = points.map((point) => adjustDistanceByPosition(point, time, mouseFactor))
		return new CatmullRomCurve3(adjustedPoints, false).getPoints(150).flatMap((point) => point.toArray())
	}, [points, time, mouseFactor])

	const pointSample = points[0]

	const distanceFromCenter = Math.sqrt(pointSample.x ** 2 + pointSample.y ** 2)

	const range = 250
	let distanceFactor = distanceFromCenter / range
	distanceFactor = Math.max(0, Math.min(1, distanceFactor))

	// ease out the distance factor
	distanceFactor = 1 - Math.pow(1 - distanceFactor, 2) * 1.6

	// lerp color based on how close to 0,0 the point is
	const color = interpolateColor("#1B0086", "#FF4F4F", distanceFactor)

	// var texture = useTexture("/Group.png")
	const { size } = useThree()
	const maxLineWidth = 0.01
	const minLineWidth = 0.006

	const maxSize = 1000
	const minSize = 500

	const sizeFactor = 1 - clampRemap(size.width, minSize, maxSize, 0, 1)
	const lineWidth = remap(sizeFactor, 0, 1, minLineWidth, maxLineWidth)

	return (
		<mesh>
			<meshLineGeometry points={curve} />
			<meshLineMaterial color={color} lineWidth={lineWidth} resolution={new Vector2(2000, 1000)} />
		</mesh>
	)
}

function interpolateColor(startColor: string, endColor: string, factor: number): string {
	const start = new Color(startColor)
	const end = new Color(endColor)
	const result = start.clone().lerp(end, factor)
	return `#${result.getHexString()}`
}

function adjustDistanceByPosition(point: Vector3, time: number, factor: MousePos): Vector3 {
	const direction = point.clone().normalize()
	const distortedPoint = point.clone()

	const xFactor = (factor.x - 0.5) * 5
	const yFactor = (factor.y - 0.5) * 60

	// Calculate the radial distance of the point from the center (0,0)
	const distanceFromCenter = Math.sqrt(point.x ** 2 + point.y ** 2)

	// Define a falloff range for smooth flattening near the center
	const falloffRadius = 300 // Adjust this value to control where the wave starts to appear

	// Calculate the falloff effect, which scales from 0 (center) to 1 (beyond falloffRadius)
	let falloffFactor = Math.min(distanceFromCenter / falloffRadius, 1)

	// Optional: Apply a non-linear easing function to control the smoothness of the transition (quadratic)
	falloffFactor = Math.pow(falloffFactor, 2) // Eases the wave distortion (quadratic falloff)

	// --- Radial Tree Ring Effect ---
	const ringFrequency = 60 + yFactor // Controls the frequency of the rings
	const ringAmplitude = 10 + yFactor // Controls the amplitude of the rings
	const timeEffect = Math.sin(time / 3) * 100 // Optional time effect to animate the rings

	// Apply a radial sine wave to create the ring effect
	const radialEffect = Math.sin((distanceFromCenter + timeEffect) / ringFrequency) * ringAmplitude

	// distort in a way that makes it less circular
	const distortionFactor = 40 * xFactor
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
