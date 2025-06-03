
/* --- TASK 1 --- */

/* 
  1. new database called `plp_bookstore`
    use plp_bookstore

  2. Create a collection called `books`
    db.books.insertMany([
    {
      _id: ObjectId('683ea3e43a51c9af5f2ad333'),
      title: 'Blossoms of the Savannah',
      author: 'Henry R. Ole Kulet',
      genre: 'Fiction',
      published_year: 2008,
      price: 5.99,
      in_stock: true,
      pages: 284,
      publisher: 'Longhorn Publishers'
    },
    {
      _id: ObjectId('683ea3e43a51c9af5f2ad334'),
      title: 'The River and the Source',
      author: 'Margaret A. Ogola',
      genre: 'Historical Fiction',
      published_year: 1994,
      price: 6.99,
      in_stock: true,
      pages: 370,
      publisher: 'East African Educational Publishers'
    },
    {
      _id: ObjectId('683ea3e43a51c9af5f2ad335'),
      title: 'Siku Njema',
      author: 'Ken Walibora',
      genre: 'Swahili Fiction',
      published_year: 1996,
      price: 4.99,
      in_stock: false,
      pages: 198,
      publisher: 'Longhorn Publishers'
    },
    {
      _id: ObjectId('683ea3e43a51c9af5f2ad336'),
      title: 'Facing Mount Kenya',
      author: 'Jomo Kenyatta',
      genre: 'Cultural Anthropology',
      published_year: 1938,
      price: 8.49,
      in_stock: true,
      pages: 319,
      publisher: 'Heinemann'
    },
    {
      _id: ObjectId('683ea3e43a51c9af5f2ad337'),
      title: 'Kufa Kuzikana',
      author: 'Ken Walibora',
      genre: 'Swahili Drama',
      published_year: 2003,
      price: 4.49,
      in_stock: true,
      pages: 210,
      publisher: 'Phoenix Publishers'
    },
    {
      _id: ObjectId('683ea3e43a51c9af5f2ad338'),
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      genre: 'Non-fiction',
      published_year: 2014,
      price: 15.99,
      in_stock: true,
      pages: 498,
      publisher: 'Harper'
    },
    {
      _id: ObjectId('683ea3e43a51c9af5f2ad339'),
      title: 'The Martian',
      author: 'Andy Weir',
      genre: 'Science Fiction',
      published_year: 2011,
      price: 12.99,
      in_stock: true,
      pages: 369,
      publisher: 'Crown Publishing Group'
    },
    {
      _id: ObjectId('683ea3e43a51c9af5f2ad33a'),
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Science Fiction',
      published_year: 1965,
      price: 10.99,
      in_stock: false,
      pages: 412,
      publisher: 'Chilton Books'
    },
    {
      _id: ObjectId('683ea3e43a51c9af5f2ad33b'),
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Classic',
      published_year: 1960,
      price: 7.99,
      in_stock: true,
      pages: 281,
      publisher: 'J.B. Lippincott & Co.'
    },
    {
      _id: ObjectId('683ea3e43a51c9af5f2ad33c'),
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'Adventure',
      published_year: 1988,
      price: 9.49,
      in_stock: false,
      pages: 208,
      publisher: 'HarperOne'
    }
  ])
*/


/* --- TASK 2 --- */

/* 
  1.find
    db.books.find({genre: "Swahili Drama"})

  2. Find books published after a certain year
    db.books.find({published_year: { $gt: 2000 }})

  3. Find books by a specific autho
    db.books.find({ author: "Henry R. Ole Kulet" })

  4.Update the price of a specific book
    db.books.updateOne(
      {author: "Henry R. Ole Kulet"},
      { $set: { price: 250 } }
    )

  5. Delete a book by its title
    db.books.deleteOne({title: "The Alchemist"})
*/




 /* --- TASK 3 --- */

/* 
  1.  books in stock and published after 2010
    db.books.find({
      in_stock: true,
      published_year: {$gt: 2010}
    })

  2. projection to return title, author, price
    db.books.find({}, {title: 1, author: 1, price: 1, _id: 0})

  3. display books price in ascending and descending
    db.books.find().sort({price: 1})
    db.books.find().sort({price: -1})

  4.limit $ stop
    page-1. db.books.find().limit(5)
    page-2. db.books.find().skip(5).limit(5)
    page-3. db.books.find().skip(10).limit(5)
*/ 


  /* --- TASK 4 --- */

/*
  1. calc avarage price
    db.books.aggregate([{
      $group: {
        _id: "$genre",
        avaragePrice: { $avg: "$price" }
      }
    }])

  2.author with most books
    db.books.aggregate([
    {
      $group: {
        _id: "$author",       
        totalBooks: { $sum: 1 } 
      }
    },
    {
      $sort: { totalBooks: -1 }
    },
    {
      $limit: 1 
    }
  ])

  3.group by publication
  db.books.aggregate([
    {
      $project: {
        decade: {
          $multiply: [
            { $floor: { $divide: ["$published_year", 10] } },
            10
          ]
        }
      }
    },
    {
      $group: {
        _id: "$decade",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 } // sort by decade ascending
    }
  ])
*/

/* --- TASK 5 --- */

/* 
  1. title indexing
    db.books.createIndex({title: 1})

  2. compound index
    db.books.createIndex({author: 1, published_year: 1})

  3. explain
  db.books.find({title: "Dune"}).explain("executionStats")
*/