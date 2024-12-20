import { Checkbox } from '@/components/ui'
import type { Permission } from '../types'
import classNames from '@/utils/classNames'

// const methodBackground = {
//     GET: 'bg-green-600',
//     POST: 'bg-orange-600',
//     PATCH: 'bg-violet-600',
//     DELETE: 'bg-red-600',
// }

const Permission = ({ permission }: { permission: Permission }) => {
    const { name, _id } = permission
    return (
        <Checkbox value={_id} style={{ width: '16px', height: '16px' }}>
            <div className="text-sm">
                <p className="capitalize mt-0.5">{name}</p>
                {/* <p>
                    <span
                        className={classNames(
                            'text-[8px] px-1.5 py-1 rounded-md text-white',
                            methodBackground?.[method],
                        )}
                    >
                        {method}
                    </span>{' '}
                    {route}
                </p> */}
            </div>
        </Checkbox>
    )
}

export default Permission
