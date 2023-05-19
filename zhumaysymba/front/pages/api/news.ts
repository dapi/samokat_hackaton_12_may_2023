import { NextApiRequest, NextApiResponse } from "next";
import { news } from "./data/news";
import { News } from "./models/news";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<News[]>
  ) {
    const { method } = req;
    switch(method) {
        case "GET":
        res.status(200).json(news);
        break;
        case "POST":
        const newsObj = { ID: news.length + 1, ...req.body };
        news.push(newsObj);
        res.status(200).json(newsObj);
    }
  }
  