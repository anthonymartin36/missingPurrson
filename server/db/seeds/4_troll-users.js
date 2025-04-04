export async function seed(knex) {
  await knex('troll-users').insert([
    {
      email: 'grendel@trolllifestyle.co.uk',
      first_name: 'Grendel',
      last_name: 'Troll',
      auth0_id: '1',
      active_bridge_id: null,
    },
    {
      email: 'dunker@trolllifestyle.ie',
      first_name: 'Dunker',
      last_name: 'O`Brien',
      auth0_id: '2',
      active_bridge_id: null,
    },
    {
      email: 'ymer@trollcombat.no',
      first_name: 'Aurgelmir',
      last_name: 'Johnson',
      auth0_id: '3',
      active_bridge_id: 1,
    },
    {
      email: 'anthony.martin36@gmail.com', 
      first_name: 'Anthony',
      last_name: 'Martin',
      auth0_id: 'google-oauth2|112179895623274375476',
      active_bridge_id: 4,
    }
  ])
}
