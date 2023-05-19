import { NextApiRequest, NextApiResponse } from "next";
import { Gift } from "./models/gift";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Gift[]>
  ) {
    const query = req.query;
    if (query.category === "Одежда") {
        res.status(200).json([{
            ID: 1,
            Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
            Name: "Name",
            Price: 220
        },
        {
            ID: 2,
            Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
            Name: "Name",
            Price: 220
        },
        {
            ID: 3,
            Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
            Name: "Name",
            Price: 220
        },
        {
            ID: 4,
            Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
            Name: "Name",
            Price: 220
        },
        {
            ID: 5,
            Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
            Name: "Name",
            Price: 220
        },
        {
            ID: 6,
            Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
            Name: "Name",
            Price: 220
        },
        {
            ID: 7,
            Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
            Name: "Name",
            Price: 220
        },
        {
            ID: 8,
            Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
            Name: "Name",
            Price: 220
        },
        {
            ID: 9,
            Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
            Name: "Name",
            Price: 220
        },
        {
            ID: 10,
            Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
            Name: "Name",
            Price: 220
        },
        {
            ID: 12,
            Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
            Name: "Name",
            Price: 220
        },
        {
            ID: 13,
            Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
            Name: "Name",
            Price: 220
        },
    ])
    } else if (query.category === "Техника") {
        res.status(200).json([
            {
                ID: 1,
                Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
                Name: "Name",
                Price: 180
            },
            {
                ID: 2,
                Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
                Name: "Name",
                Price: 180
            }
        ])
    } else if (query.category === "Сувениры") {
        res.status(200).json([
            {
                ID: 1,
                Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
                Name: "Name",
                Price: 160
            },
            {
                ID: 2,
                Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
                Name: "Name",
                Price: 160
            }
        ])
    } else {
        res.status(200).json([
            {
                ID: 1,
                Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
                Name: "Name",
                Price: 100
            },
            {
                ID: 2,
                Src: "https://producttoday.ru/wp-content/uploads/2020/12/mailservice.jpg",
                Name: "Name",
                Price: 100
            }
        ])
    }
}