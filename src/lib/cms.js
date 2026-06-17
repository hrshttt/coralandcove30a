import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'cms.json');

export function getCmsData() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading CMS data:", error);
    return null;
  }
}

export function saveCmsData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error("Error writing CMS data:", error);
    return false;
  }
}
