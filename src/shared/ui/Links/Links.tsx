import { Link } from "react-router-dom";

interface LinksProps {
	label?: string;
	linkTittle: string;
	to: string;
}

export function Links({ label, linkTittle, to }: LinksProps) {
	return (
		<div className='space-x-2'>
			<label>{label}</label>
			<Link to={to} className='text-cyan-400 hover:underline'>
				{linkTittle}
			</Link>
		</div>
	);
}
