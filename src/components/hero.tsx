import { heroWords } from '@constants/hero-words';
import { BackgroundBeamsWithCollision } from '@ui/background-beams-with-collision';
import { ConnectBtn } from '@ui/connect-btn';
import { TypewriterEffect } from '@ui/typewriter-effect';
import Link from 'next/link';

import { Arrow } from '@/icons/arrow';

const Hero = () => {
  return (
    <section className="mt-[84px] min-h-[calc(100vh-84px)]" id="hero">
      <BackgroundBeamsWithCollision>
        <div className="container flex flex-col gap-20 items-center">
          <h2 className="text-left">
            <TypewriterEffect
              className="w-fit"
              words={heroWords}
            >
            </TypewriterEffect>
          </h2>
          <ConnectBtn
            style={{ transitionDelay: '6.2s' }}
            className="w-fit max-w-fit mx-auto">
            <Link href="#note" className="whitespace-nowrap text-xl py-5 px-3 flex items-center gap-4 dark:text-white text-main-black">
              Create your own private note
              <Arrow className="rotate-90" width={40} height={40}/>
            </Link>
          </ConnectBtn>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
};

export { Hero };

