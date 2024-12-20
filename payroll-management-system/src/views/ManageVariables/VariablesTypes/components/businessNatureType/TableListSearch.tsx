import { forwardRef } from 'react'
import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'

type TableListSearchProps = {
    onInputChange: (value: string) => void
}

const TableListSearch = forwardRef<
    HTMLInputElement,
    TableListSearchProps
>((props, ref) => {
    const { onInputChange } = props

    return (
        <DebouceInput
            ref={ref}
            placeholder="Quick search..."
            suffix={<TbSearch className="text-lg" />}
            onChange={(e) => onInputChange(e.target.value)}
        />
    )
})

TableListSearch.displayName = 'TableListSearch'

export default TableListSearch
