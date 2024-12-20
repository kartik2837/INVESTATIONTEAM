import { forwardRef } from 'react'
import { TbSearch } from 'react-icons/tb'
import DebouceInput from '@/components/shared/DebouceInput'

type TableListSearchProps = {
    onInputChange: (value: string) => void
}

const TableListSearch = forwardRef<HTMLInputElement, TableListSearchProps>(
    (props, ref) => {
        const { onInputChange } = props

        return (
            <DebouceInput
                ref={ref}
                placeholder="Search Leave Type..."
                suffix={<TbSearch className="text-lg" />}
                onChange={(e) => onInputChange(e.target.value)} // Capture input value
            />
        )
    },
)

TableListSearch.displayName = 'TableListSearch'
export default TableListSearch
