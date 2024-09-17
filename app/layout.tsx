import type { Metadata } from "next"
import "./globals.css"
import { BASE_URL, GOOGLE_TAG_MANAGER_ID, SITE_DESCRIPTION, SITE_TITLE } from "./lib/const"

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
			<head>
				{GOOGLE_TAG_MANAGER_ID && (
					<script
						dangerouslySetInnerHTML={{
							__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');`,
						}}
					/>
				)}

				<link rel="preload" href="https://use.typekit.net/pne2lcw.css" as="style" />
				<link rel="stylesheet" href="https://use.typekit.net/pne2lcw.css" />
			</head>
			<body className={`antialiased`}>
				{GOOGLE_TAG_MANAGER_ID && (
					<noscript
						dangerouslySetInnerHTML={{
							__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
						}}
					/>
				)}
				{children}
			</body>
		</html>
	)
}
