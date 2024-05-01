const bodyParser = require('body-parser')
const app = require('express')()
app.use(bodyParser.json())

import { find } from 'lodash';
import mongo from './db/mongo';
const { ObjectId } = require('mongodb');
const DATABASE = process.env.DATABASE;
const COLLECTION = 'brothers';


const findAll = async () => {
  try {
    await mongo.connect();
    const brothers = await mongo
      .db(DATABASE)
      .collection(COLLECTION)
      .find({})
      .toArray();

    return brothers;
  } catch (error) {
    console.log('GET /brothers exception:', error);
  }
}

app.get('/brothers', async (req, res) => {
  res.json(await findAll())
})



app.get('/brothers/:id', async (req, res) => {
  try {
    await mongo.connect();
    const { id } = req.params;

    const brother = await mongo
          .db(DATABASE)
          .collection(COLLECTION)
          .findOne((ObjectId(id)))

    return res.json(brother)

  } catch (error) {
    console.log('GET /brothers/:id exception:', error);
  }
})

app.post('/brothers', async (req, res) => {
  try {
    await mongo.connect();
    const { name, debt } = req.body;
    const brother = await mongo
      .db(DATABASE)
      .collection(COLLECTION)
      .insertOne({ name, debt, snacks: []})

    res.json(brother)

  } catch (error) {
    console.log('POST /brothers exception:', error);
  }
})

app.put('/brothers/sum-snack/:id', async (req, res) => {
  try {
    await mongo.connect();
    const { id } = req.params;
    const { snack } = req.body;
    const brother = await mongo
    .db(DATABASE)
    .collection(COLLECTION)
    .findOne((ObjectId(id)));

    if (!brother) {
      return res.status(404).json({ error: 'Brother not found' });
    }

    brother.debt += snack.price;
    brother.snacks.push(snack);

    await mongo
      .db(DATABASE)
      .collection(COLLECTION)
      .updateOne({ _id: ObjectId(id) }, { $set: { debt: brother.debt, snacks: brother.snacks } });

    return res.json(await findAll())

  } catch (error) {
    console.log('PUT /brothers/sum-snack/:id exception:', error);
  }
})

app.put('/brothers/pay-debt/:id', async (req, res) => {
  try {
    await mongo.connect();
    const { id } = req.params;
    const { amount } = req.body;
    const brother = await mongo
    .db(DATABASE)
    .collection(COLLECTION)
    .findOne((ObjectId(id)));

    if (!brother) {
      return res.status(404).json({ error: 'Brother not found' });
    }

    brother.debt -= amount;

    await mongo
      .db(DATABASE)
      .collection(COLLECTION)
      .updateOne({ _id: ObjectId(id) }, { $set: { debt: brother.debt } });

    return res.json(await findAll())

  } catch (error) {
    console.log('PUT /brothers/pay-debt/:id exception:', error);
  }
})

module.exports = app
