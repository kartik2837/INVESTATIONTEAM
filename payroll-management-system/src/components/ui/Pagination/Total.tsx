const Total = (props: {
    total: number
    page: number
    pages: number | null
}) => {
    const { total, page, pages } = props
    return (
        <div className="pagination-total">
            Page {page} of {pages}
        </div>
    )
}

export default Total
