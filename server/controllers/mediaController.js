import Media from "../models/Media.js";

export const getMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addMedia = async (req, res) => {
  try {
    const { type, urls, title } = req.body;
    let mediaDocs = [];

    // If image files were uploaded
    if (type === "photo" && req.files && req.files.length > 0) {
      mediaDocs = req.files.map(file => ({
        type,
        url: file.location,
        title
      }));
    } else if (urls) {
      // Split comma or newline separated URLs and clean whitespace
      const urlList = Array.isArray(urls) ? urls : urls.split(/[,\n]+/).map(u => u.trim()).filter(u => u);
      mediaDocs = urlList.map(u => ({
        type,
        url: u,
        title
      }));
    }

    if (mediaDocs.length === 0) {
      return res.status(400).json({ success: false, message: "Media URL(s) or file(s) are required." });
    }

    const newMedia = await Media.insertMany(mediaDocs);
    res.status(201).json({ success: true, media: newMedia });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBulkMedia = async (req, res) => {
  try {
    const { type, urls } = req.body;
    
    // Clean and split the URLs
    const urlList = Array.isArray(urls) ? urls : urls.split(/[,\n]+/).map(u => u.trim()).filter(u => u);
    
    // Wipe all existing media for this specific type
    await Media.deleteMany({ type });
    
    // Insert new URLs
    const mediaDocs = urlList.map(u => ({ type, url: u }));
    const newMedia = await Media.insertMany(mediaDocs);
    
    res.status(200).json({ success: true, media: newMedia });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    await Media.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Media deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
