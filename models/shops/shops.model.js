const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  name: { type: String, required: true },
  adresse : { type: String, required: true },
  lat : { type: Number, required: true },
  long : { type: Number, required: true }
});

videoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret.hash;
  },
});

module.exports = mongoose.model("Shops", videoSchema);