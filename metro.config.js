// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Adiciona mp4 e outros formatos de vídeo às extensões de assets
config.resolver.assetExts.push("mp4", "m4v", "mov");

module.exports = config;
