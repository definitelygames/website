interface Props {
	className?: string
}
export default function Arrow({ className }: Props) {
	return (
		<div className={className}>
			<svg className="w-full" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M0.192383 2.82843C0.192383 1.04662 2.34667 0.154284 3.6066 1.41421L7.97056 5.77817C8.75161 6.55922 8.75161 7.82555 7.97056 8.6066L3.6066 12.9706C2.34667 14.2305 0.192383 13.3382 0.192383 11.5563V7.19239V2.82843Z"
					className="fill-foreground"
				/>
			</svg>
		</div>
	)
}
