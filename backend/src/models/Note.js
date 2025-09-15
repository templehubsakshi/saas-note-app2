import mongoose from 'mongoose';
const NoteSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        content:{
            type:String,
            default:""
    },
    tenantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tenant",
        required:true,
    },
    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Note kis user ne banaya
    },
  },
  {
    timestamps: true, // createdAt & updatedAt automatically add ho jayenge
  }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;