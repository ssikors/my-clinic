export type User = {
  id: string;
  isActivated: boolean;
  userRole: string;
  fullName: string;
  emailAddress: string;
  passwordHash: string;
};