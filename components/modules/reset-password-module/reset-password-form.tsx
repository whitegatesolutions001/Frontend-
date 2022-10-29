import Link from 'next/link';
import React from 'react';
import { ErrorInterfaceObj } from '../../../utils/constants';
import { validateEmail, validatePassword } from '../../../utils/util-functions';

const initialErrorObj : ErrorInterfaceObj = {
    msg : '',
    isError : false
};

export const ResetPasswordForm = () : JSX.Element => {

    const [password, setPassword] = React.useState({
        temporaryPassword : '',
        newPassword : '',
        confirmNewPassword : ''
    });
    const [temporaryPasswordError, setTempPassword] = React.useState<ErrorInterfaceObj>({...initialErrorObj});
    const [newPassword, setNewPassword] = React.useState<ErrorInterfaceObj>({...initialErrorObj});
    const [confirmPassword, setConfirmPassword] = React.useState<ErrorInterfaceObj>({...initialErrorObj});

    const onChangeTemporaryPasswordHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validatePassword(value)){
            setPassword({...password, temporaryPassword : value});
           setTempPassword({...temporaryPasswordError, isError : false}); 
        }else {
            setTempPassword({...temporaryPasswordError, msg : 'Password length must be at least 8 characters, must contain upper and lowercase alphabets,special character', isError : true}); 
        } 
    }

    const onChangeNewPasswordHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(validatePassword(value)){
            setPassword({...password, newPassword : value});
            setNewPassword({...newPassword,isError : false}); 
        }else {
            setNewPassword({...newPassword, msg : 'Password length must be at least 8 characters, must contain upper and lowercase alphabets,special character', isError : true}); 
        } 
    }
    const onChangeConfirmPassword = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        if(password.newPassword === value){
            setPassword({...password, confirmNewPassword : value});
            setConfirmPassword({...confirmPassword,isError : false}); 
        }else {
            setConfirmPassword({...confirmPassword, msg : 'Passwords do not match', isError : true}); 
        } 
    }
    const onSubmitHandler = (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(password);
    }
    
    React.useEffect(() => {
        if(password.confirmNewPassword && password.newPassword !== password.confirmNewPassword){
            setConfirmPassword({...confirmPassword, msg : 'Passwords do not match', isError : true}); 
        }else{
            setConfirmPassword({...confirmPassword, isError : false}); 
        }
    },[password]);
    
    return(
        <div className='w-full flex justify-center items-center'>
            <div className='w-4/5 my-12 p-4 md:p-8'>
                <p className='text-4xl font-bold py-2 capitalize'>Reset your password?</p>
                <p className='text-lg font-semibold'>Put your temporary password and the new password</p>

                <div className='my-8'>
                    <form onSubmit={onSubmitHandler}>
                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>Temporary Password</p>
                            <input type={"text"} 
                            className={temporaryPasswordError.isError
                                ? "text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-4 mb-2"
                                :"w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" }
                            required
                            placeholder='............'
                            onChange={(e) => onChangeTemporaryPasswordHandler(e)}/>
                            {temporaryPasswordError.isError && <span className='text-xs text-[#DC143C]'>{temporaryPasswordError.msg}</span>}
                        </div>

                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>New Password</p>
                            <input type={"text"} 
                            className={newPassword.isError
                                ? "text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-4 mb-2"
                                :"w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" }
                            required
                            placeholder='............'
                            onChange={(e) => onChangeNewPasswordHandler(e)}/>
                            
                            {newPassword.isError && <span className='text-xs text-[#DC143C]'>{newPassword.msg}</span>}
                        </div>

                        <div className='flex flex-col mb-2'>
                            <p className='capitalize font-bold text-xs'>Confirm Password</p>
                            <input type={"text"} 
                            className={confirmPassword.isError
                                ? "text-[#DC143C] w-full py-2.5 px-4 rounded-md border border-[#DC143C] text-sm mt-4 mb-2"
                                :"w-full py-3 px-4 rounded-md border border-[#6157A0] text-sm my-4" }
                            required
                            placeholder='............'
                            onChange={(e) => onChangeConfirmPassword(e)}/>
                            {confirmPassword.isError && <span className='text-xs text-[#DC143C]'>{confirmPassword.msg}</span>}
                        </div>

                        <input type={"submit"}
                        value="Submit"
                        className={validatePassword(password.temporaryPassword) && !temporaryPasswordError.isError
                            && validatePassword(password.newPassword) && !newPassword.isError
                            && validatePassword(password.confirmNewPassword) && !confirmPassword.isError 
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
        </div>
    );
}