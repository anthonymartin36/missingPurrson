export async function seed(knex) {
    await knex('sighted_cats').insert([
      {
        sighted_cat_id: 1,
        user_id_sc: 1,
        cat_id_mc: 1,
        color: 'blue with White ',
        description: 'Friendly white cat with blue eyes found near the park',
        date_seen: '2023-01-20',
        location: '40.730610, -73.935242',
        sighted_cat_phone: '022-021-2355',
        sighted_cat_email: 'founder@example.com',
        sighted_image_url: 'server/images/sighted_cats/creed-sighting.jpg',
      },
      {
        sighted_cat_id: 2,
        user_id_sc: 2,
        cat_id_mc: 2,
        color: 'Orange',
        description: 'Brown Siamese cat found in the backyard',
        date_seen: '2023-02-25',
        location: '34.052235, -118.243683',
        sighted_cat_phone: '022-021-2355',
        sighted_cat_email: 'rescuer@example.com',
        sighted_image_url: 'server/images/sighted_cats/butters-sighting.jpg',
      },
    ])
  }