export const db_config = {
  db_name: process.env.DB_NAME || "",
  db_uri: process.env.DB_URI || "",
};

export const cloudinary_config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  secret_key: process.env.CLOUDINARY_SECRET_KEY,
};
