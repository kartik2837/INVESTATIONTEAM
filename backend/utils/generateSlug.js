function generateSlug(name) {
  const cleanedName = name
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/&/g, "and")
    .replace(/[^a-zA-Z0-9\-]/g, "") // Replace '&' with 'and'
    .toLowerCase(); // Convert to lowercase
  return cleanedName;
}

module.exports = generateSlug;
