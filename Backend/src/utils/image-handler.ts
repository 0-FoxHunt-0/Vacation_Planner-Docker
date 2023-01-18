import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import fsPromises from "fs/promises";
import fs from "fs";
import dal from "./dal";
import imagePaths from "../models/enum";
import path from "path";
// const productImagesFolder = "./src/assets/images/products/";

async function saveImage(
  image: UploadedFile,
  imagePath: imagePaths
): Promise<string> {
  const uniqueImageUrl = createImageUrl(image.name);

  // Create unique image name
  const absolutePath = imagePath + uniqueImageUrl;

  // Save to disk
  await image.mv(absolutePath); // mv = move

  // Return new name
  return uniqueImageUrl;
}

function createImageUrl(originalImageUrl: string): string {
  // Take original extension
  const extension = originalImageUrl.substring(
    originalImageUrl.lastIndexOf(".")
  );

  // Create unique name including original extension (v4 = 36 char uuid)
  const uniqueImageUrl = uuidv4() + extension;

  // Return unique image name
  return uniqueImageUrl;
}

async function updateImage(
  image: UploadedFile,
  existingImageUrl: string,
  imagePath: imagePaths
): Promise<string> {
  // Save new image to disk
  await deleteImage(existingImageUrl, imagePath);

  // Delete existing image
  const uniqueImageUrl = await saveImage(image, imagePaths.vacations);

  return uniqueImageUrl;
}

async function deleteImage(
  existingImageUrl: string,
  imagePath: imagePaths
): Promise<void> {
  try {
    // If no image sent
    if (!existingImageUrl) return;

    // Delete image
    await fsPromises.unlink(imagePath + existingImageUrl);
  } catch (err: any) {
    console.error(err.message);
  }
}

async function getImageUrlFromDB(
  id: number,
  imagePath: imagePaths
): Promise<string> {
  if (imagePath === imagePaths.vacations) {
    console.log('products')
    const sql = `
    SELECT imageUrl FROM products
    WHERE ProductID = ${id}
    `;
    const products = await dal.execute(sql);
    const product = products[0];

    // If no such product:
    if (!product) return null;

    // Return image name
    return product.imageUrl;
  } else {
    console.log('employees')
    const sql = `
      SELECT imageUrl FROM employees
      WHERE EmployeeID = ${id}
      `;
    const employees = await dal.execute(sql);
    const employee = employees[0];

    // If no such product:
    if (!employee) return null;

    // Return image name
    return employee.imageUrl;
  }
}

function getAbsoluteVacationsPath(imageUrl: string): string {
  let absolutePath = path.join(
    __dirname,
    "..",
    "assets",
    "images",
    "vacations",
    imageUrl
  );
  if (!fs.existsSync(absolutePath)) {
    absolutePath = path.join(
      __dirname,
      "..",
      "assets",
      "images",
      "404-not-found",
      "image-not-found.jpg"
    );
  }
  return absolutePath;
}

function getAbsoluteEmployeesPath(imageUrl: string): string {
  let absolutePath = path.join(
    __dirname,
    "..",
    "assets",
    "images",
    "employees",
    imageUrl
  );
  if (!fs.existsSync(absolutePath)) {
    absolutePath = path.join(
      __dirname,
      "..",
      "assets",
      "images",
      "404-not-found",
      "image-not-found.jpg"
    );
  }
  return absolutePath;
}

export default {
  getImageUrlFromDB,
  saveImage,
  updateImage,
  deleteImage,
  getAbsoluteVacationsPath,
  getAbsoluteEmployeesPath,
};
