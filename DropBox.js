const db = require("./db");
class DropBox {
  showUsers() {
    const users = db.any(`select * from users`);
    return users;
  }
  createUser(data) {
    const info = db.one(
      `insert into users (user_name) values ($1) returning id`,
      data.username
    );
    return info;
  }
  showUserMedia(id) {
    const media = db.any(`select * FROM media where user_id = ${id}`);
    return media;
  }
  uploadMedia(id, file, url) {
    const upload = db.none(
      "insert into media (user_id,file_name, url) values ($1, $2, $3)",
      [id, file, url]
    );
    return upload;
  }

  deleteMedia(id) {
    const del = db.none(`delete from media where id = ${id}`);
    return del;
  }
}

module.exports = DropBox;
