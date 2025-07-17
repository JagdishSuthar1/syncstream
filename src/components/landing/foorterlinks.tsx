import Link from "next/link";

export default function FooterLinks() {
    return (
        <div className="flex flex-col gap-3">
            <nav className="flex flex-row gap-3">
                <Link href={"/about"}>About us</Link>
                <Link href={"terms-of-service"}>Term of service</Link>
            </nav>

            <div className="flex flex-col gap-5 md:flex-row md:justify-center items-center">
                <Link href={"mailto:jagdishjdh31@gmail.com"}><img src="/social-linkedin.svg" alt="" className="w-5 h-5 bg-white rounded-full"/></Link>
                <Link href={"https://x.com/jagdish437041"}><img src="/social-x.svg" alt="" className="w-5 h-5 bg-white rounded-full"/></Link>
                <Link href={"https://github.com/JagdishSuthar1"}><img src="/social-pin.svg" alt="" className="w-5 h-5 bg-white rounded-full"/></Link>
            </div>
        </div>
    )
}