const { Schema, model, Types } = require("mongoose");

const ReactionSchema = new Schema(
  {
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    min: [1, "There must be a valid character here!"],
    max: [280, "This reaction cannot be longer than 280 characters"]
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{
  toJSON: {
    virtuals: true,
    getters: true
  }, 
  id: false
});


const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "A valid thought is required",
      trim: true,
      min: [1, "A thought must be at least 1 character long"],
      max: [280, "A thought must be less than 280 characters long"]
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: [
      {
        type: String,
        required: true
      },
    ],
      reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
})

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
