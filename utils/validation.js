import { isEmpty } from "ol/extent";

function validate(data, validations) {
  const errors = [];
  validations.forEach((type) => {


    switch (type) {
      case "required":
        if(data == ''){
          errors.push(`فیلد نمیتواند خالی باشد`);
        }

        break;
      case "phoneNumber":
        const phoneNumber = data;
        if (
          !phoneNumber ||
          phoneNumber.length !== 11 ||
          !phoneNumber.startsWith("09")
        ) {
          errors.push(
            `${data} must be a valid phone number starting with "09" and have 11 digits.`
          );
        }
        break;
      case "number":
        if (isNaN(data)) {
          errors.push(`${type} must be a number.`);
        }
        break;
      case "photo":
        const photo = data;
        if (!photo) {
          errors.push(`${type} is required.`);
        } else if (!photo.type.startsWith("image/")) {
          errors.push(`${type} must be a photo.`);
        }
        break;
      case "photoSize":
        const maxSize = 4 * 1024 * 1024; // 4 megabytes in bytes
        const photoSize = data.photo ? data.photo.size : null;
        if (photoSize && photoSize > maxSize) {
          errors.push(`${type} must be no larger than 4 megabytes.`);
        }
        break;
      case "maxPhotos":
        const maxPhotos = 10;
        const photoInputs = Object.values(data).filter(item => item instanceof File && item.type.startsWith("image/"));
        if (photoInputs.length > maxPhotos) {
          errors.push(`${type} cannot exceed 10 photos.`);
        }
        break;
    }
  });
  return errors.length == 0 ? true : errors;
}

export default validate;
