const mongoose=require('mongoose')

const trainerRequestSchema= new mongoose.Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
},
{
    timestamps: true
  }

);

module.exports =mongoose.model("trainerRequest",trainerRequestSchema);