import Script from "next/script"
import {
	BASE_URL,
	INSTAGRAM_URL,
	LINKEDIN_URL,
	SITE_DESCRIPTION,
	SITE_TITLE,
	TIKTOK_URL,
	TWITTER_URL,
	YOUTUBE_URL,
} from "../lib/const"

const casey = {
	"@type": "Person",
	name: "Casey Pugh",
	description: "Co-founder",
	url: ["https://www.caseypugh.com/", "https://twitter.com/caseypugh"],
}

const charlie = {
	"@type": "Person",
	name: "Charlie Tran",
	description: "Co-founder",
	url: ["https://www.charlietran.com/", "https://twitter.com/charlietran"],
}

const websiteSchema = {
	"@context": "http://schema.org",
	"@type": "WebSite",
	name: SITE_TITLE,
	description: SITE_DESCRIPTION,
	url: BASE_URL,
	sameAs: [TWITTER_URL, INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_URL, TIKTOK_URL],
	author: [casey, charlie],
}

export default function StructuredSchema() {
	return (
		<>
			<Script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
				strategy="beforeInteractive"
			/>
		</>
	)
}
