import { auth } from '@/auth';
import { ThreeDCardDemo } from '@/components/ThreeDCard';
import { EvervaultCard, Icon } from '@/components/ui/evervault-card';
import UserProjects from '@/components/UserProjects';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

const page = async ({params}  : {params : Promise<{id : string}>}) => {

    const id = (await params).id;
    const session = await auth();

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id});

    if(!user) return notFound();
    
  return (
    <>
    <section className='profile_container'>
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col  max-w-sm mx-auto p-4 relative h-[30rem] items-center just">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
 
      <EvervaultCard text={`@${user.username}`} imageUrl={user.image}/>
 
      <h2 className="dark:text-white text-black mt-4 text-lg font-bold text-center">
   {user.name.toUpperCase()}
      </h2>
      <p className="text-sm border font-semibold dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 line-clamp-1 text-center pb-2">
       {user?.bio}
       
      </p>
    </div>


    <div className='flex-1 flex flex-col gap-5 lg:mt-5'>

        <p className='text-30-bold'>
            {session?.id == id ? "Your" : "All"} Projects
        </p>
        <ul className='mt-7 card_grid grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2  gap-1 justify-center'>
        
       <Suspense fallback={'Loading...'}>
<UserProjects id={id}/>

       </Suspense>
        
        </ul>
    </div>
    </section>
    </>
  )
}

export default page