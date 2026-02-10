const Instruction = require("../models/trainerInstructionModel");
const Trainer = require("../models/trainerRequestModel");

exports.addTrainerInstruction = async (req, res) => {
  try {
    const trainerId = req.id;
    const { userId, headline, instructions } = req.body;

    const relation = await Trainer.findOne({
      trainer: trainerId,
      user: userId,
      status: "accepted",
    });

    if (!relation) {
      return res.status(403).json({
        message: "You are not assigned to this client",
      });
    }

    const trainerInstructon = await Instruction.create({
      trainer: trainerId,
      user: userId,
      headline,
      instructions,
    });
    
    res.status(201).json({
      message: "Instruction saved",
      trainerInstructon,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getTrainerInstruction=async(req,res)=>{
    const userId=req.id
    console.log(req.body);
    console.log(userId);
    
    
    const trainerId=req.body.id

    try {
      const instructions=await Instruction.find({
      user:userId,
      trainer:trainerId
    })

    console.log(instructions);
    
    
    res.status(200).json(instructions)
      
    } catch (err) {
      res.status(500).json(err)
    }


}
