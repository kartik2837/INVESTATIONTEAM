import SideNav from '@/components/template/SideNav'
import Header from '@/components/template/Header'
import SideNavToggle from '@/components/template/SideNavToggle'
import MobileNav from '@/components/template/MobileNav'
import UserProfileDropdown from '@/components//template/UserProfileDropdown'
import LayoutBase from '@/components//template/LayoutBase'
import useResponsive from '@/utils/hooks/useResponsive'
import { LAYOUT_COLLAPSIBLE_SIDE } from '@/constants/theme.constant'
import type { CommonProps } from '@/@types/common'
import ThemeSwitcher from '@/components/template/ThemeConfigurator/ThemeSwitcher'
import ModeSwitcher from '@/components/template/ThemeConfigurator/ModeSwitcher'
import { Button, Dropdown } from '@/components/ui'
import { LuSettings } from 'react-icons/lu'

const CollapsibleSide = ({ children }: CommonProps) => {
    const { larger, smaller } = useResponsive()

    return (
        <LayoutBase
            type={LAYOUT_COLLAPSIBLE_SIDE}
            className="app-layout-collapsible-side flex flex-auto flex-col"
        >
            <div className="flex flex-auto min-w-0">
                {larger.lg && <SideNav />}
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        className="shadow dark:shadow-2xl"
                        headerStart={
                            <>
                                {smaller.lg && <MobileNav />}
                                {larger.lg && <SideNavToggle />}
                            </>
                        }
                        headerEnd={
                            <div className="flex items-center gap-4">
                                <Dropdown
                                    renderTitle={
                                        <Button variant="plain" className="p-0">
                                            <LuSettings size={22} />
                                        </Button>
                                    }
                                >
                                    <Dropdown.Item eventKey="a">
                                        <label className="w-full flex items-center justify-between py-4 cursor-pointer">
                                            Color Mode
                                            <ModeSwitcher />
                                        </label>
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="b"
                                        className="mt-4"
                                    >
                                        <ThemeSwitcher />
                                    </Dropdown.Item>
                                </Dropdown>
                                <UserProfileDropdown hoverable={false} />
                            </div>
                        }
                    />
                    <div className="h-full flex flex-auto flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </LayoutBase>
    )
}

export default CollapsibleSide
