const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ConstellationConditionSchema = new Schema({
  field: { type: String, required: true },
  operator: { type: String, enum: ['==', '!=', '>=', '<=', '>', '<'], required: true },
  value: { type: Schema.Types.Mixed, required: true }
}, { _id: false });
const ConstellationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  conditions: [ConstellationConditionSchema],
  statBoosts: {
    hp: { type: Number, default: 0 },
    atk: { type: Number, default: 0 },
    matk: { type: Number, default: 0 },
    def: { type: Number, default: 0 },
    mdef: { type: Number, default: 0 },
    physicalCritical: { type: Number, default: 0 },
    magicCritical: { type: Number, default: 0 }
  }
});
module.exports = mongoose.model('Constellation', ConstellationSchema);
