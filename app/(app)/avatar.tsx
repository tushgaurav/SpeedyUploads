
import { auth } from "@/auth"

export default async function UserAvatar() {
    const session = await auth()


    if (session === null) {
        return null
    }

    if (!session!.user) return null

    return (
        <div>
            <img src={session.user.image as string} alt="User Avatar" />
        </div>
    )
}