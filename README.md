# f-Etsy Reviews

> An "item detail page" from https://etsy.com with four significant and functionally unique modules ("widgets") on the page. This is a recreation of the Reviews module ("widget").

![Reviews Module Screenshot](./ReviewsScreenShot.png)

![Sample Etsy Detail Page Screenshot](./ScreenShot.png)

Highlighted Technologies: React, React Semantic UI, Express, mySQL, Jest, Webpack, AWS S3 + EC2

## Table of Contents

1. [Getting Started](#Getting)
2. [Testing](#Testing)
3. [Related Projects](#Related)
4. [CRUD-SDC](#CRUD)

## Getting Started

From within the root directory:

```
npm install
```

To run on a local machine, start mySQL service and in database/index.js on line 3 and line 10 update root user and password that matches your local machine mySQL.

For mySQL EC2 instance, a new credential and user name may need to be created with all admin rights for set up and database seeding to work properly. Need to update client/src/main.jsx axios get request path on line 35 to EC2 instance IP address.

To seed MySql database with 10M items and 50M reviews:

```
npm run seed_and_load
```

To start webpack

```
npm run react-dev
```

Start the server (on port 3002)

```
npm start
```

## Testing

```
npm run test
```

## Related Projects

- https://github.com/rpt24sourcandy/fetsyItemImages
- https://github.com/rpt24sourcandy/fetsySeller
- https://github.com/rpt24sourcandy/fetsyReviews
- https://github.com/rpt24sourcandy/fetsyShopping
- https://github.com/rpt24sourcandy/fetsyReviewsProxy

## CRUD
 - This service supports full CRUD functionality, available for testing with Postman. Notice not all functionality is built into the front end.


### Create / POST - create new item
#### Description:
- An Item id is provided and a review for the item is created.

#### The endpoint for creating a new review is:
  '/api/items/:itemId/reviews'

#### An example input for using this API:
{
  "customer_name": "David Amran",
  "date_of_review": "Oct 31, 2020",
  "rating": 4,
  "review_content": "Really love this mask in black! I received a lot of compliments. It was delivered on time .",
  "image_url": "https://fec-etsy-reviews.s3-us-west-1.amazonaws.com/Masks1.jpg",
  "item_option": "Black"
}

#### An example output of using this API:
{
  "id": 209,
  "customer_name": "David Amran",
  "date_of_review": "Oct 31, 2020",
  "rating": 4,
  "review_content": "Really love this mask in black! I received a lot of compliments. It was delivered on time .",
  "image_url": "https://fec-etsy-reviews.s3-us-west-1.amazonaws.com/Masks1.jpg",
  "item_option": "Black",
  "ItemId": "3",
  "updatedAt": "2021-01-22T05:56:39.246Z",
  "createdAt": "2021-01-22T05:56:39.246Z"
}


### Read / GET - read and item
#### Description:
 - Aready implemented by the owner of the service during the FEC.
 - Retrieve all the reviews for a specific item.

#### The endpoint for getting all the reviews of a specific item:
  '/api/items/:itemId/reviews'

 #### An example output of using this API:
 [
    {
        "id": 26,
        "customer_name": "Johnathan Mertz",
        "date_of_review": "Sept 4, 2020",
        "rating": 2,
        "review_content": "Qui consequatur possimus eaque eligendi voluptates fuga.",
        "image_url": "https://fec-etsy-reviews.s3-us-west-1.amazonaws.com/Masks1.jpg",
        "item_option": "enim occaecati reprehenderit",
        "createdAt": "2021-01-22T03:07:58.000Z",
        "updatedAt": "2021-01-22T03:07:58.000Z",
        "ItemId": 9
    },
    {
        "id": 44,
        "customer_name": "Arnold Pollich",
        "date_of_review": "Aug 3, 2020",
        "rating": 4,
        "review_content": "Repudiandae quia error blanditiis omnis a et.",
        "image_url": "https://fec-etsy-reviews.s3-us-west-1.amazonaws.com/Masks9.jpg",
        "item_option": "consectetur nemo corporis",
        "createdAt": "2021-01-22T03:07:58.000Z",
        "updatedAt": "2021-01-22T03:07:58.000Z",
        "ItemId": 9
    },
    ...
 ]


### Delete / DELETE - delete an item
#### Description:
-  A review id is provided and the specific review is deleted from the database (by its id).

#### The endpoint for creating a new review is:
  '/api/items/:itemId/reviews/:reviewId'

#### An example output of using this API:
  {
      "message": "Review was deleted successfully!"
  }

## Update / PUT - update an item
#### Description:
-  A review id and an object are provided and the specific review is updated with the modified object.
- It's also possible to send an object with only the relevant field for the required update.

#### The endpoint for creating a new review is:
'/api/items/:itemId/reviews/:reviewId'

#### An example input of using this API:
{
  "customer_name": "David Amran",
  "date_of_review": "Oct 31, 2020",
  "rating": 1,
  "review_content": "Really love this mask in black! I received a lot of compliments. It was delivered on time .",
  "image_url": "https://fec-etsy-reviews.s3-us-west-1.amazonaws.com/Masks1.jpg",
  "item_option": "Black"
}
OR

{
  "rating": 4
}

#### An example output of using this API:
{
    "message": "Review 209 was updated successfully."
}