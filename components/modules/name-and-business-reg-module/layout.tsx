import React, {FC,Fragment} from "react";
import { returnValues } from "../../layouts/dashboard-layout";
import { SideBarNavigation } from "../../layouts/dashboard-sidebar";
import { DashboardTopBar } from "../../layouts/dashboard-top-bar";

type Props = {
    children : JSX.Element
};

const NameReservationAndBusinessRegistrationLayout : FC<Props> = ({children}) : JSX.Element => {
    return(
        <Fragment>
           <div className="flex">
                <SideBarNavigation values={returnValues()}/>
                <main className="flex-1 bg-white text-black">
                    <DashboardTopBar pageTitle="Business Name Registration" showControls={false}/>
                    <div className="w-full flex justify-center lg:justify-start lg:ml-8">
                        {children}
                    </div>
                </main>
           </div>
        </Fragment>
    );
}

export default NameReservationAndBusinessRegistrationLayout;