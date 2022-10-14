import React, {FC} from 'react';
import { Constants } from '../../utils/constants';
import Image from 'next/image';

type Props={
    children : JSX.Element
};
//https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940

const AuthLayoutComponent :FC<Props> = ({children}) : JSX.Element => {
    return(
        <div className="w-full h-auto flex flex-col lg:flex-row overflow-x-hidden">
            <div className='lg:w-1/2 hidden lg:flex'>
                <div className='h-screen overflow-hidden container'>
                    <div className='w-full h-screen content'>
                        {/* <Image src={Constants.GIRL_LAWYER} width={"100%"} height="100%" layout='responsive' alt=''/> */}
                        <object data={Constants.GIRL_LAWYER} width="100%" height="100%" className='object-cover'/>
                    </div>
                    <div className='overlay bg-[#6157A0] bg-opacity-30'/>
                </div>
            </div>
            <div className='w-full lg:w-1/2 h-auto lg:max-h-screen lg:overflow-y-auto'>
                {children}
            </div>
        </div>
    );
}

export default AuthLayoutComponent;