import Image from "next/image";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <main className="auth-container">
    <section className="auth-form">
      <div className="auth-box">
        {/* logo  */}
        <div className="flex flex-row gap-2">
          <Image src={'/icons/logo.svg'} width={37} height={37} alt="logo" />
          <h1 className="text-2xl font-semibold text-white">BookWise</h1>
        </div>
        {/* section children  */}
        <div>{children}</div>
        
      </div>
    </section>

    <section className="auth-illustration">
      <Image src={'/images/auth-illustration.png'} width={1000} height={1000} alt="auth illustration" className="size-full object-cover" />
    </section>
  </main>;
};

export default layout;
