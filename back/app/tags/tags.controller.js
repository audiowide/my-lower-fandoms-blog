import asyncHandler from 'express-async-handler';
import { prisma } from '../prisma.js';

// @ Show All Tags
// @ GET api/tags/
// @ public 
export const ShowAllTags = asyncHandler(async (req, res) => {
   const tags = await prisma.tag.findMany({
      orderBy: {
         name: 'asc',
      },
   });

   res.json(tags)
})


// @ Create New Tag
// @ POST api/tags/
// @ private 
export const CreateTag = asyncHandler(async (req, res) => {
   const {name} = req.body;

   const isHaveTag = prisma.tag.findUnique({
      where: { 
         name: name
      },
   })
   console.log(isHaveTag)

   if (!isHaveTag) {
      res.status(400);
      throw new Error('Tag already exists');
   }  

   const tag = await prisma.tag.create({
      data: {
         name
      },
   })


   res.json(tag);
})

// @ Delete Tag
// @ DELETE api/tags/:id
// @ private 
export const DeleteTag = asyncHandler(async (req, res) => {
   try {
      const tag = await prisma.tag.delete({
         where: {
            id: +req.params.id,
         },
      })

      res.json({
         'message': 'Tag deleted successfully',
      });
   } catch (error){
      res.status(404)
		throw new Error('Tag not found!')
   }
})