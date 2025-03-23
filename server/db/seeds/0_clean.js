export async function seed(knex) {
  await knex('sighted_cats').del()
  await knex('missing_cats').del()
  await knex('users').del()
  await knex('favourite-bridges').del()
  await knex('bridges').del()
  await knex('troll-users').del()
  await knex('toll-collected').del()
}
