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

   let slug = title.toLowerCase().replace('/').split(' ').join('-').toString()

   const isHaveSlug = await prisma.article.findUnique({
      where: {slug},
   })

   if (isHaveSlug) {
      res.status(400);
      throw new Error('Article already exists');
   }

   res.json(req.user)

   // const article = await prisma.article.create({
   //    data: {title, slug, tag, content},
   // });

   // if (!article) {
   //    res.status(400);
   //    throw new Error('Article not created');
   // }

   // res.json({
   //    'article': article,
   // });
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