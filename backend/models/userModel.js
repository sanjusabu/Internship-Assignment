const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  mobilenumber: {type:Number, required:true,minlength: 10 } 
});
const SALT_WORK_FACTOR = 10
userSchema.pre('save',async function save(next){
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password)
    return next();
  } catch (err) {
    console.log(err)
    return next(err)
}})

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserModel', userSchema);
