// src/utils/sponsor.js
import User from '../models/User'
import Transaction from '../models/Transaction'


// প্রথম থেকে nth লেভেল পর্যন্ত প্রদেয় আমাউন্ট
export const COMMISSIONS = [20,5,3,3,3,3,3,2.5,2.5,2.5,2.5,0]


export async function distributeCommissions(newUserId){
// newUserId হল যাকে অ্যাডমিন অ্যাপ্রুভ করেছে
let currentUser = await User.findById(newUserId).populate('sponsor')
if(!currentUser) return


// শুরুতে currentUser.sponsor হল প্রথম লেভেলের স্পন্সর
let sponsor = currentUser.sponsor
for (let i = 0; i < COMMISSIONS.length; i++){
if(!sponsor) break
const amount = COMMISSIONS[i]
if(amount && amount > 0){
sponsor.balance = (sponsor.balance || 0) + amount
await sponsor.save()
await Transaction.create({ user: sponsor._id, amount, fromUser: newUserId, level: i+1, note: `Level ${i+1} commission` })
}
// পরের লেভেলের স্পন্সর পাওয়া
const nextSponsor = await User.findById(sponsor._id).populate('sponsor')
sponsor = nextSponsor ? nextSponsor.sponsor : null
}
}