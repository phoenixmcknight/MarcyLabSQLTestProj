exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("full_name");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
