export enum Constants {
    GIRL_LAWYER = "https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?auto=compress&cs=tinysrgb&w=1280&h=1918&dpr=1"
}

export type ThemeContextState = {
    theme : string;
    toggleTheme : (theme : string) => void;  
};
export interface LoginDetailsInterface{
    email : string;
    password : string;
}
export interface SignPersonInterface{
    firstName : string;
    lastName : string;
    email : string;
    phoneNumber : string;
    password : string;
}

export interface ErrorInterfaceObj{
    msg : string;
    isError : boolean;
}
