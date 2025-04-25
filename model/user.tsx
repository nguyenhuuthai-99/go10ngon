type User = {
  name: string;
  email: string;
  password: string;
  level: number;
  experience: number;
  login: (username: string, password: string) => Promise<string>;
  logout: () => Promise<string>;
};
