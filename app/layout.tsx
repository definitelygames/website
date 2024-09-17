import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
	title: "Definitely Games",
	description: "Making games since 2024.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				{process.env.GOOGLE_TAG_MANAGER_ID && (
					<script
						dangerouslySetInnerHTML={{
							__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GOOGLE_TAG_MANAGER_ID}');`,
						}}
					/>
				)}

				<link rel="preload" href="https://use.typekit.net/pne2lcw.css" as="style" />
				<link rel="stylesheet" href="https://use.typekit.net/pne2lcw.css" />
			</head>
			<body className={`antialiased`}>
				{process.env.GOOGLE_TAG_MANAGER_ID && (
					<noscript
						dangerouslySetInnerHTML={{
							__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_MANAGER_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
						}}
					/>
				)}
				{children}
			</body>
		</html>
	)
}
