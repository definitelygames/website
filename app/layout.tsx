import type { Metadata } from "next"
import "./globals.css"
import { BASE_URL, GOOGLE_TAG_MANAGER_ID, SITE_DESCRIPTION, SITE_TITLE } from "./lib/const"
import { GoogleTagManager } from "@next/third-parties/google"

const title = SITE_TITLE
const description = SITE_DESCRIPTION
export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
		type: "website",
		locale: "en_US",
		url: BASE_URL,
		siteName: title,
		images: [
			{
				url: `${BASE_URL}/def-social-image.png`,
				width: 1280,
				height: 720,
				alt: title,
			},
		],
	},
	twitter: {
		site: "@defgames",
		card: "summary_large_image",
		title,
		description,
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			{GOOGLE_TAG_MANAGER_ID && <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />}
			<head>
				<link rel="preload" href="https://use.typekit.net/pne2lcw.css" as="style" />
				<link rel="stylesheet" href="https://use.typekit.net/pne2lcw.css" />
			</head>
			<body className={`antialiased`}>{children}</body>
		</html>
	)
}
