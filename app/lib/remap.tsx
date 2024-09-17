export function remap(value: number, low1: number, high1: number, low2: number, high2: number) {
	return low2 + ((value - low1) * (high2 - low2)) / (high1 - low1)
}

export function clampRemap(value: number, low1: number, high1: number, low2: number, high2: number) {
	return Math.min(high2, Math.max(low2, remap(value, low1, high1, low2, high2)))
}
