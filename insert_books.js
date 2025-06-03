// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
import { MongoClient } from 'mongodb';

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data
const books = [
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
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);

/*
 * Example MongoDB queries you can try after running this script:
 *
 * 1. Find all books:
 *    db.books.find()
 *
 * 2. Find books by a specific author:
 *    db.books.find({ author: "Yuval Noah Harari" })
 *
 * 3. Find books published after 1950:
 *    db.books.find({ published_year: { $gt: 1950 } })
 *
 * 4. Find books in a specific genre:
 *    db.books.find({ genre: "Fiction" })
 *
 * 5. Find in-stock books:
 *    db.books.find({ in_stock: true })
 */ 
