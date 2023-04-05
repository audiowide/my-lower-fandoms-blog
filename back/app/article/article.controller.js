import asyncHandler from 'express-async-handler';
import { prisma } from './../prisma.js';
import {ArticleSelect} from '../utils/article.utils.js'

// @ Show All Article
// @ GET api/articles/
// @ public 
export const ShowAllArticles = asyncHandler(async (req, res) => {

   const articles = await prisma.article.findMany({
      orderBy: {
         updatedAt: req.query?.updatedAt == 'asc'? 'asc': 'desc',
      },
      select: ArticleSelect
   });

   if (articles.length == 0) {
      res.json({
         'count': '0',
         'message': 'No articles found',
      })
   }

   res.json({
      'count': articles.length,
      'articles': articles,
   })
})


// @ Create New Article
// @ POST api/articles
// @ private 
export const CreateArticle = asyncHandler(async (req, res) => {
   const {title, tag, content} = req.body;

   let slug = title.toLowerCase().split(/:|\s|&|,|%|^/).join('-').toString()
   
   try {
      const isHaveArticle = await prisma.article.findUnique({
         where: { 
            slug: slug
         },
      });

      if (isHaveArticle) {
         res.status(400);
         throw new Error('Article already exists');
      }
   } catch (error) {
     console.log(error)
   }

   const article = await prisma.article.create({
      data: {
         title: title, 
         slug: slug, 
         tag: {
            connect: {
               id: tag
            }
         }, 
         content: content,
         user: {
            connect: {
               id: req.user.id
            }
         },
      },
   })
   console.log(article);
   res.json(article);
})


// @ Show Article
// @ GET api/articles/:id
// @ public 
export const ShowArticle = asyncHandler(async (req, res) => {
   try {
      const article = await prisma.article.findUnique({
         where: {
            slug: req.params.slug,
         },
         select: ArticleSelect
      });
   
      res.json(article);
   } catch (error) {
      res.status(404);
      throw new Error('Article not found');
   }
});

// @ Update Article
// @ PUT api/articles/:id
// @ private 
export const UpdateArticle = asyncHandler(async (req, res) => {
   const {title, tag, content} = req.body;

   try {
      let article = await prisma.article.findUnique({
         where: {
            slug: req.params.slug,
         },
         select: ArticleSelect
      })

      console.log(article)
      if (article.user.id == req.user.id) {
         article = await prisma.article.update({
            where: {
               slug: req.params.slug,
            },
            data: {
               title,
               content,
               tag: {
                  connect: {
                     id: tag
                  }
               },
            },
         })

         res.json(article);
      }
   } catch (error) {
      res.status(404);
      throw new Error('Article not found');
   }
})

// @ Delete Article
// @ DELETE api/articles/:id
// @ private 
export const DeleteArticle = asyncHandler(async (req, res) => {
   try {
      let article = await prisma.article.findUnique({
         where: {
            slug: req.params.slug,
         },
         select: ArticleSelect
      })

      if (article.user.slug == req.user.slug) {
         await prisma.article.delete({
            where: {
               slug: req.params.slug,
            },
         })

         res.json({"message": "Article deleted successfully!"});
      }
   } catch(error) {
      res.status(404);
      throw new Error('Article not found');
   }
})