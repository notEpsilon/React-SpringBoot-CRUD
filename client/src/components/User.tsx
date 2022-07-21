import { IUser } from "../pages/HomePage";

interface Props {
  user: IUser;
  deleteUser: (id: number) => Promise<void>;
}

const User: React.FC<Props> = ({ user, deleteUser }) => {
  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-2 text-left">{user.id}</td>
      <td className="whitespace-nowrap px-6 py-2">{user.username}</td>
      <td className="whitespace-nowrap px-6 py-2">{user.password}</td>
      <td className="space-x-4 whitespace-nowrap px-6 py-2 text-right">
        <a className="cursor-pointer text-sm font-medium text-indigo-500 hover:text-indigo-600">
          Edit
        </a>
        <a
          onClick={() => deleteUser(user.id)}
          className="cursor-pointer text-sm font-medium text-indigo-500 hover:text-indigo-600"
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default User;
