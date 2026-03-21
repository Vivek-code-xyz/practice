import bcrypt from 'bcrypt'

export default async function hashPassword(pass){
    const password = await bcrypt.hash(pass,10)
    return password
}