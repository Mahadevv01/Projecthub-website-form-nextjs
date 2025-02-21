import { Boxes } from '@/components/ui/background-boxes'
import { client } from '@/sanity/lib/client'
import { sanityFetch } from '@/sanity/lib/live'
import { PLAYLIST_BY_SLUG_QUERY, PROJECT_BY_ID_QUERY } from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import markdownit from "markdown-it";
import { formateDate } from '@/lib/utils'
import Views  from "@/components/Views";
import { ProjectTypeCard } from '@/components/ProjectCard'
import { ThreeDCardDemo } from '@/components/ThreeDCard'

const md = markdownit();
export const experimental_ppr = true
const page = async ({params} : {params : Promise<{id:string}>}) => {

  const id = (await params).id;
  console.log(id);


 
const [post , {select : editorPost}] = await Promise.all([
  client.fetch(PROJECT_BY_ID_QUERY , {id}),
  client.fetch(PLAYLIST_BY_SLUG_QUERY , {slug : 'editor-picks'}),

]);


console.log(post);
  if(!post) return notFound();


  const parsedContent = md.render(post?.details || "");
  return (
   <>
   
   
   <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
    <div className="absolute inset-0 w-full h-full  z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

    <Boxes />

    <p className='tag relative'>{formateDate(post?._createdAt)}</p>
    <h1 className="heading relative">
    {post.title}
    </h1>
    <p className="sub-heading !max-w-5xl relative line-clamp-3">
    {post.description}
    </p>



  </div>


<section className='section_container'>
<img src={post.image} alt="" className='w-full h-auto rounded-xl' />


<div className='space-y-5 mt-10 max-w-4xl mx-auto'>
  <div className='flex-between gap-5'>
    <Link href="/" className='flex gap-2 items-center mb-3'>
    <Image 
    src={post.author.image} alt="" width={64} height={64} className='rounded-full drop-shadow-lg'/>


<div>
  <p className='text-20-medium'>{post.author.name}</p>
  <p className='text-16-medium !text-black-300'>@{post.author.username}</p>
</div>

    </Link>

    <p className='category-tag'>
    {post.category}
    </p>
  </div>

  <h3 className='text-30-bold'>PROJECT DETAILS</h3>
{parsedContent ? (

  <article className='prose max-w-4xl font-work-sans brek-all'
  dangerouslySetInnerHTML={{__html : parsedContent}}
  />
) : (
  <p className='no-result'>No Details Provided</p>
)}

</div>
<hr className='divider'/>
{ 
editorPost?.length > 0 && (

  <div className='max-w-4xl mx-auto'>
    <p className='text-30-semibold'>Editor Picks</p>
    <ul className='mt-7 card_grid-sm'>
{ editorPost.map((post : ProjectTypeCard, index : number) => (
    <ThreeDCardDemo key={post._id} post={post}/>
     ))}
    </ul>
  </div>
 
)



}
<Suspense fallback={<></>}>
<Views id={id}/>
</Suspense>
</section>


   </>
  )




}

export default page