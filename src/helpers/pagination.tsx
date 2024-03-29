const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className="flex justify-center items-center space-x-2">
			<button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
				Previous
			</button>
			{pages.map((page) => (
				<button key={page} className={`${currentPage === page ? "text-red-500" : ""}`} onClick={() => onPageChange(page)}>
					{page}
				</button>
			))}
			<button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
				Next
			</button>
		</div>
	);
};

export default Pagination;
