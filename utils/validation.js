function validate(data, validations,field) {
  console.log(data, validations,field);
  const errors = [];
  validations.forEach((type) => {
    switch (type) {
      case "required":
        if (data == "") {
          errors.push(`${field} نمیتواند خالی باشد`);
        }

        break;
      case "phone":
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
        if (typeof data === "number") {
          errors.push(`لطفا عدد وارد کنید.`);
        }
        break;
      case "string":
          if (typeof data === "string") {
            errors.push(`${field} باید از نوع رشضته باشد`);
          }
          break;
    }
  });
  return errors.length == 0 ? true : errors;
}

export default validate;
