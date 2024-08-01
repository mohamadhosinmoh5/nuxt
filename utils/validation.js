function validation(data, validations,field) {
  console.log(data, validations,field);
  const errors = [];
  validations.forEach((type) => {
        if (type == 'required' && data == "") {
            errors.push(`${field} نمیتواند خالی باشد`);
        }

        const phoneNumber = data;
        if (
          type == 'phone' 
          &&
          !phoneNumber 
          ||
          phoneNumber.length !== 11 
          ||
          !phoneNumber.startsWith("09")
        ) {
          errors.push(`شماره تماس باید 11 رقم باشد و با 09 شروع شود.`);
        }

        if (type == 'numeric' && typeof data === "number") {
          errors.push(`لطفا عدد وارد کنید.`);
        }

        if (type == 'string' && typeof data === "string") {
          errors.push(`${field} باید از نوع رشضته باشد`);
        }

        if (typeof type == "object" && type.hasOwnProperty('min') && data.length < type.min) {
          errors.push(`تعداد کاراکتر فیلد ${field} نباید کمتر از ${type.min} باشد`);
        }


        if (typeof type == "object" && type.hasOwnProperty('max') && data.length > type.max) {
          errors.push(`تعداد کاراکتر فیلد ${field} نباید بیشتر از ${type.max} باشد`);
        }

        if (typeof type == "object" && type.hasOwnProperty('min') && data.length < type.min) {
          errors.push(`${field} باید از نوع رشضته باشد`);
        }
  });
  return errors.length == 0 ? true : errors;
}

export default validation;
