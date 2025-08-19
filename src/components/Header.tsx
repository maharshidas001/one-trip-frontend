import MaxWidth from "./MaxWidth";
import LogoIcon from '@/assets/Logo Icon.svg';
import OneTrip from '@/assets/One Trip.svg';
import { Button } from "./ui/button";
import { Link } from 'react-router-dom';
import type { FC } from "react";

const Header: FC = () => {
  return (
    <>
      <header>
        <MaxWidth className="">
          <nav className="py-2 flex items-center justify-between">
            <Link to={'/'}>
              <div className="flex items-center gap-2">
                <img src={LogoIcon} className="w-4" alt="One Trip Logo" />
                <img src={OneTrip} className="h-6" alt="One Trip Logo" />
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link to={'/pricing'}>
                <p className="cursor-pointer">Pricing</p>
              </Link>
              <Link to={'/auth/login'}>
                <Button variant={"outline"} className="cursor-pointer">Login</Button>
              </Link>
            </div>
          </nav>
        </MaxWidth>
      </header>
    </>
  )
};

export default Header;