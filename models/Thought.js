const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/dateFormat.js');

const ReactionSchema = new Schema(
  {
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
},
{
  toJSON: {
    virtuals: true,
    getters: true
  }, 
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
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username:
      {
        type: String,
        required: true
      },
      reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
