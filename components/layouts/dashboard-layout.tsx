import { Avatar } from '@mui/material';
import React, {FC,Fragment} from 'react';  
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { NextRouter, useRouter } from 'next/router';
import { TailwindCssStyles } from '../../utils/tailwindStyles';
import { DashboardTopBar } from './dashboard-top-bar';


type Props={
    children : JSX.Element;
}
const DashboardLayout : FC<Props> = ({children}) => {
    
    const router : NextRouter = useRouter();
    //const style = 'w-full flex justify-center text-base font-semibold cursor-pointer bg-white text-[#6157A0]';
    return(
        <Fragment>
            <div className='flex'>
                <div className='hidden lg:flex lg:w-64 xl:w-72 bg-[#6157A0] h-full text-white'>
                    <div className='fixed lg:flex lg:w-64 xl:w-72 h-full bg-[#6157A0]'>
                        <div className="w-full h-auto mt-20">
                            <div className="flex justify-center">
                                <Avatar src={'/static-img.png'} sx={{
                                    width : '110px',
                                    height : '110px'
                                }}/>
                            </div>

                            <div className='text-center my-4 text-lg font-semibold'>
                                <p>Oluwadamilola</p>
                                <p>Adeyemi</p>
                            </div>

                            <section className='my-8 w-full flex flex-col'>
                                <div className={
                                    router.pathname.includes('new-registration')?
                                    TailwindCssStyles.SIDEBAR_PATH_NAVIGATION_STYLE
                                    :TailwindCssStyles.SIDERBAR_NAVIGATION_DEFAULT
                                }>
                                    <div className='flex flex-row items-center gap-2 py-1'>
                                        <ControlPointRoundedIcon sx={{fontSize : '18px'}}/>
                                        <p>New&nbsp;Registration</p>
                                    </div>
                                </div>

                                <div className={
                                    router.pathname.includes('my-businesses')?
                                    TailwindCssStyles.SIDEBAR_PATH_NAVIGATION_STYLE
                                    :TailwindCssStyles.SIDERBAR_NAVIGATION_DEFAULT
                                }>
                                    <div className='flex flex-row items-center gap-2 py-1'>
                                        <BusinessCenterOutlinedIcon sx={{fontSize : '18px'}}/>
                                        <p>My&nbsp;Businesses<span className='invisible'>en</span></p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div className='flex-1 bg-white'>
                    <DashboardTopBar/>
                    {children}
                </div>
            </div>
        </Fragment>
    );
} 

export default DashboardLayout;