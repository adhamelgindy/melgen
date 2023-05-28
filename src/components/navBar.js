import HeartSvg from '@/resources/svg/Heart';
import HomeSvg from '@/resources/svg/Home';
import ProfileSvg from '@/resources/svg/Profile';
import Link from 'next/link';
import { useState } from 'react';

function Navbar() {
  const [hoverHeart, setHoverHeart] = useState<boolean>(false);
  const [hoverProfile, setHoverProfile] = useState<boolean>(false);

  return (
    <div className="z-[99998] fixed bottom-0 w-screen h-14 flex flex-col justify-center items-center bg-dark-sea lg:top-0 lg:bottom-auto lg:items-end">
      <nav className="w-full max-w-xs h-full bg-dark-sea lg:max-w-full lg:mr-2">
        <ul className="w-full h-full flex justify-between items-center px-6 lg:justify-end">
          <Link href="/favorites">
            <li onMouseEnter={() => setHoverHeart(true)} onMouseLeave={() => setHoverHeart(false)} className="cursor-pointer lg:mr-3 lg:order-2">
              <HeartSvg width="32px" height="32px" fill={hoverHeart ? '#3ED598' : '#f0f0f0'} />
            </li>
          </Link>
          <Link href="/home">
            <li className="mq-hover:hover:bg-hovered-seaweed p-2 bg-bright-seaweed rounded-full cursor-pointer lg:mr-6 lg:order-1">
              <HomeSvg width="27px" height="27px" />
            </li>
          </Link>
          <Link href="/profile">
            <li onMouseEnter={() => setHoverProfile(true)} onMouseLeave={() => setHoverProfile(false)} className="cursor-pointer lg:order-3">
              <ProfileSvg width="32px" height="32px" fill={hoverProfile ? '#3ED598' : '#f0f0f0'} />
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export { Navbar };
