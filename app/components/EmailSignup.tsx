import { FormEvent, useState } from "react"
import classNames from "../lib/classNames"
import Arrow from "./Arrow"

interface Props {
	className?: string
}

export default function EmailSignup({ className }: Props) {
	const [copy, setCopy] = useState("Get updates")
	function onSuccess() {
		setCopy("Thank you! 👻")
	}

	return (
		<div
			className={classNames(
				"flex flex-col space-y-2 border-b border-primary pb-2 md:flex-row md:space-x-7 md:space-y-0",
				className,
			)}>
			<div className="whitespace-nowrap md:w-28">{copy}</div>
			<MailchimpForm className="flex-1" onSuccess={onSuccess} />
		</div>
	)
}

interface FormProps {
	className?: string
	onSuccess?: () => void
	tagId?: string
	autoFocus?: boolean
	placeholder?: string
}

export const MailchimpForm = ({
	className,
	onSuccess,
	tagId,
	autoFocus,
	placeholder = "you@email.rizz",
}: FormProps) => {
	const [email, setEmail] = useState("")
	const [pending, setPending] = useState(false)

	const handleSubmit = async (event: FormEvent) => {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		setEmail("")
		onSuccess?.()
	}

	return (
		<form
			action="https://games.us8.list-manage.com/subscribe/post?u=b8ceb76496f682016133b8e5e&amp;id=ffc17f3258&amp;f_id=008701e0f0"
			onSubmit={handleSubmit}
			method="post"
			target="_blank"
			className={classNames("flex flex-row", className)}>
			<input
				type="email"
				name="EMAIL"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder={placeholder}
				autoFocus={autoFocus}
				data-1p-ignore
				data-lpignore="true"
				className={classNames("w-full transition-opacity", pending ? "opacity-50" : "")}
				required
			/>
			<input
				type="text"
				name="b_b8ceb76496f682016133b8e5e_ffc17f3258"
				className="hidden"
				tabIndex={-1}
				value=""
			/>
			{tagId && <input type="hidden" name="tags" value={tagId} />}
			<input type="submit" name="subscribe" className="hidden" value="Subscribe" tabIndex={-1} />
			<button type="submit">
				<Arrow className={classNames("w-[13px] transition-opacity", pending ? "opacity-50" : "")} />
			</button>
		</form>
	)
}
