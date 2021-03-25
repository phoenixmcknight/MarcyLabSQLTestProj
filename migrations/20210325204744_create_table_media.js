exports.up = function (knex) {
  return knex.schema.createTable("media", function (table) {
    table.increments("id");
    table.int("user_id");
    table.string("file_name");
    table.string("url");
    table.string("timestamp");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("media");
};
