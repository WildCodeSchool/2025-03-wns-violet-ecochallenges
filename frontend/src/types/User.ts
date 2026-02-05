export type Profile = {
  id: number;
  email: string;
  username: string;
  pictureUrl: string;
  roles: string[];
};

export type ProfileLight = Omit<Profile, "roles">;
