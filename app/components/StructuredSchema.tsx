import { BASE_URL, INSTAGRAM_URL, LINKEDIN_URL, TIKTOK_URL, TWITTER_URL, YOUTUBE_URL } from "../lib/const"
import { Organization, Person, WithContext } from "schema-dts"

const casey: Person = {
	"@type": "Person",
	name: "Casey Pugh",
	sameAs: ["https://www.caseypugh.com/", "https://twitter.com/caseypugh"],
}

const charlie: Person = {
	"@type": "Person",
	name: "Charlie Tran",
	sameAs: ["https://www.charlietran.com/", "https://twitter.com/charlietran"],
}

const a16z: Organization = {
	"@type": "Organization",
	name: "Andreessen Horowitz",
	sameAs: "https://en.wikipedia.org/wiki/Andreessen_Horowitz",
}

const snoot: Organization = {
	"@type": "Organization",
	name: "Snoot Entertainment",
	sameAs: "https://www.snoot.com/",
}

const defSchema: WithContext<Organization> = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "Definitely Games",
	url: BASE_URL,
	sameAs: [TWITTER_URL, INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_URL, TIKTOK_URL],
	founder: [casey, charlie],
	funder: [a16z, snoot],
}

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
export default function StructuredSchema() {
	return (
		<>
			<script
				id="schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify([defSchema]) }}
			/>
		</>
	)
}
