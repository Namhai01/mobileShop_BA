module.exports = {
  app: {
    PORT: "3001",
    STATIC_PATH: `${__dirname} + /../src/public`,
    tmp: `${__dirname} + /../src/tmp`,
  },
  DB: {
    MONGODB_URL:
      "mongodb+srv://namhai:300720@cluster0.jrzoquf.mongodb.net/VietPro",
    // MONGODB_URL_DEV: "mongodb://localhost:27017/vp_shop_project",
  },
  NODE_ENV: "production",
};
