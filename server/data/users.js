import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
disable: false,
  },
  {
    name: "User",
    email: "user@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    disable: false,
  },
];

export default users;
