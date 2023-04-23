const db = require("../app/models/index");

class GenreServices {
  // Get all genres
  getGenresService() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Genre.findAll(
          { order: [["name", "ASC"]] },
          { raw: true }
        );
        resolve({
          err: response ? 0 : 1,
          msg: response ? "OK" : "Fail to get all genres",
          response,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async creatGenreService({ name, description, slug }) {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await db.Genre.count({
          where: {
            slug,
          },
        });

        if (count > 0) {
          resolve({
            err: 2,
            msg: "Thể loại đã tồn tại",
          });
        } else {
          const response = await db.Genre.create({ name, description, slug });
          resolve({
            err: 0,
            msg: "OK",
            response,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  getSingleGenreService(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Genre.findOne({
          where: { id },
        });
        resolve({
          err: response ? 0 : 1,
          msg: response ? "OK" : "Thể loại không tồn tại",
          response,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  updateGenreService(genre, id) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.Genre.update(genre, { where: { id: id } });
        resolve({
          err: 0,
          msg: "Updated",
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteGenreService(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Genre.destroy({ where: { id: id } });

        resolve({
          err: response > 0 ? 0 : 1,
          msg: response > 0 ? "Deleted" : "No genre delete",
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new GenreServices();
