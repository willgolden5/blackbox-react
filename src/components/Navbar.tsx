import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="m500:h-16 fixed left-0 top-0 z-10 mx-auto flex h-20 w-full items-center border-b-4 border-black bg-white px-5">
      <div className="mx-auto flex w-[1300px] max-w-full items-center justify-between">
        <button className="m600:flex hidden items-center justify-center rounded-md border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
          <svg
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 448 512"
            className="m500:h-4 m500:w-4 h-6 w-6"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
          </svg>
        </button>
        <a className="m500:text-xl text-3xl font-bold" href="/">
          BLACKBOX
        </a>
        <div className="flex space-x-8 px-8">
          <p
            onClick={() => signOut()}
            className="m500:text-xl flex items-center justify-center text-xl font-bold"
          >
            Logout
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;