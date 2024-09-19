import { FormEvent, useState } from "react"
import classNames from "../lib/classNames"
import Arrow from "./Arrow"

interface Props {
	className?: string
}

export default function EmailSignup({ className }: Props) {
	const [copy, setCopy] = useState("Get email updates")
	function onSuccess() {
		setCopy("Thank you! 👻")
	}

	return (
		<div
			className={classNames(
				"flex flex-col space-y-2 border-b border-primary pb-2 md:flex-row md:space-x-7 md:space-y-0",
				className,
			)}>
			<div className="whitespace-nowrap md:w-36">{copy}</div>
			<MailchimpForm className="flex-1" onSuccess={onSuccess} />
		</div>
	)
}

interface FormProps {
	className?: string
	onSuccess?: () => void
}

const MailchimpForm = ({ className, onSuccess }: FormProps) => {
	const [email, setEmail] = useState("")
	const [pending, setPending] = useState(false)

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()

		const formData = new FormData()
		formData.append("EMAIL", email)
		formData.append("subscribe", "Subscribe")
		formData.append("b_b8ceb76496f682016133b8e5e_ffc17f3258", "")

		try {
			setPending(true)
			await fetch(
				"https://games.us8.list-manage.com/subscribe/post?u=b8ceb76496f682016133b8e5e&id=ffc17f3258&f_id=005c7ce0f0",
				{
					method: "POST",
					body: formData,
					mode: "no-cors",
					headers: {
						Accept: "application/json",
					},
				},
			)
			// it always errors bc we are doing weird CORS hacking, but it actually goes through
			setEmail("")
			onSuccess?.()
		} catch (error) {
			console.error(error)
		}

		setPending(false)
	}

	return (
		<form onSubmit={handleSubmit} method="post" className={classNames("flex flex-row", className)}>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="you@email.rizz"
				className={classNames("w-full transition-opacity", pending ? "opacity-50" : "")}
				required
			/>
			<button type="submit">
				<Arrow className={classNames("w-[13px] transition-opacity", pending ? "opacity-50" : "")} />
			</button>
		</form>
	)
}
