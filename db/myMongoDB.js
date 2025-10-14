import { MongoClient, ObjectId } from "mongodb";

function MyMongoDB() {
  const me = {};

  const connect = async () => {
    const client = await MongoClient.connect("mongodb://localhost:47017/");
    const publications = client
      .db("publicationManager")
      .collection("publications");

    return { client, publications };
  };

  me.getPublicationsTotalPages = async ({ query, limit }) => {
    const { client, publications } = await connect();
    console.log("Connected to MongoDB for total pages calculation");
    try {
      const totalPages = Math.ceil(
        (await publications.countDocuments(query)) / limit
      );
      console.log("Total pages:", totalPages);
      return totalPages;
    } finally {
      await client.close();
    }
  };

  me.getPublications = async ({ query }, { page }) => {
    /*
     * Requires the MongoDB Node.js Driver
     * https://mongodb.github.io/node-mongodb-native
     */

    const projection = {};
    const sort = {
      _id: -1,
    };
    const limit = 20;

    const { client, publications } = await connect();
    try {
      const totalPages = await me.getPublicationsTotalPages({ query, limit });

      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;
      const cursor = publications.find(query, {
        projection,
        sort,
        limit,
        skip: (page - 1) * limit,
      });
      const data = await cursor.toArray();
      return { data, totalPages, page };
    } finally {
      await client.close();
    }
  };

  me.addPublication = async (pub) => {
    const { client, publications } = await connect();
    try {
      const result = await publications.insertOne(pub);
      return result;
    } finally {
      await client.close();
    }
  };

  me.updatePublication = async (id, pub) => {
    const { client, publications } = await connect();
    try {
      const result = await publications.updateOne({ _id: id }, { $set: pub });
      return result;
    } finally {
      await client.close();
    }
  };

  me.deletePublication = async (id) => {
    const { client, publications } = await connect();
    try {
      const result = await publications.deleteOne({ _id: id });
      return result;
    } finally {
      await client.close();
    }
  };

  me.getPublicationById = async (id) => {
    const { client, publications } = await connect();
    try {
      const mongoID = ObjectId.createFromHexString(id);
      const result = await publications.findOne({ _id: mongoID });
      return result;
    } finally {
      await client.close();
    }
  };
  return me;
}

export default MyMongoDB();
