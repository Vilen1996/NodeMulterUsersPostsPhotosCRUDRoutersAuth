const Photo = require("../models/photo");

class PhotosService {
  static async uploadPhoto(file) {
    if (!file) {
      console.error("Invalid or missing file");
      return;
    }

    try {
      const photo = new Photo({
        data: file.buffer,
        contentType: file.mimetype,
      });

      const savedPhoto = await photo.save();
      return savedPhoto;
    } catch (error) {
      console.error(`Error uploading photo: ${error.message}`);
    }
  }

  static async getPhotoById(photoId) {
    if (!photoId) {
      console.error("Invalid or missing photo ID");
      return;
    }

    try {
      const photo = await Photo.findById(photoId);
      if (!photo) {
        console.error("Photo not found");
        return;
      }

      return photo;
    } catch (error) {
      console.error(`Error fetching photo: ${error.message}`);
    }
  }

  static async deletePhoto(photoId) {
    if (!photoId) {
      console.error("Invalid or missing photo ID");
      return;
    }

    try {
      const photoToDelete = await Photo.findById(photoId);
      if (!photoToDelete) {
        console.error("Photo not found");
        return;
      }

      await photoToDelete.deleteOne();
      return photoToDelete;
    } catch (error) {
      console.error(`Error deleting photo: ${error.message}`);
    }
  }
}

module.exports = PhotosService;
