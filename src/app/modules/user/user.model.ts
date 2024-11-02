import bcrypt  from 'bcrypt';
import { TUser } from './user.interface'
import { model, Schema } from 'mongoose'
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
    },
    role: {
      type: String,
      enum: ['admin', 'client', 'donor'],
    },
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true },
)

// password hashing pre middleware
userSchema.pre("save", async function () {
  // console.log(this, " is pre middleware");
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
})

userSchema.post("save", function(doc, next){
doc.password = "",
next();
})

export const User = model<TUser>("User", userSchema);