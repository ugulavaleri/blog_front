export default function Validation(errors: any, field: string) {
	if (errors[field]) {
		return (
			<div className="mt-2">
				<div className="text-red-500">{errors[field]}</div>
			</div>
		);
	}
	return null;
}
