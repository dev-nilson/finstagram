export type User = {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  birthdate: Date;
  registeredAt: Date;
};

export type StoryProps = {
  image: string;
  username: string;
};

export type PostProps = {
  id: string;
  username: string;
  image: string;
  caption: string;
};
