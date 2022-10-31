import { AxiosError } from 'axios';
import Link from 'next/link';
import React from 'react';
import { getAxiosRequest } from '../../../utils/axios-requests';
import { ErrorInterfaceObj } from '../../../utils/constants';
import { validateEmail } from '../../../utils/util-functions';
import { NextRouter, useRouter } from 'next/router';
import { ReactSpinnerLoader } from '../../shared-components/react-spinner-loader';

const initialErrorObj : ErrorInterfaceObj = {
    msg : '',
    isError : false,
};

export const ForgotPasswordForm = () : JSX.Element => {
    const [email, setEmail] = React.useState<string>('');
    const [emailError, setEmailError] = React.useState({...initialErrorObj});
    const [loader, setLoaderState] = React.useState<boolean>(false);
    const router : NextRouter = useRouter();

    const emailOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validateEmail(value)){
            setEmail(value);
            setEmailError({...emailError, msg : 'valid', isError : false}); 
        }else {
            setEmailError({...emailError, msg : 'Invalid Email Address', isError : true}); 
        }  
    }
    
    const onSubmitHandler = async (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const forgotPasswordRequestObject = {
            uri : `user/verification/initiate-forgot-password-flow/${email}`
        }
        setLoaderState(true);
        await getAxiosRequest(forgotPasswordRequestObject.uri)
        .then((response) => {
            const {data : {data,success, code, message}} = response;
            setLoaderState(false);
            if(success && code === 200){
                setTimeout(() => {
                    router.push('/otp-verification');
                },1000);
            }
        }).catch((error : AxiosError) => {
            setLoaderState(false);
            if(error.isAxiosError){
                const {data : {success, message,code}} = error.response as any;
                if(!success && code !== 200){
                    alert(message);
                }
            }
        });
    }

    React.useEffect(() => {},[email]);

    return(
        <div className='w-full flex justify-center items-center'>
            <div className='w-4/5 my-8 p-4 md:p-8'>
                <p className='text-4xl font-bold py-2 capitalize'>Forgot your password?</p>
                <p className='text-lg font-semibold'>Provide us with your e-mail address</p>

                <div className='my-8'>
                    <form onSubmit={onSubmitHandler}>
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>Email Address</p>
                            <input type={"email"} 
                            className={emailError.isError 
                                ? "text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-4 mb-2"
                                :"w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" }
                            required
                            placeholder='youremail@whatever.com'
                            onChange={(e) => emailOnchangeHandler(e)}
                            />
                            {emailError.isError && <span className='text-xs text-[#DC143C]'>{emailError.msg}</span>}
                        </div>

                        <input type={"submit"}
                        value="Reset Password"
                        className={validateEmail(email) && !emailError.isError
                            ?"w-full p-3 text-[#fff] text-xs bg-[#6157A0] rounded-md my-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 delay-200"
                            :"w-full p-3 bg-[#EFF0F6] text-xs text-gray-500 rounded-md my-2"}
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
            {loader && <ReactSpinnerLoader/>}
        </div>
    );
}