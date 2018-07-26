function fixPath(path) {
  return "/" + path.replace("index.html", "");
}

function cutExcerpt(contents) {
  const strContent = contents.toString();
  const cutIndex = strContent.toLowerCase().indexOf("<!--cut-->");
  if (cutIndex > 0) {
    return strContent.substr(0, cutIndex);
  }
  return strContent;
}

module.exports = {
  fixPath,
  cutExcerpt
};
