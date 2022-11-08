import { AxiosError } from 'axios';
import Link from 'next/link';
import React from 'react';
import { postAxiosRequest } from '../../../utils/axios-requests';
import { Constants, ErrorInterfaceObj, LoginDetailsInterface } from '../../../utils/constants';
import { validateEmail, validatePassword } from '../../../utils/util-functions';
import { ReactSpinnerLoader } from '../../shared-components/react-spinner-loader';
import { useRouter, NextRouter} from 'next/router';
import { IconButton } from '@mui/material';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const initialState :LoginDetailsInterface = {
    email : '',
    password : ''
};

const initialErrorObj : ErrorInterfaceObj = {
    msg : '',
    isError : false,
};

export const LoginForm = () : JSX.Element => {
    const [loginDetails, setLoginDetails] = React.useState<LoginDetailsInterface>({...initialState});
   // const [temporaryLoginDetails, setTempDetails] = React.useState<LoginDetailsInterface>({...initialState});
    const [emailError, setEmailError] = React.useState<ErrorInterfaceObj>(initialErrorObj);
    const [passwordError, setPasswordError] = React.useState<ErrorInterfaceObj>(initialErrorObj);
    const [boolStates, setBooleanStates] = React.useState({
        rememberMe : false,
        viewPassword : false
    });
    const [loader, setLoaderState] = React.useState<boolean>(false);
    const router : NextRouter = useRouter();


    const emailOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validateEmail(value)){
            setLoginDetails({...loginDetails, email : value});
            setEmailError({...emailError, msg : 'valid', isError : false}); 
        }else {
            setEmailError({...emailError, msg : 'Invalid Email Address', isError : value.length > 1 && true,}); 
        }  
    }
    
    const setPasswordOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validatePassword(value)){
            setLoginDetails({...loginDetails, password : value});
            setPasswordError({...passwordError, isError : false});
        }
        else setPasswordError({...passwordError,
            msg : "Invalid Password",
            isError : value.length > 1 && true}
        );
    }
    
    const onSubmitHandler = async (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(loginDetails);
        const loginRequestObject = {
            uri : 'auth/login',
            body : {
                email : loginDetails.email,
                password : loginDetails.password
            }
        } ;
        setLoaderState(true);
        await postAxiosRequest(loginRequestObject)
        .then((response) => {
            const {data, success, message, code} = response.data;
            if(success && code === 200){
                setLoaderState(false);
                const {token, tokenInitializationDate,tokenExpiryDate,userId} = data;

                if(token && userId){
                     //logic of where to store token as well as implementing app flow here
                     localStorage.setItem('token', token);
                     localStorage.setItem('userId', userId);
                     localStorage.setItem('tokenInitializationDate',tokenInitializationDate);
                     localStorage.setItem('tokenExpiryDate',tokenExpiryDate);
                     localStorage.setItem('message', "LogIn successFul");
                    alert(message);
                    router.push('/view-status');
                }
               
            }
        }).catch((error : AxiosError) => {
            if(error.isAxiosError){
                setLoaderState(false);
                const {data : {success, message, code} } = error.response as any;
                if(!success && code !== 200){
                    alert(message);
                }
            }
        })
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
                                ?"text-[#DC143C] w-full py-3 px-4 rounded-md border border-[#DC143C] text-sm my-2"
                                :"text-black w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" }
                            required
                            placeholder='enter your email'
                            onChange={(e) => emailOnchangeHandler(e)}/>
                            {emailError.isError && <span className='text-xs text-[#DC143C]'>{emailError.msg}</span>}
                        </div>

                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>password</p>
                            <div  className={passwordError.isError
                                    ? "text-[#DC143C] w-full flex justify-between items-center rounded-md my-2 border border-[#DC143C] text-sm"
                                    :"text-black w-full rounded-md border border-[#6157A0] text-sm my-4 flex justify-between items-center" }>

                                <input type={boolStates.viewPassword ? "text" :"password"} 
                                    className="px-4 py-3 rounded-md w-10/12"
                                    required
                                    placeholder='Enter your password'
                                    onChange={(e) => setPasswordOnchangeHandler(e)}/>

                                <IconButton onClick={() => setBooleanStates({...boolStates, viewPassword : !boolStates.viewPassword})}>
                                    {boolStates.viewPassword ? <RemoveRedEyeRoundedIcon sx={{
                                        color : '#000'
                                    }}/> : <VisibilityOffRoundedIcon 
                                    sx={{
                                        color : '#000'
                                    }}/>}
                                </IconButton>
                                
                            </div>
                            {passwordError.isError && <span className='text-xs text-[#DC143C]'>{passwordError.msg}</span>}
                        </div>
                        
                        <div className='flex justify-between gap-4 items-center my-4 text-xs font-bold'>
                            <div className='flex flex-row items-center gap-2'>
                                <input type={"checkbox"} onChange={(e) => setBooleanStates({...boolStates, rememberMe : e.target.checked})}/>
                                <span className=''>Remember me</span>
                            </div>

                            <Link href={'/forgot-password'} passHref>
                                <span className='text-[#6157A0] hover:text-blue-500 cursor-pointer'>Forgot Password?</span>
                            </Link>
                        </div>
                        {/* :"w-full p-3 bg-[#EFF0F6] text-xs text-gray-500 rounded-md my-2" */}
                        <button type={"submit"}
                        disabled={validateEmail(loginDetails.email) &&!emailError.isError
                        && validatePassword(loginDetails.password) && !passwordError.isError
                        ?false : true}
                        className="w-full p-3 text-white text-xs bg-[#6157A0] 
                        rounded-md my-2 cursor-pointer hover:shadow-lg 
                        transition-shadow duration-300 delay-200 
                        disabled:bg-[#EFF0F6] 
                        disabled:shadow-none 
                        disabled:text-gray-500 disabled:cursor-default"
                        
                        >Login</button>
                    </form>

                    <div className='text-center p-4 text-sm'>
                        <p>Don&apos;t have an account?&nbsp;
                        <Link href={'/signUp'} passHref>
                            <span className='text-[#6157A0] hover:text-blue-500 cursor-pointer font-bold'>Sign-up</span>
                        </Link>
                        </p>
                        
                    </div>
                </div>
            </div>
            {loader && <ReactSpinnerLoader/>}
        </div>
    );
}