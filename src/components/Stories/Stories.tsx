import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { User } from "../../typescript/types";
import Story from "../Story/Story";

export default function Stories() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const data = [...Array(20)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));

    setUsers(data);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-scroll scrollbar-hide">
      {users.map((user) => (
        <Story key={user.userId} image={user.avatar} username={user.username} />
      ))}
    </div>
  );
}
