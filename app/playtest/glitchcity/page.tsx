"use client"
import { useState } from "react"
import Link from "next/link"
import DefinitelyGamesLogo from "../../components/DefinitelyGamesLogo"
import { MailchimpForm } from "../../components/EmailSignup"
import SocialIcons from "../../components/SocialIcons"

// MailChimp tag ID for Glitch City playtest auto-tagging
const GLITCH_CITY_TAG_ID = "4891821"

export default function GlitchPlaytestPage() {
	const [submitted, setSubmitted] = useState(false)

	function onSuccess() {
		setSubmitted(true)
	}

	return (
		<div className="flex h-dvh flex-col overflow-hidden bg-secondary px-6 py-6 md:py-8">
			<Link href="/" className="w-32 md:w-48">
				<DefinitelyGamesLogo />
			</Link>

			<div className="flex flex-1 flex-col items-center justify-center">
				<div className="w-full max-w-md space-y-6 text-center md:space-y-8">
					<div className="space-y-2 md:space-y-4">
						<h1 className="text-2xl font-bold text-primary md:text-4xl">Thanks for playing with us at Glitch City!</h1>
						<p className="text-primary/80 text-base md:text-lg">
          <a class="link" href="https://discord.gg/kB9x5VdZ">Join our Discord</a> if you'd like to follow our progress and get into the next playtest.
						</p>
						<p className="text-primary/80 text-base md:text-lg">
							Or sign up for our company newsletter:
						</p>
					</div>

					<div className="space-y-3 md:space-y-4">
						{submitted && (
							<p className="text-lg text-primary md:text-xl">👻 You&apos;re in! Check your email.</p>
						)}
						<MailchimpForm
							className="placeholder:text-primary/50 mx-auto max-w-sm border-b border-primary pb-2 text-primary"
							onSuccess={onSuccess}
							tagId={GLITCH_CITY_TAG_ID}
							autoFocus
							placeholder="your@email.com"
						/>
						<p className="text-primary/60 text-xs md:text-sm">
							No spam, just game updates. Unsubscribe anytime.
						</p>
					</div>
				</div>
			</div>

			<SocialIcons singleRow className="justify-center" />
		</div>
	)
}
