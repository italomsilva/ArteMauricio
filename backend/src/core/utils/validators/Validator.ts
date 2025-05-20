import { BadRequestException } from '@nestjs/common';

export class Validator {
  static validateInput(input: Input, requiredfields: RequiredFields) {
    for (var fieldName in requiredfields.fields) {
      const fields = requiredfields.fields;
      if (fields[fieldName].require == true) {
        if (
          input[fieldName] == null ||
          input[fieldName] == undefined ||
          input[fieldName] == ''
        )
          throw new BadRequestException(`Field '${fieldName}' is Required`);
      }
    }
  }
}

type RequiredFields = {
  fields: {
    [fieldName: string]: {
      require: boolean;
    };
  };
};

type Input = {
  decodedToken?: {
    userId?: string;
    email: string;
  };
  [fields: string]: any;
};
