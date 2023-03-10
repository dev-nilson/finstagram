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
  username: string;
};

export type PostProps = {
  id: string;
  username: string;
  image: string;
  caption: string;
  expected: string;
  reality: string;
};
