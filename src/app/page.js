import { Button } from "@heroui/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-4">
        <h2 className="font-bold text-4xl">Better Auth Practice</h2>
        <div className="flex items-center gap-4">
            <Link href={'/signup'}>
              <Button variant="primary">Sign Up</Button>
            </Link>
            <Link href={'/signin'}>
              <Button variant="primary">Sign In</Button>
            </Link>
        </div>
    </div>
  );
}
