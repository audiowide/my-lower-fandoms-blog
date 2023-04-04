import asyncHandler from 'express-async-handler';
import { prisma } from './../prisma.js';

// @ Show All Article
// @ GET api/articles/
// @ public 
export const ShowAllArticles = asyncHandler(async (req, res) => {
   const articles = await prisma.article.findMany();

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
   
   const isHaveArticle = await prisma.article.findUnique({
      where: { 
         slug: slug
      },
   })

   if (isHaveArticle) {
      res.status(400);
      throw new Error('Article already exists');
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
   const article = await prisma.article.findUnique({
      where: {
         id: req.params.id,
      },
   });

   if (!article) {
      res.status(404);
      throw new Error('Article not found');
   }

   res.json({
      'count': article.length,
      'article': article,
   });
});

// @ Update Article
// @ PUT api/articles/:id
// @ private 
export const UpdateArticle = asyncHandler(async (req, res) => {
   const {title, tag, content} = req.body;

   const article = await prisma.article.update({
      where: {
         id: req.params.id,
      },
      data: {title, tag, content},
   })

   if (!article) {
      res.status(404);
      throw new Error('Article not found');
   }

   res.json({
      'article': article,
   });
})

// @ Delete Article
// @ DELETE api/articles/:id
// @ private 
export const DeleteArticle = asyncHandler(async (req, res) => {
   const article = await prisma.article.delete({
      where: {
         id: req.params.id,
      },
   })

   if (!article) {
      res.status(404);
      throw new Error('Article not found');
   }

   res.json({
      'article': article,
   });
})