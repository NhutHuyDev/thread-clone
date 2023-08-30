import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
    if (!params.id) return null;

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onBoarded) redirect("/onboarding");

    const thread = await fetchThreadById(params.id);

    return (
        <section className='relative'>
            <div>
                <ThreadCard
                    id={thread._id}
                    currentUserId={user.id}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                    isComment={true}
                />
            </div>

            <div className="mt-7">
                <Comment
                    threadId={thread.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className='mt-10'>
                {thread.children.map((childItem: any) => (
                    <ThreadCard
                        key={childItem._id}
                        id={childItem._id}
                        currentUserId={user.id}
                        parentId={childItem.parentId}
                        content={childItem.text}
                        author={childItem.author}
                        community={childItem.community}
                        createdAt={childItem.createdAt}
                        comments={childItem.children}
                    />
                ))}
            </div>
        </section>
    )
}

export default page