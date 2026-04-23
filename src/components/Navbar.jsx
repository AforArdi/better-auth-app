'use client'

import { signOut, useSession } from "@/lib/auth-client";
import { Link, Button } from "@heroui/react";

const Navbar = () => {
    const {data, isPending} = useSession();
    const user = data?.user
    // console.log('login success', data);

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <p className="font-bold">ARDI</p>
                </div>
                <ul className="flex items-center gap-4">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/about">About</Link></li>
                </ul>
                <div>
                    {user ? <>
                    Welcome, {user.name}
                    <Button
                    onClick={()=>signOut()}
                    variant="secondary">Sign out</Button>
                    </> :
                    
                    <Link href='/auth/signin'>
                        <Button variant="primary">Sign in</Button>
                    </Link>}
                </div>
            </header>
        </nav>
    );
}

export default Navbar;