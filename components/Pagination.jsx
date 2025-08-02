import Link from "next/link";

function Pagination({ page, pageSize, totalItems }) {
  const totalPages = Math.ceil(totalItems / pageSize);
  return (
    <div className="container mx-auto flex justify-center items-center my-8">
      {page > 1 ? (
        <Link
          href={`/properties?page=${page - 1}`}
          className="mr-2 px-2 py-2 border border-gray-300 rounded"
        >
          Previous
        </Link>
      ) : null}

      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={`/properties?page=${page + 1}`}
          className="mr-2 px-2 py-2 border border-gray-300 rounded"
        >
          Next
        </Link>
      ) : null}
    </div>
  );
}

export default Pagination;
