import classNames from 'classnames'
import { HiChevronRight } from 'react-icons/hi'
import type { CommonProps } from '../@types/common'
import type { MouseEvent, ReactElement } from 'react'

interface NextProps extends CommonProps {
    currentPage: number
    label?: string | ReactElement
    pageCount: number
    pagerClass: {
        default: string
        inactive: string
        active: string
        disabled: string
        custom?: string
    }
    onNext: (e: MouseEvent<HTMLSpanElement>) => void
}

const Next = (props: NextProps) => {
    const { currentPage, pageCount, pagerClass, onNext, label } = props

    const disabled = currentPage === pageCount || pageCount === 0

    const onNextClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault()
        if (disabled) {
            return
        }
        onNext(e)
    }

    const pagerNextClass = classNames(
        pagerClass.default,
        'pagination-pager-next',
        pagerClass?.custom || '-',
        disabled ? pagerClass.disabled : pagerClass.inactive,
    )

    return (
        <span
            className={pagerNextClass}
            role="presentation"
            onClick={onNextClick}
        >
            {label ? label : <HiChevronRight />}
        </span>
    )
}

export default Next
