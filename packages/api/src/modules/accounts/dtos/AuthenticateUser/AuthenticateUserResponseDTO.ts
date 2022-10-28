export class AuthenticateUserResponseDTO {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
