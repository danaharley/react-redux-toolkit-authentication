import React from "react";
import { useAppSelector } from "../redux/store";

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-gray-200 px-5 py-5">
      <div className="w-[450px] rounded-lg bg-gray-900 text-white shadow-xl">
        <div className="border-b border-gray-800 px-8 py-3">
          <div className="mr-2 inline-block h-3 w-3 rounded-full bg-red-500" />
          <div className="mr-2 inline-block h-3 w-3 rounded-full bg-yellow-300" />
          <div className="mr-2 inline-block h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="px-8 py-6">
          <p>
            <em className="text-blue-400">const </em>
            <span className="text-green-400">aboutMe </span>
            <span className="text-pink-500">= </span>
            <em className="text-blue-400">function</em>() <span>&#123;</span>
          </p>
          <p>
            &nbsp;&nbsp;
            <span className="text-pink-500">return </span>
            <span>&#123;</span>
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;id:
            <span className="text-yellow-300"> '{user?._id}'</span>,
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;name:
            <span className="text-yellow-300"> '{user?.name}'</span>,
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;email:
            <span className="text-yellow-300"> '{user?.email}'</span>,
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;role:
            <span className="text-yellow-300"> '{user?.role}'</span>,
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;position:
            <span className="text-yellow-300"> 'fullstack-developer'</span>,
          </p>
          <p>
            &nbsp;&nbsp;<span>&#125;</span>
          </p>
          <p>
            <span>&#125;</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
