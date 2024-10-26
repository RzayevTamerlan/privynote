import { BackgroundBeamsWithCollision } from '@ui/background-beams-with-collision';
import { TypewriterEffect } from '@ui/typewriter-effect';
import { words } from '@constants/words';
import ConnectBtn from '@ui/connect-btn';
import Arrow from '@/icons/arrow';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className='mt-[84px]' id="hero">
      <BackgroundBeamsWithCollision>
        <div className="container flex flex-col gap-20 items-center">
          <h2 className="text-left">
            <TypewriterEffect
              className="w-fit"
              words={words}
            >
            </TypewriterEffect>
          </h2>
          <ConnectBtn
            style={{transitionDelay: '6.2s'}}
            className='w-fit max-w-fit mx-auto'>
            <Link href="#note" className='whitespace-nowrap text-xl py-5 px-3 flex items-center gap-4 dark:text-white text-main-black'>
              Create your own private note
              <Arrow className='rotate-90' width={40} height={40}/>
            </Link>
          </ConnectBtn>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
};

export { Hero };

