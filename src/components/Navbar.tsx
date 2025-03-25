"use client";
import Image from "next/image";
import github from "../public/github.svg";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { toast } from "sonner";
export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const handleSignOut = async()=>{
    await signOut()
    toast.success("Logged out!")
  }
  return (
    <nav
      className={`${
        !session?.user
      } bg-[#FCFCFC] w-full h-10 py-8 flex items-center justify-end md:px-20 px-5`}
    >
      {session?.user && (
        <button
          onClick={handleSignOut}
          className="flex items-center bg-white py-1 px-2 rounded-lg border hover:bg-slate-50"
        >
          <Image className="w-4 h-4 mr-1" src={github} alt="github-icon" />{" "}
          <span className="text-sm text-neutral-800">Signout</span>
        </button>
      )}
    </nav>
  );
}

