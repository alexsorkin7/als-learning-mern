const mongoose = require('mongoose')
const coverImageBasePath = 'uploads/bookCovers'
const bookSchema = new mongoose.Schema({
   title:{
      type: String,
      required:true
   },
   description:{type: String},
   publishDate:{
      type: Date,
      required:true
   },
   pageCount:{
      type: Number,
      required:true
   },
   createdAt:{
      type: Date,
      required:true,
      default:Date.now
   },
   convertImage: {
      type:Buffer,
      required:true
   },
   convertImageType: {
      type:String,
      required:true
   },
   author: {
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'Author'
   }
})

bookSchema.virtual('coverImagePath').get(function() {
   if(this.convertImage != null && this.convertImageType != null) 
      return `data:${this.convertImageType};charset=utf-8;base64,${this.convertImage.toString('base64')}`
})

module.exports = mongoose.model('Book',bookSchema)
module.exports.coverImageBasePath = coverImageBasePath