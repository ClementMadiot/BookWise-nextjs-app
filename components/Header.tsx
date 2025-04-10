"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { logoutAction } from "./LogoutAction";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between items-center gap-5">
      <Link href={"/"}>
        <Image src={"/icons/logo.svg"} alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex  items-center flex-row gap-8">
        <li>
          <Link
            href={"/my-profile"}
            className={cn(pathname === "/my-profile" ? "hidden" : "")}
          >
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name || "")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
        <li className="flex items-center">
          <form action={logoutAction}>
            <Button>Logout</Button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
