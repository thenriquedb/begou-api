interface ICreateUserDTO {
  email: string;
  name: string;
  password: string;
  phone_number?: string;
}

export { ICreateUserDTO };
