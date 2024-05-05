function validate(data, validations) {
  const errors = [];
  validations.forEach((type) => {
    switch (type) {
      case "required":
        if (data == "") {
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
          errors.push(`شماره تماس باید 11 رقم باشد و با 09 شروع شود.`);
        }
        break;
      case "number":
        if (isNaN(data)) {
          errors.push(`لطفا عدد وارد کنید.`);
        }
        break;
    }
  });
  return errors.length == 0 ? true : errors;
}

export default validate;
