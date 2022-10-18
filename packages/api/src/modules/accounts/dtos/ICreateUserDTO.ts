interface ICreateUserDTO {
  email: string;
  name: string;
  password: string;
  roleId: string;
  phoneNumber?: string;
}

export { ICreateUserDTO };
