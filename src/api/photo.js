const { Router } = require("express");
const multer = require("multer");
const authJWT = require("../jwt/auth");
const PhotosService = require("../services/photo");

const photosRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

photosRouter.post(
  "/upload",
  authJWT,
  upload.single("photo"),
  async (req, res) => {
    try {
      const savedPhoto = await PhotosService.uploadPhoto(req.file);
      if (!savedPhoto) {
        return res.status(400).send("Failed to upload photo");
      }
      res.status(201).send({ photo_id: savedPhoto._id });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

photosRouter.get("/cdn/:photo_id", async (req, res) => {
  try {
    const photo = await PhotosService.getPhotoById(req.params.photo_id);

    if (!photo) {
      return res.status(404).send("Photo not found");
    }

    res.set("Content-Type", photo.contentType);
    res.send(photo.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = photosRouter;
