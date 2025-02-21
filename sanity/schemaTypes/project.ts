import { defineField, defineType, UserAvatar } from "sanity";

export const project = defineType({
    name : 'project',
    title : 'Project',
    type: 'document',
    
    fields : [
        defineField({
            name : 'slug',
            type : 'slug',
            options: {
                source : 'title'
            }
        }),
        defineField({
            name : 'title',
            type : 'string'
        }),
        defineField({
            name : 'author',
            type : 'reference',
            to : {type : 'author'}
        }),
        defineField({
            name : 'views',
            type : 'number'
        }),
        defineField({
            name : 'description',
            type : 'text'
        }),
        defineField({
            name : 'category',
            type : 'string',
            validation : (Rule) => Rule.min(1).max(50).required().error("Please enter a category"),
        }),
        defineField({
            name : 'image',
            type : 'url',
            validation : (Rule) => Rule.required()
        }),
        defineField({
            name : 'details',
            type : 'markdown',
            
        }),
        

    ],
   
})