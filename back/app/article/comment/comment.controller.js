import asyncHandler from 'express-async-handler';
import {prisma} from '../../prisma.js'

export const AddNewComment = asyncHandler(async (req, res) => {
   const {body} = req.body;

   const article = await prisma.article.findUnique({
      where: {
         slug: req.params.slug
      }
   })
   
   console.log(article.id, req.user.id)
   const comment = await prisma.comment.create({
      data: {
         body,
         user: {
            connect: {
               id: +req.user.id
            }
         },
         article: {
            connect: {
               id: +article.id
            }
         }
      }
   })

   res.json({message: comment})
})

export const DeleteComment = asyncHandler(async (req, res) => {
   try {
      const comment = await prisma.comment.findUnique({
         where: {
            id: +req.params.commentId
         }
      })

      if (comment) {
         await prisma.comment.delete({
            where: {
               id: +req.params.commentId
            }
         })

         res.json({message: 'Comment deleted successfully'})
      }
   } catch (error) {
      res.status(404)
      throw new Error('Comment not found')
   }
})