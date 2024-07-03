"use client";

import { useState, useRef, useCallback } from "react";
import useFetchUserList from "@/hooks/useFetchUserList";
import Loading from "./loading";
import UserDetails from "./userDetails";

const UsersList = () => {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState({});
  const { loading, error, data, hasMore } = useFetchUserList(page);
  const [fetching, setFetching] = useState(false);

  const observer = useRef();

  // console.log(data);
  const lastUser = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setFetching(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
            setFetching(false);
          }, 2000);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <main className="max-w-3xl mx-auto p-3 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <section className="item-1 p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900 ">
              Users
            </h3>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              {data?.map((user, index) => {
                if (data.length === index + 1) {
                  return (
                    <li
                      ref={lastUser}
                      key={user.profile.email}
                      className="py-3 sm:py-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={user.avatar}
                            alt={user.profile.firstName + user.profile.lastName}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate ">
                            {user.profile.firstName + user.profile.lastName}
                          </p>
                          <p className="text-sm text-gray-500 truncate ">
                            {user.jobTitle}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={user.profile.email}
                      className="py-3 sm:py-4 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={user.avatar}
                            alt={user.profile.firstName + user.profile.lastName}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate ">
                            {user.profile.firstName + user.profile.lastName}
                          </p>
                          <p className="text-sm text-gray-500 truncate ">
                            {user.jobTitle}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
            <div className="text-xs text-center text-gray-400">
              {fetching && "Please hold while fetching data..."}
            </div>
            <div>{loading && <Loading />}</div>
            {error && (
              <div className="text-lg text-center text-red-500">
                "Error! Try Again Later"
              </div>
            )}
            <div className="text-xs text-center text-gray-400">
              {!hasMore && "End of the list!!  No Users to fetch"}
            </div>
          </div>
        </section>
        <UserDetails user={selectedUser} />
      </main>
    </>
  );
};

export default UsersList;
