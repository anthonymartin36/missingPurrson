import knex from 'knex'
import config from './knexfile.js'

type Environment = 'development' | 'production' | 'test'
const env = (process.env.NODE_ENV as Environment) || 'development' //import.meta.env.NODE_ENV
//console.log("env : ", env)
const connection = knex(config[env])

export default connection
