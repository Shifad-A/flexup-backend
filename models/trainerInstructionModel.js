const mongoose = require("mongoose");

const trainerInstructionSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  instructionDate: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0)
  }
}, { timestamps: true });

module.exports = mongoose.model(
  "TrainerInstruction",
  trainerInstructionSchema
);
