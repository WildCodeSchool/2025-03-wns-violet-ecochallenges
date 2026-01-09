export type Profile = {
  id: number;
  email: string;
  roles: string[];
  username: string;
};

export type ProfileLight = Omit<Profile, "roles">;
