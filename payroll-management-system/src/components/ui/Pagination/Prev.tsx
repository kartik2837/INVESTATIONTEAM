import classNames from 'classnames'
import { HiChevronLeft } from 'react-icons/hi'
import type { CommonProps } from '../@types/common'
import type { MouseEvent, ReactElement } from 'react'

interface PrevProps extends CommonProps {
    currentPage: number
    label?: string | ReactElement
    pagerClass: {
        default: string
        inactive: string
        active: string
        disabled: string
        custom?: string
    }
    onPrev: (e: MouseEvent<HTMLSpanElement>) => void
}

const Prev = (props: PrevProps) => {
    const { currentPage, pagerClass, onPrev, label } = props

    const disabled = currentPage <= 1

    const onPrevClick = (e: MouseEvent<HTMLSpanElement>) => {
        if (disabled) {
            return
        }
        onPrev(e)
    }

    const pagerPrevClass = classNames(
        pagerClass.default,
        'pagination-pager-prev',
        pagerClass?.custom || '',
        disabled ? pagerClass.disabled : pagerClass.inactive,
    )

    return (
        <span
            className={pagerPrevClass}
            role="presentation"
            onClick={onPrevClick}
        >
            {label ? label : <HiChevronLeft />}
        </span>
    )
}

export default Prev
