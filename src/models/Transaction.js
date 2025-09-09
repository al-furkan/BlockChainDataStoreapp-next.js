import mongoose from 'mongoose'


const TransactionSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // যে ইউজার ব্যালান্স পেলো
amount: Number,
fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // যে রেজিস্ট্রেশন ট্রিগার করেছে
level: Number,
note: String,
createdAt: { type: Date, default: Date.now }
})


export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)