import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "High Spirited Playtest - Definitely Games",
	description: "Thanks for checking out our game! Sign up for updates.",
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false,
		},
	},
}

export default function PlaytestLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
