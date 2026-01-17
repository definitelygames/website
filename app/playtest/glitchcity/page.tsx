"use client"
import { useState } from "react"
import DefinitelyGamesLogo from "../../components/DefinitelyGamesLogo"
import { MailchimpForm } from "../../components/EmailSignup"

// MailChimp tag ID for Glitch City playtest auto-tagging
const GLITCH_CITY_TAG_ID = "4891821"

export default function GlitchPlaytestPage() {
	const [submitted, setSubmitted] = useState(false)

	function onSuccess() {
		setSubmitted(true)
	}

	return (
		<div className="flex min-h-screen flex-col bg-secondary px-6 py-8">
			<div className="w-48">
				<DefinitelyGamesLogo />
			</div>

			<div className="flex flex-1 flex-col items-center justify-center">
				<div className="w-full max-w-md space-y-8 text-center">
					<div className="space-y-4">
						<h1 className="text-4xl font-bold text-primary">Thanks for playing!</h1>
						<p className="text-primary/80 text-lg">
							Sign up to get access to our Discord, game updates, and Steam keys.
						</p>
					</div>

					<div className="space-y-4">
						{submitted && <p className="text-xl text-primary">👻 You&apos;re in! Check your email.</p>}
						<MailchimpForm
							className="placeholder:text-primary/50 mx-auto max-w-sm border-b border-primary pb-2 text-primary"
							onSuccess={onSuccess}
							tagId={GLITCH_CITY_TAG_ID}
							autoFocus
							placeholder="your@email.com"
						/>
						<p className="text-primary/60 text-sm">No spam, just game updates. Unsubscribe anytime.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
