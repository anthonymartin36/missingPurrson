import connection from './connection'
import { User, NewUser } from '../../models/user'

export async function getAUserDb(
  auth0_id: any,
  db = connection,
): Promise<User[]> {
  return await db('users')
    .select(
      'user_id as userId')
    .where('auth0_id', auth0_id)
    .first()
    .returning('*')
}

export async function addAUserDb(newUser: NewUser, db = connection) {
  try {
    const addedUser = await db('users').insert({
      username: newUser.username,
      email: newUser.email,
      auth0_id: newUser.auth0Id,
      given_name: newUser.givenName,
      family_name: newUser.familyName,
    }).returning('user_id')
  } catch (error) {
    console.error('Error in addUser:', error)
    throw error
  }
}

export async function checkUserDb(
  auth0_id: any,
  db = connection,
): Promise<any>{
  return await db('users')
    .select('user_id as userId')
    .where('auth0_id', auth0_id)
    .first()
    .returning('user_id')
}
