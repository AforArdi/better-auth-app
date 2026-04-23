import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";

const DashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log(session);
    const user = session?.user;

    if(!user){
        return (
            <div className="mt-5">
                <h2 className="font-semibold text-2xl text-center"><Link href={'/auth/signin'}>
                <Button variant="outline" className={'text-white'}>Sign in</Button>
                </Link> to view the Dashboard</h2>
            </div>
        )
    }
    return ( 
        <div>
            <h2 className="font-bold text-4xl text-center mt-4">Welcome to the Dashing Board</h2>
        </div>
     );
}
 
export default DashboardPage;