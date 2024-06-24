export async function seed(knex) {
    await knex('sighted_cats').insert([
      {
        sighted_cat_id: 1001,
        user_id_sc: 1,
        cat_id_mc: 1,
        color: 'blue with White ',
        description: 'Friendly white cat with blue eyes found near the park',
        date_seen: '2023-01-20',
        lat:"-41.285575",
        lng: "174.763563",
        location: "-41.285575, 174.763563",
        string_location: "16 Ngaio Road, Kelburn, Wellington ",
        sighted_cat_phone: '022-021-2355',
        sighted_cat_email: 'founder@example.com',
        sighted_image_url: 'images/sighted_cats/creed-sighting.jpg',
      },
      {
        sighted_cat_id: 1002,
        user_id_sc: 2,
        cat_id_mc: 2,
        color: 'Orange',
        description: 'Brown Siamese cat found in the backyard',
        date_seen: '2023-02-25',
        lat:"-41.301955",
        lng: "174.794548",
        location: "-41.301955, 174.794548",
        string_location: "22B Konini Road, Hataitai, Wellington 6021",
        sighted_cat_phone: '022-021-2355',
        sighted_cat_email: 'rescuer@example.com',
        sighted_image_url: 'images/sighted_cats/butters-sighting.jpg',
      },
      {
        sighted_cat_id: 1003,
        user_id_sc: 2,
        cat_id_mc: 2,
        color: 'Orange',
        description: 'Friendly white cat with blue eyes found near the park',
        date_seen: '2023-02-25',
        lat:"-41.302228",
        lng: "174.780418",
        location: "-41.302228, 174.780418",
        string_location: "11 Girton Terrace, Mount Cook, Wellington",
        sighted_cat_phone: '022-021-2355',
        sighted_cat_email: 'rescuer@example.com',
        sighted_image_url: 'images/sighted_cats/butters-sighting.jpg',
      },
    ])
  }