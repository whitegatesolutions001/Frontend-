import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import { ErrorInterfaceObj, SignPersonInterface } from '../../../utils/constants';
import { validateEmail, validatePassword, validatePhoneNumber } from '../../../utils/util-functions';


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
    const [releaseButton, setButtonRelease] = useState({release : false, checked : false});

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
            setErrorState({...invalidEmail, msg : 'valid', isError : false}); 
        }else {
            setErrorState({...invalidEmail, msg : 'Invalid Email Address', isError : true}); 
        }  
    }

    const phoneNumberOnChangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        //regex for validating phone number
        if(validatePhoneNumber(value)) {
            setState({...personState, phoneNumber : value});
            setPhoneNumberError({...passwordError, msg:'Valid', isError : false});
        }
        else {
            setPhoneNumberError({...phoneError, msg:'Invalid Phone Number', isError : true});
        }
    }

    const setPasswordOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validatePassword(value)){
            setTempPassword(value);
            setPasswordError({...passwordError, isError : false});
        }
        else setPasswordError({...passwordError,
            msg : "Password length must be at least 8 characters, must contain upper and lowercase alphabets,special character",
            isError : true}
            );
    }

    
    const confirmPasswordOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(tempPassword === value){
            setState({...personState, password : value}) ;
            setConfirmPasswordError({...passwordError, isError : false});
            //setButtonRelease(!releaseButton);
        }
        else setConfirmPasswordError({...passwordError,msg: "Passwords do not match", isError : true});
    }

    const onSignUpFormSubmitHandler = (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(personState);
    }
    useEffect(() => {
        if(tempPassword !== personState.password){
            setConfirmPasswordError({...passwordError,msg: "Passwords do not match", isError : true});
        }else{
            setConfirmPasswordError({...passwordError, isError : false});
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
                            placeholder='philip'
                            onChange={(e) =>firstNameOnchangeHandler(e)}
                            />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>Last Name</p>
                            <input type={"text"} 
                            className="text-black w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" 
                            required
                            placeholder='ajayi'
                            onChange={(e) => lastNameOnchangeHandler(e)}/>
                        </div>

                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>Email Address</p>
                            <input type={"email"} 
                            className={invalidEmail.isError
                                ? "text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-3 mb-1"
                                :"text-black w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" }
                            required
                            placeholder='philipAjayi@gmail.com'
                            onChange={(e) => emailOnchangeHandler(e)}/>
                            {invalidEmail.isError && <span className='text-xs text-[#DC143C]'>{invalidEmail.msg}</span>}
                        </div>

                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>Phone Number</p>
                            <input type={"text"} 
                            className={phoneError.isError
                                ?"text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-3 mb-1"
                                :"text-black w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3" }
                            required
                            maxLength={11}
                            placeholder='08076082890'
                            onChange={(e) => phoneNumberOnChangeHandler(e)}/>
                            {phoneError.isError && <span className='text-xs text-[#DC143C]'>{phoneError.msg}</span>}
                        </div>

                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>set password</p>
                            <input type={"password"} 
                            className={passwordError.isError
                                ?"text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-3 mb-1"
                                :"text-black w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3"} 
                            required
                            placeholder='............'
                            onChange={(e) => setPasswordOnchangeHandler(e)}/>
                            {passwordError.isError && <span className='text-xs text-[#DC143C]'>{passwordError.msg}</span>}
                        </div>
                        
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>confirm password</p>
                            <input type={"password"} 
                            className={confirmPasswordError.isError 
                                ?"text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-3 mb-1"  
                                :"text-black w-full py-2.5 px-4 rounded-md border border-[#6157A0] text-sm my-3"}
                            required
                            placeholder='............'
                            onChange={(e) => confirmPasswordOnchangeHandler(e)}/>
                            {confirmPasswordError.isError && <span className='text-xs text-[#DC143C]'>{confirmPasswordError.msg}</span>}
                        </div>
                        
                        <div className='my-1 text-xs font-bold'>
                            <div className='flex flex-row items-center gap-2'>
                                <input type={"checkbox"} onChange={(e) => setButtonRelease({...releaseButton, checked : e.target.checked})}/>
                                <span className=''>I agree to the terms and conditions</span>
                            </div>
                        </div>

                        <input type={"submit"}
                        value="Register"
                        className={personState.firstName
                            && personState.lastName 
                            && personState.email
                            && personState.phoneNumber
                            && personState.password
                            && releaseButton.checked
                        ? "w-full p-3 text-[#fff] text-xs bg-[#6157A0] rounded-md my-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 delay-200" 
                        :"w-full p-3 bg-[#EFF0F6] text-xs text-gray-500 rounded-md my-2"}
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