const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectID
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  size: { type: String, required: true },
  shopId: { type: Schema.Types.ObjectId, ref: 'shops' },
});

commentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret.hash;
  },
});

module.exports = mongoose.model("Shoes", commentSchema);