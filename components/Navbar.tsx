import React,{useState,useEffect} from 'react'
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai"
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { BiSearch } from "react-icons/bi"
import { IoMdAdd } from "react-icons/io"
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';
import { IUser } from '../types'; 


const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState('');//for searching useror category videos
  const router = useRouter();//for routing 
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  //function for searching user or category videos
  
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    if(searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 bg-white'>
      <Link href="/">
        <div className='ml-3 w-[100px] md:w-[130px]'>
          <p className='text-3xl text-[#F51997] font-bold hover:underline '>Memories</p>
        </div>
      </Link>
      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 -left-20 bg-white'
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
            placeholder='Search accounts and videos'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className='flex gap-3 md:gap-5 items-center'>
            <Link href="/upload">
              <button className='border-2 py-1 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' />{` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {
              userProfile.image && (
                <Link href="/">
                  <>
                    <Image
                      width={40}
                      height={40}
                      className='rounded-full cursor-pointer'
                      src={userProfile.image}
                      alt='profile photo'
                    />
                  </>
                </Link>
              )}
            <button
              type='button'
              className='px-2'
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color='red' fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error")}
          />
        )
        }
      </div>
    </div>
  )
}

export default Navbar