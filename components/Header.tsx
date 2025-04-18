"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { logoutAction } from "./LogoutAction";

const Header = ({ session, admin }: { session: Session; admin: string }) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between items-center gap-5">
      <Link
        href={"/"}
        className="flex items-center gap-2 text-2xl text-light-100 font-semibold"
      >
        <Image src={"/icons/logo.svg"} alt="logo" width={40} height={40} />
        BookWise
      </Link>

      <ul className="flex  items-center flex-row gap-8">
        <li>
          <Link
            href={"/"}
            className={cn(
              "text-light-100 hover:text-light-200",
              pathname === "/" ? "text-light-200" : ""
            )}
          >
            Home
          </Link>
        </li>
        {admin === "ADMIN" && (
          <li className={cn(pathname === "/" ? "hidden" : "")}>
            <Link
              href={"/admin"}
              className="text-light-100 hover:text-light-200"
            >
              Admin
            </Link>
          </li>
        )}
        <li className={pathname === "/my-profile" ? "hidden" : ""}>
          <Link
            href={"/my-profile"}
            className="flex items-center gap-2 text-light-100"
          >
            <Avatar>
              <AvatarFallback className="bg-amber-100 text-dark-500 font-semibold">
                {getInitials(session?.user?.name || "")}
              </AvatarFallback>
            </Avatar>
            {session?.user?.name?.split(" ")[0]}
          </Link>
        </li>
        <li className="flex items-center">
          <Button onClick={logoutAction} variant={"icon"}>
            <Image
              src="/icons/logout.svg"
              alt="Logout"
              width={20}
              height={20}
            />
          </Button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
