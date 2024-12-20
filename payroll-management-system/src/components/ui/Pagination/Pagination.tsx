import { useState, useEffect, useMemo } from 'react'
import Pager from './Pagers'
import Prev from './Prev'
import Next from './Next'
import Total from './Total'
import useControllableState from '../hooks/useControllableState'
import classNames from 'classnames'
import type { CommonProps } from '../@types/common'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

export interface PaginationProps extends CommonProps {
    currentPage?: number
    displayTotal?: boolean
    onChange?: (pageNumber: number) => void
    pageSize?: number
    total?: number
    hidePager?: boolean
    currentOnly?: boolean
}

const defaultTotal = 1

const Pagination = (props: PaginationProps) => {
    const {
        className,
        currentPage = 1,
        displayTotal = false,
        onChange,
        pageSize = 1,
        total = 5,
        hidePager = false,
        currentOnly = false,
    } = props

    const [paginationTotal] = useControllableState({
        prop: total,
        defaultProp: defaultTotal,
        onChange,
    })

    const [internalPageSize, setInternalPageSize] = useState(pageSize)

    const getInternalPageCount = useMemo(() => {
        if (typeof paginationTotal === 'number') {
            return Math.ceil(paginationTotal / internalPageSize)
        }
        return null
    }, [paginationTotal, internalPageSize])

    const getValidCurrentPage = (count: number | string) => {
        const value = parseInt(count as string, 10)
        const internalPageCount = getInternalPageCount
        let resetValue
        if (!internalPageCount) {
            if (isNaN(value) || value < 1) {
                resetValue = 1
            }
        } else {
            if (value < 1) {
                resetValue = 1
            }
            if (value > internalPageCount) {
                resetValue = internalPageCount
            }
        }

        if ((resetValue === undefined && isNaN(value)) || resetValue === 0) {
            resetValue = 1
        }

        return resetValue === undefined ? value : resetValue
    }

    const [internalCurrentPage, setInternalCurrentPage] = useState(
        currentPage ? getValidCurrentPage(currentPage) : 1,
    )

    useEffect(() => {
        if (pageSize !== internalPageSize) {
            setInternalPageSize(pageSize)
        }

        if (currentPage !== internalCurrentPage) {
            setInternalCurrentPage(currentPage)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, currentPage])

    const onPaginationChange = (val: number) => {
        setInternalCurrentPage(getValidCurrentPage(val))
        onChange?.(getValidCurrentPage(val))
    }

    const onPrev = () => {
        const newPage = internalCurrentPage - 1
        setInternalCurrentPage(getValidCurrentPage(newPage))
        onChange?.(getValidCurrentPage(newPage))
    }

    const onNext = () => {
        const newPage = internalCurrentPage + 1
        setInternalCurrentPage(getValidCurrentPage(newPage))
        onChange?.(getValidCurrentPage(newPage))
    }

    const pagerClass = {
        default: 'pagination-pager',
        custom: 'block h-auto w-auto border rounded-lg text-xs m-0 mx-1',
        inactive: 'pagination-pager-inactive',
        active: `text-primary bg-primary-50 hover:bg-primary-50 dark:bg-primary dark:text-neutral`,
        disabled: 'pagination-pager-disabled',
    }

    const paginationClass = classNames('pagination', className)

    return (
        <div className={paginationClass}>
            {displayTotal && (
                <Total
                    total={total}
                    page={internalCurrentPage}
                    pages={getInternalPageCount}
                />
            )}
            <Prev
                currentPage={internalCurrentPage}
                pagerClass={pagerClass}
                label={
                    <span className="flex items-center pr-2 py-1 text-xs border border-transparent rounded-lg hover:border-primary">
                        <HiChevronLeft size={18} /> Prev
                    </span>
                }
                onPrev={onPrev}
            />
            {!hidePager ? (
                <Pager
                    pageCount={getInternalPageCount as number}
                    currentPage={internalCurrentPage}
                    pagerClass={pagerClass}
                    onChange={onPaginationChange}
                    currentOnly={currentOnly}
                />
            ) : null}
            <Next
                currentPage={internalCurrentPage}
                pageCount={getInternalPageCount as number}
                pagerClass={pagerClass}
                label={
                    <span className="flex items-center pl-2 py-1 text-xs border border-transparent rounded-lg hover:border-primary">
                        Next <HiChevronRight size={18} />
                    </span>
                }
                onNext={onNext}
            />
        </div>
    )
}

Pagination.displayName = 'Pagination'

export default Pagination
