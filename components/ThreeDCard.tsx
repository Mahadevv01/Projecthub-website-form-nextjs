"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import { ProjectTypeCard } from "./ProjectCard";

export function ThreeDCardDemo({post} : {post:ProjectTypeCard}) {
  const {_createdAt, views, author, title, category, _id, description , image} = post;

  console.log(author);
  return (
    <CardContainer className="inter-var h-[22rem]">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-[31rem] rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-2"
        >
          {description}
        </CardItem>

      
        <CardItem translateZ="100" className="w-full mt-4">
        <Link href={`/project/${_id}`}>
          <Image
            src={image || 'https://placehold.co/'}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
               </Link>
        </CardItem>
   
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href={`/user/${post.author?._id}`}
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
         
            {author?.name} <br />
         @{author?.username}

         
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
                 <Link href={`/project/${_id}`}>
         Details
         </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
