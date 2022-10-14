import Link from 'next/link';
import React from 'react';

export const SignUpForm = () : JSX.Element => {
    return(
        <div className='w-full flex justify-center items-center'>
            <div className='w-4/5 p-8'>
                <p className='text-4xl text-[#303030] font-bold py-6'>Welcome to your 
                <br/>
                Compliance Assistant</p>

                <div className='mt-2 mb-8'>
                    <form>
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize text-[#303030] font-bold text-xs'>First Name</p>
                            <input type={"text"} 
                            className="w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" 
                            required
                            placeholder='philip'/>
                        </div>
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize text-[#303030] font-bold text-xs'>Last Name</p>
                            <input type={"text"} 
                            className="w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" 
                            required
                            placeholder='ajayi'/>
                        </div>

                        <div className='flex flex-col mb-2'>
                            <p className='capitalize text-[#303030] font-bold text-xs'>Email Address</p>
                            <input type={"email"} 
                            className="w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" 
                            required
                            placeholder='philipAjayi@gmail.com'/>
                        </div>

                        <div className='flex flex-col mb-2'>
                            <p className='capitalize text-[#303030] font-bold text-xs'>Phone Number</p>
                            <input type={"text"} 
                            className="w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" 
                            required
                            maxLength={11}
                            placeholder='+23480760828'/>
                        </div>

                        <div className='flex flex-col mb-2'>
                            <p className='capitalize text-[#303030] font-bold text-xs'>set password</p>
                            <input type={"password"} 
                            className="w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" 
                            required
                            placeholder='............'/>
                        </div>
                        
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize text-[#303030] font-bold text-xs'>confirm password</p>
                            <input type={"password"} 
                            className="w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" 
                            required
                            placeholder='............'/>
                        </div>
                        
                        <div className='my-1 text-xs font-bold'>
                            <div className='flex flex-row items-center gap-2'>
                                <input type={"checkbox"}/>
                                <span className=' text-[#303030]'>I agree to the terms and conditions</span>
                            </div>
                        </div>

                        <input type={"submit"}
                        value="Register"
                        className="w-full p-3 
                        text-[#fff] 
                        text-xs bg-[#6157A0] 
                        rounded-md my-2
                        cursor-pointer
                        hover:shadow-lg transition-shadow duration-300 delay-200"
                        />
                    </form>

                    <div className='text-center text-sm'>
                        <p>Already have an account?&nbsp;
                        <Link href={'/login'} passHref>
                            <span className='text-[#6157A0] hover:underline cursor-pointer font-bold'>Login</span>
                        </Link>
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}