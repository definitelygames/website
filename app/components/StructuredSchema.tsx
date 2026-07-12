import {
	BASE_URL,
	EMAIL_URL,
	INSTAGRAM_URL,
	LINKEDIN_URL,
	SITE_DESCRIPTION,
	SITE_TITLE,
	TIKTOK_URL,
	TWITTER_URL,
	YOUTUBE_URL,
} from "../lib/const"
import type { Graph, Organization, Person, WebPage, WebSite } from "schema-dts"

// Stable ids so every node in the graph reconciles to the same entities.
const ORGANIZATION_ID = `${BASE_URL}/#organization`
const WEBSITE_ID = `${BASE_URL}/#website`
const WEBPAGE_ID = `${BASE_URL}/#webpage`
const CASEY_ID = "https://www.caseypugh.com/#person"
const CHARLIE_ID = "https://charlietran.com/#person"

const organizationRef = { "@id": ORGANIZATION_ID } as const

const casey: Person = {
	"@type": "Person",
	"@id": CASEY_ID,
	name: "Casey Pugh",
	url: "https://www.caseypugh.com",
	jobTitle: "Co-founder",
	worksFor: organizationRef,
	sameAs: [
		"https://www.linkedin.com/in/caseypugh/",
		"https://github.com/caseypugh",
		"https://twitter.com/caseypugh/",
		"https://www.instagram.com/caseypugh/",
	],
}

const charlie: Person = {
	"@type": "Person",
	"@id": CHARLIE_ID,
	name: "Charlie Tran",
	url: "https://charlietran.com",
	jobTitle: "Co-founder",
	worksFor: organizationRef,
	sameAs: [
		"https://twitter.com/charlietran",
		"https://www.linkedin.com/in/-charlie-tran-/",
		"https://github.com/charlietran",
	],
}

const defGames: Organization = {
	"@type": "Organization",
	"@id": ORGANIZATION_ID,
	name: SITE_TITLE,
	description: SITE_DESCRIPTION,
	url: BASE_URL,
	logo: `${BASE_URL}/def-outline.svg`,
	image: `${BASE_URL}/def-social-image.png`,
	email: EMAIL_URL.replace("mailto:", ""),
	foundingDate: "2024",
	founder: [{ "@id": CASEY_ID }, { "@id": CHARLIE_ID }],
	funder: [
		{
			"@type": "Organization",
			name: "Andreessen Horowitz",
			sameAs: "https://en.wikipedia.org/wiki/Andreessen_Horowitz",
		},
		{
			"@type": "Organization",
			name: "Snoot Entertainment",
			sameAs: "https://www.snoot.com/",
		},
	],
	sameAs: [TWITTER_URL, INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_URL, TIKTOK_URL],
}

const website: WebSite = {
	"@type": "WebSite",
	"@id": WEBSITE_ID,
	url: BASE_URL,
	name: SITE_TITLE,
	inLanguage: "en-US",
	publisher: organizationRef,
}

// WebPage.about is the schema.org way of saying "this page is about this
// organization" — it ties the home page to the studio entity.
const homePage: WebPage = {
	"@type": "WebPage",
	"@id": WEBPAGE_ID,
	url: BASE_URL,
	name: SITE_TITLE,
	isPartOf: { "@id": WEBSITE_ID },
	about: organizationRef,
}

export const defGraph: Graph = {
	"@context": "https://schema.org",
	"@graph": [defGames, website, homePage, casey, charlie],
}

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
export default function StructuredSchema() {
	return (
		<script
			id="schema"
			type="application/ld+json"
			// Escape `<` so a stray "</script>" in any value can't break out of
			// the tag (standard JSON-LD hardening).
			dangerouslySetInnerHTML={{ __html: JSON.stringify(defGraph).replace(/</g, "\\u003c") }}
		/>
	)
}
