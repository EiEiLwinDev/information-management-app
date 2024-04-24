export const rules = {
    required: {
      required: "This field is required",
    },
    requiredEmail: {
      required: "This field is required",
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "This field must be a valid address email",
      },
    },
    email: {
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "This field must be a valid address email",
      },
    },
    url: {
      pattern: {
        value:
          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%\+.~#?&\/=]*)$/,
        message:
          "This field must be a valid url, ex: https://www.ata-services.com",
      },
    },
    password: {
      required: "This field is required",
    },
    plainPassword: {
      required: "This field is required",
      pattern: {
        value: /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,}$/,
        message:
          "The password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters",
      },
    },
    taxId: {
      required: "This field is required",
      pattern: {
        value: /^(\d{13})?$/,
        message: "The tax ID must have 13 digits",
      },
    },
    citizenId: {
      required: "This field is required",
      pattern: {
        value: /^(\d{13})?$/,
        message: "The citizen ID must have 13 digits",
      },
    },
    socialInsuranceId: {
      required: "This field is required",
      pattern: {
        value: /^(\d{13})?$/,
        message: "The social insurance ID must have 13 digits",
      },
    },
    companySocialInsuranceId: {
      required: "This field is required",
      pattern: {
        value: /^(\d{10})?$/,
        message: "The social insurance ID must have 10 digits",
      },
    },
    phone: {
      required: "This field is required",
      pattern: {
        value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        message: "This field must be a valid phone number",
      },
    },
   
    branchCode: {
      pattern: {
        value: /^(\d{3})?$/,
        message: "The branch code must have 3 digits",
      },
    },
    accountNumber: {
      pattern: {
        value: /^(\d{10})?$/,
        message: "The account number must have 10 digits",
      },
    },
  };