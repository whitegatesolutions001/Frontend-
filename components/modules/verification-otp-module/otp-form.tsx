import React, {useState, useEffect} from 'react';
import { IconButton } from '@mui/material';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {NextRouter, useRouter} from 'next/router';
import Link from 'next/link';

let currentOTPIndex : number = 0;

export const OTPForm = () : JSX.Element => {

    const router : NextRouter = useRouter();

    const [otp, setOTP]  = useState<string[]>(new Array(6).fill(""));
    const [activeOtpIndex, setActiveOtpIndex] = React.useState<number>(0);

    const otpRef : React.MutableRefObject<any> = React.useRef(null);

    const handleOtpInputChange = ({target} : React.ChangeEvent<HTMLInputElement>) :void => {
        const { value } = target;
        //getting the last value inside the index; and updating the otp value array using the index from the map
       const newOTP = [...otp];
       newOTP[currentOTPIndex] = value.substring(value.length- 1);
       //if statement to determine if input will forward focus or backward focus
        if(!value) setActiveOtpIndex(currentOTPIndex - 1);
        else  setActiveOtpIndex(currentOTPIndex + 1);
       setOTP(newOTP); 
    }

    const handleKeyEvent = ({key} : React.KeyboardEvent<HTMLInputElement>, index : number) :void =>{
        currentOTPIndex = index;
        if(key === "Backspace") setActiveOtpIndex(currentOTPIndex - 1);
    }

    const goBackHandler = () : void =>{
        router.back();
    } 
    
    React.useEffect(() => {

        otpRef.current?.focus();

    },[activeOtpIndex]);

    return(
        <div className='w-full flex justify-center items-center'>
            <div className='w-4/5 py-8 sm:py-0 md:p-6 lg:p-8'>
                <div className='w-full h-auto flex justify-start'>
                    {/* icon */}
                    <IconButton>
                        <ArrowBackRoundedIcon sx={{color : '#6157A0', fontSize : '30px'}}/>
                    </IconButton>
                </div>

                <div className='my-32'>
                    <p className='text-4xl text-[#303030] font-bold py-2 capitalize'>Verification</p>
                    <p className='text-lg text-[#303030] font-semibold'>Please type in the One-Time password sent to your email</p>

                    <form>
                    
                        <div className='w-full flex flex-row gap-2 md:gap-4 lg:gap-8 items-center'>
                        {
                        otp && otp.map((_, index : number) =>

                            <input type="text" 
                            key={index}
                            onChange={(e) => handleOtpInputChange(e)}
                            className='w-10 md:w-12 p-2.5 rounded-md 
                            border border-[#303030] my-12
                            focus:border-[#6157A0]
                            text-lg text-black font-semibold text-center'
                            ref={index === activeOtpIndex ? otpRef : null}
                            value={otp[index]}
                            onKeyDown={(e) => handleKeyEvent(e, index)}/>
                        )}
                        </div>
                        <input type={"submit"}
                        value="Proceed"
                        className="w-full
                         p-3 text-[#fff] 
                         text-xs bg-[#6157A0] 
                         rounded-md my-2
                         cursor-pointer
                         hover:shadow-lg transition-shadow duration-300 delay-200"
                        />
                    </form>

                    <div className='text-center p-4 text-sm'>
                        <p>Did&apos;nt get a One-Time password?&nbsp;
                        <Link href={'/otp-verification'} passHref>
                            <span className='text-[#6157A0] hover:underline cursor-pointer font-bold'>ResendOTP</span>
                        </Link>
                        </p>
                        
                    </div>
                    
                </div>
            </div>

        </div>
    );
}