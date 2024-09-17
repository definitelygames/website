/** Send a custom Google Tag Manager event */
export function gtmEvent(event: string, args: any = {}) {
	if (window) {
		;(window as any).dataLayer?.push({
			event,
			...args,
		})
	}
}

export function campaignGenerator(url: string, medium: string, campaign: string): string {
	return `${url}?utm_source=blocks&utm_medium=${medium}&utm_campaign=${campaign}`
}
