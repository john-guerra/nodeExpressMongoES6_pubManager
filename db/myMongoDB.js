import { MongoClient } from "mongodb";

function MyMongoDB() {
  const me = {};

  const connect = async () => {
    const client = await MongoClient.connect("mongodb://localhost:47017/");
    const publications = client
      .db("publicationManager")
      .collection("publications");

    return { client, publications };
  };

  me.getPublications = async () => {
    /*
     * Requires the MongoDB Node.js Driver
     * https://mongodb.github.io/node-mongodb-native
     */

    const filter = {};
    const projection = {
      title: 1,
      _id: 0,
    };
    const sort = {
      _id: -1,
    };
    const limit = 20;

    const { client, publications } = await connect();
    try {
      const cursor = publications.find(filter, { projection, sort, limit });
      return await cursor.toArray();
    } finally {
      await client.close();
    }
  };
  return me;
}

export default MyMongoDB();
