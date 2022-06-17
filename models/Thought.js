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
    maxlength: [280, "This reaction cannot be longer than 280 characters"]
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
    virtuals: true
  }
}
);


const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "A valid thought is required",
      trim: true,
      minlength: [1, "A thought must be at least 1 character long"],
      maxlength: [280, "A thought must be less than 280 characters long"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);



ThoughtSchema.virtual("usernames").get(function () {
  return this.username.map((user) => user.username);
});

reactionCount.virtual("reactionCount").get(function () {
  return this.reactions.length;
})

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
