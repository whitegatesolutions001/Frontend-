import Link from 'next/link';
import React from 'react';
import { ErrorInterfaceObj, LoginDetailsInterface } from '../../../utils/constants';
import { validateEmail, validatePassword } from '../../../utils/util-functions';

const initialState :LoginDetailsInterface = {
    email : '',
    password : ''
};

const initialErrorObj : ErrorInterfaceObj = {
    msg : '',
    isError : false
};

export const LoginForm = () : JSX.Element => {
    const [loginDetails, setLoginDetails] = React.useState<LoginDetailsInterface>({...initialState});
    const [emailError, setEmailError] = React.useState<ErrorInterfaceObj>(initialErrorObj);
    const [passwordError, setPasswordError] = React.useState<ErrorInterfaceObj>(initialErrorObj);
    const [rememberMe, setRememberMe] = React.useState<boolean>(false);


    const emailOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validateEmail(value)){
            setLoginDetails({...loginDetails, email : value});
            setEmailError({...emailError, msg : 'valid', isError : false}); 
        }else {
            setEmailError({...emailError, msg : 'Invalid Email Address', isError : true}); 
        }  
    }
    
    const setPasswordOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validatePassword(value)){
            setLoginDetails({...loginDetails, password : value});
            setPasswordError({...passwordError, isError : false});
        }
        else setPasswordError({...passwordError,
            msg : "Password length must be at least 8 characters, must contain upper and lowercase alphabets,special character",
            isError : true}
        );
    }
    
    const onSubmitHandler = (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(loginDetails);
    }
    React.useEffect(() =>{},[loginDetails]);

    return(
        <div className='w-full flex justify-center items-center'>
            <div className='w-4/5 my-8 p-4 md:p-8'>
                <p className='text-4xl  font-bold py-6'>Welcome to your 
                <br/>
                Compliance Assistant</p>

                <div className='my-8'>
                    <form onSubmit={onSubmitHandler}>
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>Email Address</p>
                            <input type={"email"} 
                            className={emailError.isError
                                ?"text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-4 mb-2"
                                :"text-black w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" }
                            required
                            placeholder='youremail@whatever.com'
                            onChange={(e) => emailOnchangeHandler(e)}/>
                            {emailError.isError && <span className='text-xs text-[#DC143C]'>{emailError.msg}</span>}
                        </div>

                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>password</p>
                            <input type={"password"} 
                            className={passwordError.isError
                                ? "text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-4 mb-2"
                                :"text-black w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" }
                            required
                            placeholder='............'
                            onChange={(e) => setPasswordOnchangeHandler(e)}/>
                            {passwordError.isError && <span className='text-xs text-[#DC143C]'>{passwordError.msg}</span>}
                        </div>
                        
                        <div className='flex justify-between gap-4 items-center my-4 text-xs font-bold'>
                            <div className='flex flex-row items-center gap-2'>
                                <input type={"checkbox"} onChange={(e) => setRememberMe(e.target.checked)}/>
                                <span className=''>Remember me</span>
                            </div>

                            <Link href={'/forgot-password'} passHref>
                                <span className='text-[#6157A0] hover:underline cursor-pointer'>Forgot Password?</span>
                            </Link>
                        </div>

                        <input type={"submit"}
                        value="Login"
                        className={validateEmail(loginDetails.email) &&!emailError.isError
                            && validatePassword(loginDetails.password) && !passwordError.isError
                            ?"w-full p-3 text-[#fff] text-xs bg-[#6157A0] rounded-md my-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 delay-200"
                            :"w-full p-3 bg-[#EFF0F6] text-xs text-gray-500 rounded-md my-2"
                        }
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