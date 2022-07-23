import React, { useState, useEffect, Fragment, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Container from "../components/Container";
import User from "../components/User";

export interface IUser {
  id: number;
  username: string;
  password: string;
  createdAt: string;
}

export interface PlainUser {
  username: string;
  password: string;
}

const HomePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [userData, setUserData] = useState<PlainUser>({
    username: "",
    password: ""
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const users = await res.json();
      setUsers(users);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  const deleteUser = async (id: number) => {
    await fetch(`http://localhost:8080/api/v1/users/${id}`, {
      method: "DELETE"
    });
    fetchUsers();
  };

  const addUser = async (user: PlainUser) => {
    await fetch("http://localhost:8080/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    fetchUsers();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser(userData);
    setUserData({ username: "", password: "" });
    setOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="home-page">
      <Container className="space-y-7 py-8">
        <button
          className="rounded bg-slate-700 px-6 py-2 font-medium text-white hover:bg-slate-600"
          onClick={() => setOpen(true)}
        >
          Add User
        </button>
        <Transition appear show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Add User
                    </Dialog.Title>
                    <div className="mt-2">
                      <form className="space-y-3" onSubmit={handleSubmit}>
                        <div>
                          <label
                            className="mb-1 block text-sm font-medium"
                            htmlFor="username"
                          >
                            Username
                          </label>
                          <input
                            className="w-full rounded-md  border border-gray-300 py-[0.2rem] px-2 outline-indigo-500"
                            type="text"
                            id="username"
                            value={userData.username}
                            onChange={(e) =>
                              setUserData((old) => ({
                                ...old,
                                username: e.target.value
                              }))
                            }
                            required
                          />
                        </div>
                        <div>
                          <label
                            className="mb-1 block text-sm font-medium"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <input
                            className="w-full rounded-md border border-gray-300 py-[0.2rem] px-2 outline-indigo-500"
                            type="password"
                            id="password"
                            value={userData.password}
                            onChange={(e) =>
                              setUserData((old) => ({
                                ...old,
                                password: e.target.value
                              }))
                            }
                            required
                          />
                        </div>
                        <div className="mt-4">
                          <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                            Confirm
                          </button>
                        </div>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        {loading ? (
          <p className="block text-lg font-medium tracking-wide">Loading...</p>
        ) : (
          <table className="w-full rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="whitespace-nowrap rounded-tl px-6 py-2 text-left">
                  ID
                </th>
                <th className="whitespace-nowrap px-6 py-2 text-left">
                  USERNAME
                </th>
                <th className="whitespace-nowrap px-6 py-2 text-left">
                  PASSWORD
                </th>
                <th className="whitespace-nowrap rounded-tr px-6 py-2 text-right">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <User key={user.id} user={user} deleteUser={deleteUser} />
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
