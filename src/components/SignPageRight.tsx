import Image from "next/image";
import { logobg } from "@/public/assets/index";

const SignPageRight = () => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center p-10 bg-brand">
      <Image
        src={logobg}
        width={300}
        height={300}
        alt="Logo"
        className="mb-6"
      />
    </div>
  );
};

export default SignPageRight;
