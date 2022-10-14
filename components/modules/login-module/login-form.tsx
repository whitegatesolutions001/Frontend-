import Link from 'next/link';
import React from 'react';

export const LoginForm = () : JSX.Element => {
    return(
        <div className='w-full flex justify-center items-center'>
            <div className='w-4/5 my-8 p-8'>
                <p className='text-4xl text-[#303030] font-bold py-6'>Welcome to your 
                <br/>
                Compliance Assistant</p>

                <div className='my-8'>
                    <form>
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize text-[#303030] font-bold text-xs'>Email Address</p>
                            <input type={"email"} 
                            className="w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" 
                            required
                            placeholder='youremail@whatever.com'/>
                        </div>

                        <div className='flex flex-col mb-2'>
                            <p className='capitalize text-[#303030] font-bold text-xs'>password</p>
                            <input type={"password"} 
                            className="w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" 
                            required
                            placeholder='............'/>
                        </div>
                        
                        <div className='flex justify-between gap-4 items-center my-4 text-xs font-bold'>
                            <div className='flex flex-row items-center gap-2'>
                                <input type={"checkbox"}/>
                                <span className=' text-[#303030]'>Remember me</span>
                            </div>

                            <Link href={'/forgot-password'} passHref>
                                <span className='text-[#6157A0] hover:underline cursor-pointer'>Forgot Password?</span>
                            </Link>
                        </div>

                        <input type={"submit"}
                        value="Login"
                        className="w-full p-3 
                        text-[#fff] text-xs 
                        bg-[#6157A0] 
                        rounded-md my-2
                        cursor-pointer
                        hover:shadow-lg transition-shadow duration-300 delay-200"
                        />
                    </form>

                    <div className='text-center p-4 text-sm'>
                        <p>Don&apos;t have an account?&nbsp;
                        <Link href={'/signUp'} passHref>
                            <span className='text-[#6157A0] hover:underline cursor-pointer font-bold'>SignUp</span>
                        </Link>
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}