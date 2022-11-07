import { AxiosError } from 'axios';
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import { postAxiosRequest } from '../../../utils/axios-requests';
import { AxiosRequestInterface, Constants, ErrorInterfaceObj, SignPersonInterface } from '../../../utils/constants';
import { validateEmail, validatePassword, validatePhoneNumber } from '../../../utils/util-functions';
import { ReactSpinnerLoader } from '../../shared-components/react-spinner-loader';
import { useRouter, NextRouter } from 'next/router';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { IconButton, Tooltip } from '@mui/material';


const initialState : SignPersonInterface = {
    firstName : '',
    lastName : '',
    email : '',
    phoneNumber : '',
    password : ''
};

const initialErrorObj : ErrorInterfaceObj = {
    msg : '',
    isError : false,
};


export const SignUpForm = () : JSX.Element => {

    const [personState, setState] = useState<SignPersonInterface>({...initialState});
    const [invalidEmail, setErrorState] = useState<ErrorInterfaceObj>({...initialErrorObj});
    const [phoneError,setPhoneNumberError] = useState<ErrorInterfaceObj>({...initialErrorObj});
    const [passwordError,setPasswordError] = useState<ErrorInterfaceObj>({...initialErrorObj});
    const [confirmPasswordError,setConfirmPasswordError] = useState<ErrorInterfaceObj>({...initialErrorObj});
    const [tempPassword, setTempPassword] = useState<string>('');
    const [releaseButton, setButtonRelease] = useState({loader : false, checked : false});
    const [boolStates, setBooleanStates] = React.useState({
        rememberMe : false,
        viewPassword : false,
        viewConfirmPassword : false
    });
    const router : NextRouter = useRouter();

    const firstNameOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        setState({...personState, firstName : value});
    }

    const lastNameOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        setState({...personState, lastName : value});
    }

    const emailOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validateEmail(value)){
            setState({...personState, email : value});
            setErrorState({...invalidEmail, msg : '', isError : false}); 
        }else {
            setErrorState({...invalidEmail, msg : 'Invalid Email Address', isError : value.length > 1 && true}); 
        }  
    }

    const phoneNumberOnChangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        //regex for validating phone number
        if(validatePhoneNumber(value)) {
            setState({...personState, phoneNumber : value});
            setPhoneNumberError({...passwordError, msg:'', isError : false});
        }
        else {
            setPhoneNumberError({...phoneError, msg:'Invalid Phone Number', isError : value.length > 1 && true});
        }
    }

    const setPasswordOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validatePassword(value)){
            setTempPassword(value);
            setPasswordError({...passwordError,msg : '', isError : false});
        }
        else setPasswordError({...passwordError,
            msg : Constants.PASSWORD_REQUIREMENT,
            isError : value.length > 1 && true}
            );
    }

    
    const confirmPasswordOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(tempPassword === value){
            setState({...personState, password : value}) ;
            setConfirmPasswordError({...passwordError, msg : '',isError : false});
            //setButtonRelease(!releaseButton);
        }
        else setConfirmPasswordError({...passwordError,msg: "Passwords do not match", isError : value.length > 1 && true});
    }

    const onSignUpFormSubmitHandler = async (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {firstName, lastName, email, phoneNumber, password} = personState;
        const axiosRequestObject : AxiosRequestInterface = {
            uri : 'user/sign-up',
            body : {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                role : "CUSTOMER"
            }
        }
        setButtonRelease({...releaseButton, loader : true});
        await postAxiosRequest(axiosRequestObject).then((response) => {
            const {data, code, success,message} = response.data;
            
            if(success && code === 200){
                const { token,tokenExpiryDate,tokenInitializationDate,userId } = data;
                if(token && userId){
                    //display successful message, then proceed to new registration
                    localStorage.setItem('token',token);
                    localStorage.setItem('userId', userId);
                    setButtonRelease({...releaseButton, loader : false});
                    alert(message);
                    //store token and co inside localHost
                    router.push('/verify-account');
                }
            }
 
        }).catch((error : AxiosError) => {
            if(error?.isAxiosError){
                const {success, code ,message} = error.response?.data as any;

                if(!success && code !== 200){
                    //handle error
                    setButtonRelease({...releaseButton, loader : false});
                    alert(message);
                }
            }
        });
    }
    useEffect(() => {
        if(tempPassword !== personState.password){
            setConfirmPasswordError({...passwordError,msg: "Passwords do not match", isError : true});
        }else{
            setConfirmPasswordError({...passwordError, msg: "", isError : false});
        }
    },[personState,tempPassword]);

    return(
        <div className='w-full flex justify-center items-center'>
            <div className='w-4/5 p-4 md:p-8'>
                <p className='text-4xl font-bold py-6'>Welcome to your 
                <br/>
                Compliance Assistant</p>

                <div className='mt-2 mb-8'>
                    <form onSubmit={onSignUpFormSubmitHandler}>
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>First Name</p>
                            <input type={"text"} 
                            className="text-black w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" 
                            required
                            placeholder='Enter your first name'
                            onChange={(e) =>firstNameOnchangeHandler(e)}
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>Last Name</p>
                            <input type={"text"} 
                            className="text-black w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" 
                            required
                            placeholder='Enter your last name'
                            onChange={(e) => lastNameOnchangeHandler(e)}/>
                        </div>

                        <Tooltip title={invalidEmail.msg} arrow>
                            <div className='flex flex-col mb-2'>
                                <p className='capitalize font-bold text-xs'>Email Address</p>
                                <input type={"email"} 
                                className={invalidEmail.isError
                                    ? "text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-3 mb-1"
                                    :"text-black w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" }
                                required
                                placeholder='Enter your email'
                                onChange={(e) => emailOnchangeHandler(e)}/>
                                {/* {invalidEmail.isError && <span className='text-xs text-[#DC143C]'>{invalidEmail.msg}</span>} */}
                            </div>
                        </Tooltip>

                        <Tooltip title={phoneError.msg} arrow>
                            <div className='flex flex-col mb-2'>
                                <p className='capitalize font-bold text-xs'>Phone Number</p>
                                <input type={"text"} 
                                className={phoneError.isError
                                    ?"text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm my-3"
                                    :"text-black w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" }
                                required
                                maxLength={11}
                                placeholder='Enter your phone number'
                                onChange={(e) => phoneNumberOnChangeHandler(e)}/>
                                {/* {phoneError.isError && <span className='text-xs text-[#DC143C]'>{phoneError.msg}</span>} */}
                            </div>
                        </Tooltip>

                        <Tooltip title={passwordError.msg} arrow>
                            <div className='flex flex-col mb-2'>
                                <p className='capitalize font-bold text-xs'>set password</p>
                                <div  className={passwordError.isError
                                        ? "text-[#DC143C] w-full flex justify-between items-center rounded-md my-4 border border-[#DC143C] text-sm"
                                        :"text-black w-full rounded-md border border-[#6157A0] text-sm my-4 flex justify-between items-center" }>

                                    <input type={boolStates.viewPassword ? "text" :"password"} 
                                        className="px-4 py-3 rounded-md w-10/12"
                                        required
                                        placeholder='Set your Password'
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
                                {/* {passwordError.isError && <span className='text-xs text-[#DC143C]'>{passwordError.msg}</span>} */}
                            </div>
                        </Tooltip>
                        
                        <Tooltip title={confirmPasswordError.msg} arrow>
                            <div className='flex flex-col mb-2'>
                                <p className='capitalize font-bold text-xs'>confirm password</p>
                                <div  className={confirmPasswordError.isError
                                        ? "text-[#DC143C] w-full flex justify-between items-center rounded-md my-4 border border-[#DC143C] text-sm"
                                        :"text-black w-full rounded-md border border-[#6157A0] text-sm my-4 flex justify-between items-center" }>

                                    <input type={boolStates.viewConfirmPassword ? "text" :"password"} 
                                        className="px-4 py-3 rounded-md w-10/12"
                                        required
                                        placeholder='Confirm set password'
                                        onChange={(e) => confirmPasswordOnchangeHandler(e)}/>

                                    <IconButton onClick={() => setBooleanStates({...boolStates, viewConfirmPassword : !boolStates.viewConfirmPassword})}>
                                        {boolStates.viewConfirmPassword ? <RemoveRedEyeRoundedIcon sx={{
                                            color : '#000'
                                        }}/> : <VisibilityOffRoundedIcon 
                                        sx={{
                                            color : '#000'
                                        }}/>}
                                    </IconButton>
                                    
                                </div>
                                {/* {confirmPasswordError.isError && <span className='text-xs text-[#DC143C]'>{confirmPasswordError.msg}</span>}  */}
                            </div>
                        </Tooltip>
                        
                        <div className='my-1 text-xs font-bold'>
                            <div className='flex flex-row items-center gap-2'>
                                <input type={"checkbox"} onChange={(e) => setButtonRelease({...releaseButton, checked : e.target.checked})}/>
                                <span className=''>I agree to the terms and conditions</span>
                            </div>
                        </div>

                        <button type={"submit"}
                        disabled={personState.firstName
                            && personState.lastName 
                            && personState.email
                            && personState.phoneNumber
                            && personState.password
                            && releaseButton.checked
                        ?false : true}
                        className="w-full p-3 text-white text-xs bg-[#6157A0] 
                        rounded-md my-2 cursor-pointer hover:shadow-lg 
                        transition-shadow duration-300 delay-200 
                        disabled:bg-[#EFF0F6] 
                        disabled:shadow-none 
                        disabled:text-gray-500 disabled:cursor-default"
                        
                        >Register</button>

                        {/* <input type={"submit"}
                        value="Register"
                        className={personState.firstName
                            && personState.lastName 
                            && personState.email
                            && personState.phoneNumber
                            && personState.password
                            && releaseButton.checked
                        ? "w-full p-3 text-[#fff] text-xs bg-[#6157A0] rounded-md my-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 delay-200" 
                        :"w-full p-3 bg-[#EFF0F6] text-xs text-gray-500 rounded-md my-2"}
                        /> */}
                    </form>

                    <div className='text-center text-sm'>
                        <p>Already have an account?&nbsp;
                        <Link href={'/login'} passHref>
                            <span className='text-[#6157A0] hover:text-blue-500 cursor-pointer font-bold'>Login</span>
                        </Link>
                        </p>
                        
                    </div>
                </div>
            </div>
            {releaseButton.loader && <ReactSpinnerLoader/>}
        </div>
    );
}