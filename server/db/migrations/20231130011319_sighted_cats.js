export async function up(knex) {
<<<<<<< HEAD
    await knex.schema.createTable('sighted_cats', (table) => {
      table.increments('sighted_cat_id').primary()
      table.integer('user_id_sc').references('users.user_id')
      table.integer('cat_id_mc').references('missing_cats.cat_id')
      table.string('color')
      table.string('description')
      table.date('date_seen')
      table.string('lat')
      table.string('lng')
      table.string('location')
      table.string('string_location')
      table.string('sighted_cat_phone')
      table.string('sighted_cat_email')
      table.string('sighted_image_url')
    })
  }
  
  export async function down(knex) {
    await knex.schema.dropTable('sighted_cats')
  }
=======
  await knex.schema.createTable('sighted_cats', (table) => {
    table.increments('sighted_cat_id').primary()
    table.integer('user_id_sc').references('users.user_id')
    table.integer('cat_id_mc').references('missing_cats.cat_id')
    table.string('color')
    table.string('description')
    table.date('date_seen')
    table.string('location')
    table.string('string_location')
    table.string('sighted_cat_phone')
    table.string('sighted_cat_email')
    table.string('sighted_image_url')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('sighted_cats')
}
>>>>>>> parent of 0eb619e (image directory change, gmaps still an issue)
