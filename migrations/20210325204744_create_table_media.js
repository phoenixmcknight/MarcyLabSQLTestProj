exports.up = function (knex) {
  return knex.schema.createTable("media", function (table) {
    table.increments("id");
    table.integer("user_id").reference("users.id");
    table.string("file_name");
    table.string("url");
    table.string("timestamp");
    // table.foreign("user_id").reference("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("media");
};
