import express from 'express'
import 'colors'
import {prisma} from './app/prisma.js'

import AuthRoutes from './app/auth/auth.router.js'
import { NotFound, errorHandler } from './app/middlewares/error.middleware.js'
import morgan from 'morgan'
import dotenv from 'dotenv'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

async function main() {
   if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
   app.use(express.json())

   app.use('/api/auth', AuthRoutes)
   
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
