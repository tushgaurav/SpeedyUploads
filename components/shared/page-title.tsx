export default function PageTitle({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-2xl font-bold pb-4">
            {children}
        </h1>
    )
}