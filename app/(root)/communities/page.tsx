import ProfileHeader from '@/components/shared/ProfileHeader'
import { fetchUser } from '@/lib/actions/user.action'
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { profileTabs } from "@/constants";
import ThreadsTab from '@/components/shared/ThreadsTab'

async function Page() {
    const user = await currentUser()
    if (!user) return null

    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onBoarded) redirect('/onboarding')

    return (
        <section>
            <h1 className="head-text mb-10">
                Community
            </h1>
        </section>
    )
}

export default page