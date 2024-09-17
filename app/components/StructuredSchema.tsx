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
import { Person, WebSite } from "schema-dts"

const casey: Person = {
	"@type": "Person",
	name: "Casey Pugh",
	description: "Co-founder",
	url: ["https://www.caseypugh.com/", "https://twitter.com/caseypugh"],
}

const charlie: Person = {
	"@type": "Person",
	name: "Charlie Tran",
	description: "Co-founder",
	url: ["https://www.charlietran.com/", "https://twitter.com/charlietran"],
}

const websiteSchema: WebSite = {
	"@type": "WebSite",
	name: SITE_TITLE,
	description: SITE_DESCRIPTION,
	url: BASE_URL,
	sameAs: [TWITTER_URL, INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_URL, TIKTOK_URL],
	author: [casey, charlie],
}

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
export default function StructuredSchema() {
	return (
		<>
			<script
				id="website-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
			/>
		</>
	)
}
