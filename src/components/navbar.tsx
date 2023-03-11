/* eslint-disable @next/next/no-img-element */
import { Navbar } from "@material-tailwind/react";
import Image from "next/image";
import logo from '../assests/logo.png'



const NavBar = () => {

    return (
        <Navbar className="h-12 mx-auto w-full py-2 px-4 text-slate-700 rounded-none navbar-background-color">
            <div>
                <Image alt={'logo'} src={logo} />
            </div>
        </Navbar>
    );
}

export default NavBar;