import Link from 'next/link';
import React from 'react';

export const ForgotPasswordForm = () : JSX.Element => {
    return(
        <div className='w-full flex justify-center items-center'>
            <div className='w-4/5 my-8 p-8'>
                <p className='text-4xl text-[#303030] font-bold py-2 capitalize'>Forgot your password?</p>
                <p className='text-lg text-[#303030] font-semibold'>Provide us with your e-mail address</p>

                <div className='my-8'>
                    <form>
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize text-[#303030] font-bold text-xs'>Email Address</p>
                            <input type={"email"} 
                            className="w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" 
                            required
                            placeholder='youremail@whatever.com'/>
                        </div>

                        <input type={"submit"}
                        value="Reset Password"
                        className="w-full p-3 
                        text-[#fff] text-xs 
                        bg-[#6157A0] 
                        rounded-md my-2
                        cursor-pointer
                        hover:shadow-lg transition-shadow duration-300 delay-200"
                        />
                    </form>

                    <div className='text-center p-4 text-sm'>
                        <p>Do you remember your password?&nbsp;
                        <Link href={'/login'} passHref>
                            <span className='text-[#6157A0] hover:underline cursor-pointer font-bold'>Log&nbsp;In</span>
                        </Link>
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}