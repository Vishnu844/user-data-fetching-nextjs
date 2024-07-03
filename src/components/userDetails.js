"use client";

import React from "react";

const UserDetails = ({ user = {} }) => {
  return (
    <>
      {Object.keys(user).length == 0 ? (
        <div className="text-lg h-fit bg-white overflow-hidden shadow-md rounded-lg border p-4">
          {" "}
          Start by Selecting a user to see full details of user !!
        </div>
      ) : (
        <section className="static right-0 mr-0 mt-1 item-2 h-fit bg-white overflow-hidden shadow-md rounded-lg border sm:mr-48 sm:fixed sm:right-1">
          <div className="flex items-center py-5">
            <div className="px-2 sm:px-4">
              <img
                src={user.avatar}
                alt={user.profile.firstName + user.profile.lastName}
                className="w-20 h-20 rounded object-contain"
              />
            </div>
            <div className="px-2 sm:px-4 w-52">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {user.profile.username}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{user.Bio}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.profile.firstName + " " + user.profile.lastName}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.profile.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Job title</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.jobTitle}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Created at
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(user.createdAt).toDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      )}
    </>
  );
};

export default UserDetails;
