const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SkillSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  baseDamage: { type: Number, default: 0 },
  damageModifier: { type: Number, default: 1 },
  cooldown: { type: Number, required: true },
  type: { type: String, required: true },
  effect: {
    buff: {
      stat: { type: String, enum: ['strength', 'atk', 'matk'] },
      amount: { type: Number },
      duration: { type: Number }
    },
    conditionalDamage: {
      condition: { type: String },
      bonusDamage: { type: Number }
    }
  }
});
const HeroSchema = new Schema({
  name: { type: String, required: true },
  heroType: { type: String, required: true },
  baseAttributes: {
    strength: { type: Number, required: true },
    intelligence: { type: Number, required: true },
    dexterity: { type: Number, required: true }
  },
  stats: {
    hp: { type: Number, required: true },
    atk: { type: Number, required: true },
    matk: { type: Number, required: true },
    def: { type: Number, required: true },
    mdef: { type: Number, required: true },
    physicalCritical: { type: Number, required: true },
    magicCritical: { type: Number, required: true }
  },
  extraAttributes: { type: Schema.Types.Mixed, default: {} },
  skills: {
    type: [SkillSchema],
    validate: {
      validator: function(val) { return val.length === 4; },
      message: 'A hero must have exactly 4 skills.'
    }
  },
  imageUrl: { type: String },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
HeroSchema.pre('save', function(next) { this.updatedAt = Date.now(); next(); });
module.exports = mongoose.model('Hero', HeroSchema);
