export async function seed(knex) {
  await knex('sighted_cats').del()
  await knex('missing_cats').del()
  await knex('users').del()
}
