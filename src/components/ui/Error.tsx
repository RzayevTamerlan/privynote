import Link from 'next/link';
import { FC } from 'react';

type ErrorProps = {
  error: string;
  gotoLink: string;
  gotoText: string;
};

const Error: FC<ErrorProps> = ({ error, gotoLink, gotoText }) => {
  return (
    <div className="flex flex-col py-5 px-3 rounded-2xl border border-solid border-b-red-600 bg-red-500">
      <h3 className="dark:text-white text-main-black text-2xl font-semibold text-center">{error}</h3>
      <Link className="text-lg dark:text-white text-main-black text-center" href={gotoLink}>
        {gotoText}
      </Link>
    </div>
  );
};

export default Error;