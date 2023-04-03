import asyncHandler from 'express-async-handler'
import { generateToken } from '../utils/generateToken.js'

import {prisma} from '../prisma.js'

// @ Sign In
// @ api/auth/sign-in
// @ public
export const SignIn = asyncHandler(async (req, res) => {
   const { email, password } = req.body

   const user = await prisma.user.findUnique({
      where: { email }
   })

   if (!user) {
      res.status(401)
		throw new Error('Email has been registered')
   }

   const passwordIsTrue = user.password == password

   if (!passwordIsTrue) {
      res.status(401)
		throw new Error('Password is incorrect')
   }

   const token = generateToken(user.id)

   res.json({
      user: user,
      token: token
   })
})

// @ Sign Up
// @ api/auth/sign-up
// @ public
export const SignUp = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body

   const isHaveUser = await prisma.user.findUnique({
      where: { email }
   })

   if (isHaveUser) return res.status(400).json({ error: 'User already exists' })

   const user = await prisma.user.create({
      data: {
         name,
         email,
         password
      }
   })

   const token = generateToken(user.id)

   res.json({
      user: user,
      token: token
   })
})