import mongo from '../db/mongo';
// const { ObjectId } = require('mongodb');
const DATABASE = process.env.DATABASE;
const COLLECTION = 'brothers';

const getBrothers = async (req, res) => {
  try {
    await mongo.connect();
    const brothers = await mongo
      .db(DATABASE)
      .collection(COLLECTION)
      .toArray()

      res.json(brothers)
  } catch (error) {
    console.log('errorrr >> ', error);
  }
}

const getBrotherById = async (req, res) => {
  await mongo.connect();
  const { id } = req.params;

  const brother = await mongo
        .db(DATABASE)
        .collection(COLLECTION)
        .findOne((ObjectId(id)))

  return res.json(article)
}

const saveBrother = async (req, res) => {
  await mongo.connect();
  const { name, debt } = req.body;

  const brother = await mongo
    .db(DATABASE)
    .collection(COLLECTION)
    .insertOne({ name, debt, snacks: []})

  res.json(brother)
}
