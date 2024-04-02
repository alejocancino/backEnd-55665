import { Router } from "express";

const viewsRouter = Router()

viewsRouter.get('/home', async(req, res)=>{
  res.status(200).render('pages/home',{
    titulo:"Home"
  })
  }
)

viewsRouter.get('/products', async(req, res)=>{
  res.status(200).render('pages/products',{
    titulo:"products"
  })
  }
)

export {viewsRouter}