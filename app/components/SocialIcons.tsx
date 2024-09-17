import Link from "next/link"
import classNames from "../lib/classNames"
import {
	FaEnvelope,
	FaInstagram,
	FaLinkedin,
	FaTiktok,
	FaTwitter,
	FaXTwitter,
	FaYoutube,
} from "react-icons/fa6"

export default function SocialIcons({ className }: { className?: string }) {
	const iconClassName =
		"h-6 w-6 transition-all ease-out group-hover:-translate-y-1 group-hover:text-white cursor-pointer"
	return (
		<div className={classNames("grid grid-cols-3 space-x-0 md:flex md:flex-row", className)}>
			<Link href="https://x.com/defgames" target="_blank" className="group relative w-10 p-2">
				<FaTwitter className={classNames(iconClassName, "absolute opacity-0 group-hover:opacity-100")} />
				<FaXTwitter className={classNames(iconClassName, "absolute group-hover:hidden")} />
			</Link>
			<Link href="https://www.instagram.com/defgamesinc/" target="_blank" className="group p-2">
				<FaInstagram className={iconClassName} />
			</Link>
			<Link href="https://www.youtube.com/@defgamesinc" target="_blank" className="group p-2">
				<FaYoutube className={iconClassName} />
			</Link>
			<Link href="https://www.tiktok.com/@def_games" target="_blank" className="group p-2">
				<FaTiktok className={iconClassName} />
			</Link>
			<Link href="https://www.linkedin.com/company/defgames/" target="_blank" className="group p-2">
				<FaLinkedin className={iconClassName} />
			</Link>
			<Link href="mailto:clowns@def.games" target="_blank" className="group p-2">
				<FaEnvelope className={iconClassName} />
			</Link>
		</div>
	)
}
