export default function Validation(errors: any, field: string) {
	return (
		errors[field]?.length && (
			<div>
				<div className="alert alert-danger">{errors[field]}</div>
			</div>
		)
	);
}
