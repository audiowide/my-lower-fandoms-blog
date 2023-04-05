import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'

import 'colors'
import {prisma} from './app/prisma.js'

import AuthRoutes from './app/auth/auth.router.js'
import ArticleRoutes from './app/article/article.router.js'
import TagRoutes from './app/tags/tags.router.js'
import UserRoutes from './app/user/user.router.js'

import { NotFound, errorHandler } from './app/middlewares/error.middleware.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

async function main() {
   if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
   app.use(express.json())

   app.use('/api/auth', AuthRoutes)
   app.use('/api/articles', ArticleRoutes)
   app.use('/api/tags', TagRoutes)
   app.use('/api/users', UserRoutes)
   
   app.use(NotFound)
   app.use(errorHandler)

   app.listen(PORT, () => {
      console.log(
         `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
      .bold
      )
   })
}

main().then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
