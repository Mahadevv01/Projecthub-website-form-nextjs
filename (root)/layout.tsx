import NavBar from "@/components/NavBar";

export default function Layout({children} : Readonly<{children:React.ReactNode}>){
    return (
    <main className="text-2xl">
<NavBar/>
        {children}
    </main>
    )
}