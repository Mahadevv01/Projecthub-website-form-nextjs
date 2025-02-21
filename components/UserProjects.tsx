import { client } from '@/sanity/lib/client'
import { PROJECT_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import { ProjectTypeCard } from './ProjectCard';
import { ThreeDCardDemo } from './ThreeDCard';

const UserProjects = async ({id} : {id: string}) => {

    const project = await client.fetch(PROJECT_BY_AUTHOR_QUERY, {id});
  return (
    <>
    { 
    project?.length > 0 ? (
        project.map((post : ProjectTypeCard, index : number) => (
        <ThreeDCardDemo key={post._id} post={post}/>
         ))
    ) : (
      <p className='no-results'>No Projects Found</p>
    )
    
    
    
    }
    </>
  )
}

export default UserProjects