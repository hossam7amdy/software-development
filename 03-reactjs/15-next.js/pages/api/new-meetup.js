import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const client = await MongoClient.connect(
        "mongodb+srv://hossam7amdy:QTPuorXVGz3PA0jP@cluster0.x1a4nel.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();

      const meetupsCollection = db.collection("meetups");
      await meetupsCollection.insertOne(data);
      client.close();

      return res.status(201).json({ message: "Meetup inserted" });
    } catch (err) {
      return res.status(500).json(err || "Failed to insert the meetup");
    }
  }
}

export default handler;
