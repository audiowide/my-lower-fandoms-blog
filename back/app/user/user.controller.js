import asyncHandler from 'express-async-handler';
import { prisma } from '../prisma.js';
import {UserSelect} from '../utils/user.utils.js';

export const ShowUser = asyncHandler(async (req, res) => {
   try {
      const user = await prisma.user.findUnique({
         where:{
            id: +req.params.id
         },
         select: UserSelect
      })

      res.json(user);
   } catch(err) {
      res.status(404)
      throw new Error('User not found')
   }
})

export const ChangeUser = asyncHandler(async (req, res) => {
   const {name, email, password} = req.body;

   try {
      let user = await prisma.user.findUnique({
         where:{
            id: +req.params.id
         }
      })

      if (req.user.id === user.id) {
         user = await prisma.user.update({
            where: {
               id: +req.params.id
            },
            data: {
               name,
               email,
               password
            },
            select: UserSelect
         })

         res.json(user);
      } else {
         res.status(401)
         throw new Error('Unauthorized')
      }

   } catch(err) {
      res.status(404)
      throw new Error('User not found')
   }
})