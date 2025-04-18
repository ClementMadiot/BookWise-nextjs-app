"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { adminSideBarLinks } from "@/constants";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "../ui/button";
import { logoutAction } from "../LogoutAction";

const Sidebar = ({ session }: { session: Session }) => {
  const pathName = usePathname();
  return (
    <div className="admin-sidebar">
      <div>
        <Link href={"/my-profile"} className="logo">
          <Image
            src="/icons/admin/logo.svg"
            alt="Logo"
            height={37}
            width={37}
          />
          <h1>BookWise</h1>
        </Link>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            // const isSelected = false;
            const isSelected =
              (link.route !== "/admin" &&
                pathName.includes(link.route) &&
                link.route.length > 1) ||
              pathName === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link hover:!bg-light-100/40",
                    isSelected &&
                      "bg-primary-admin hover:!bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${
                        isSelected ? "brightness-0 invert " : ""
                      }object-contain`}
                    />
                  </div>
                  <p
                    className={cn(isSelected ? "text-white" : "text-dark-200")}
                  >
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="user justify-center items-center">
        <Link href="/my-profile">
          <Avatar>
            <AvatarFallback className="bg-amber-100 hover:scale-110 transition-transform duration-200 text-dark-500">
              {getInitials(session?.user?.name || "IN")}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{session?.user?.name}</p>
          <p className="text-light-500 text-xs">{session?.user?.email}</p>
        </div>
        <Button onClick={logoutAction} variant={"icon"}>
            <Image
              src="/icons/logout.svg"
              alt="Logout"
              width={20}
              height={20}
            />
          </Button>
      </div>
    </div>
  );
};

export default Sidebar;
