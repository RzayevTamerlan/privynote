'use client';

import { ModeToggle } from '@ui/mode-toggler';
import { Highlight } from '@ui/highlight';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='py-6 shadow-header fixed top-0 left-0 right-0 z-50 bg-white dark:bg-main-black'>
      <div className="container">
        <div className="flex items-center justify-between">
          <h1>
            <Link href='/'>
              <Highlight className='py-3 text-lg font-semibold px-5 dark:text-main-black text-white'>
                Privy Note
              </Highlight>
            </Link>
          </h1>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export { Header };
