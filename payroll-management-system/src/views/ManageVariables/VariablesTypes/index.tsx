import { Container } from '@/components/shared'

import { lazy, Suspense } from 'react'
import SettingsMenu from './components/SettingsMenu'
import SettingMobileMenu from './components/SettingMobileMenu'
import useResponsive from '@/utils/hooks/useResponsive'
import { useSettingsStore } from './store/settingsStore'
import BusinessNatureType from './components/BusinessNatureType'

const LeaveType = lazy(() => import('./components/LeaveType'))


const Home = () => {
    

    const { currentView } = useSettingsStore()

    const { smaller, larger } = useResponsive()

    return (
        <>
            <Container>

                <div className="flex flex-auto h-full">
                        {larger.lg && (
                            <div className="w-[200px] xl:w-[280px] card card-border py-2">
                                <SettingsMenu />
                            </div>
                        )}
                        <div className="ltr:xl:pl-6 rtl:xl:pr-6 flex-1">
                            {smaller.lg && (
                                <div className="mb-6">
                                    <SettingMobileMenu />
                                </div>
                            )}
                            <Suspense>
                            {currentView === 'leaveType' && <LeaveType />}
                             {currentView === 'businessNatureType' && <BusinessNatureType />}
                            </Suspense>
                        </div>
                    </div>
            </Container>
        </>
    )
}

export default Home
