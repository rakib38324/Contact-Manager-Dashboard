import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaEye, FaEdit } from "react-icons/fa";
import { FcDeleteDatabase } from "react-icons/fc";
import {
  addToLocalStorage,
  deleteToLocalStorage,
  getToLocalStorage,
  updateToLocalStorage,
} from "./LocalStorage/fackDB";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [users, setUsers] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({});

  useEffect(() => {
    const users = getToLocalStorage();
    setConfirm(false);
    setUsers(users);
  }, [confirm, personalInfo]);

  const onSubmit = (data) => {
    const exist = users.find((user) => {
      if (user.email === data.email || user.number === data.number) {
        return user;
      }
    });

    if (exist) {
      toast.error("User Already added");
    } else {
      addToLocalStorage(data);
      toast.success("User Added Successfully");
    }
  };

  const HandleToGetUser = (data) => {
    console.log(data);
    setPersonalInfo(data);
  };

  const handleToDelete = (person) => {
    deleteToLocalStorage(person);
    const restPersons = users.filter((user) => {
      if (person.email !== user.email) {
        return user;
      }
    });
    setUsers(restPersons);
    toast.success("User Delete Successfully");
  };

  const update = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const data = { name: name, email: email, number: number };
    const person = users.find((user) => user.email === personalInfo.email);
    updateToLocalStorage(data, person);
    person.name = data.name;
    person.email = email;
    person.number = number;
    setPersonalInfo(person);
    toast.success("User Update Successfully");
  };

  return (
    <div className="m-2">
      <div>
        <p className="text-4xl font-bold text-center mt-10 text-green-800">
          Welcome to Contact Manager Dashboard
        </p>
        <p className="mt-5 text-xl font-semibold">
          Hello Dear, This is a user's dashboard. You can add users and at the
          same time, you also View the particular user information, also edit
          and delete users. Shortly, I can say that this is a "CRUD" operation.
          All Information saved "Local Storage". <br /> <br /> So, let's
          start...
        </p>

        <p className="mt-5 text-2xl font-bold">
          Please add users:{" "}
          <label
            htmlFor="adduser"
            className="border-2 border-green-600 bg-green-400 px-2 py-1 rounded-lg text-lg  cursor-pointer hover:bg-green-800 hover:text-white"
          >
            + Add New User
          </label>
        </p>
      </div>

      <div className="lg:grid lg: grid-cols-3 gap-2">
        {users.length ? (
          <>
            {users.map((user) => (
              <div
                key={user.email}
                className="mt-5 grid grid-cols-6 bg-green-200 border-2  border-green-500 rounded-lg p-2 shadow-lg hover:border-green-800 hover:bg-green-400"
              >
                <div className="col-span-5 ">
                  <p className="border-2  border-green-600 rounded-lg bg-green-100 m-1 p-1">
                    Name: <span className="font-semibold ">{user.name}</span>
                  </p>
                  <p className="border-2  border-green-600 rounded-lg bg-green-100 m-1 p-1">
                    Email: <span className="font-semibold">{user.email}</span>
                  </p>
                  <p className="border-2  border-green-600 rounded-lg bg-green-100 m-1 p-1">
                    Phone: <span className="font-semibold">{user.number}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-1  my-auto">
                  {/* The button to open modal */}
                  <label
                    onClick={() => HandleToGetUser(user)}
                    htmlFor="view"
                    className="p-1 my-auto cursor-pointer bg-green-300 rounded-lg text-xl flex justify-center mx-1 border-2 border-green-500"
                  >
                    <FaEye></FaEye>
                  </label>

                  <label
                    htmlFor="edit"
                    onClick={() => HandleToGetUser(user)}
                    className="p-1 my-auto cursor-pointer bg-blue-300 rounded-lg text-xl flex justify-center mx-1 border-2 border-blue-500"
                  >
                    <FaEdit></FaEdit>
                  </label>

                  <button
                    onClick={() => handleToDelete(user)}
                    className="p-1 my-auto bg-red-100 rounded-lg text-xl flex justify-center mx-1 border-2 border-red-500"
                  >
                    <FcDeleteDatabase></FcDeleteDatabase>
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="col-span-3 mt-10">
            <h1 className="text-center text-6xl font-extrabold mt-10">
              No Data Found
            </h1>
          </div>
        )}
      </div>

      {/* modal for View User Information*/}
      <input type="checkbox" id="view" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <span className="font-semibold text-2xl">Personal Information </span>
          <div className="mt-5  bg-green-200 rounded-md p-2 border-2 border-green-500">
            <div className="col-span-5 text-xl">
              <p className="border-2 border-green-500 rounded-md  m-2 mt-4 bg-green-100 p-1">
                Name:{" "}
                <span className="font-semibold ">{personalInfo.name}</span>
              </p>
              <p className="border-2 border-green-500 rounded-md  m-2 mt-4 bg-green-100 p-1">
                Email:{" "}
                <span className="font-semibold">{personalInfo.email}</span>
              </p>
              <p className="border-2 border-green-500 rounded-md  m-2 mt-4 bg-green-100 p-1">
                Phone:{" "}
                <span className="font-semibold">{personalInfo.number}</span>
              </p>
            </div>
          </div>

          <div className="modal-action">
            <label
              htmlFor="view"
              className="p-3 px-6 font-semibold bg-green-400 rounded-xl cursor-pointer border-2 border-green-700"
            >
              Ok
            </label>
          </div>
        </div>
      </div>

      {/* modal for Edit*/}
      <input type="checkbox" id="edit" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box ">
          <span className="font-semibold text-2xl">
            Please Enter User Information
          </span>
          <div>
            <div className="flex justify-center">
              {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
              <form onSubmit={update} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={personalInfo.name}
                    className="input input-bordered input-success"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={personalInfo.email}
                    className="input input-bordered input-success"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">number</span>
                  </label>
                  <input
                    type="number"
                    name="number"
                    defaultValue={personalInfo.number}
                    className="input input-bordered input-success"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn text-xl text-black bg-green-600 hover:bg-green-900 hover:text-white">
                    Update user
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="edit"
              className="p-3 px-4 bg-green-400 font-semibold rounded-lg cursor-pointer border-2 border-green-700"
            >
              Ok
            </label>
          </div>
        </div>
      </div>

      {/* modal for Add new User*/}
      <input type="checkbox" id="adduser" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box ">
          <span className="font-semibold text-2xl">
            Please Enter User Information
          </span>
          <div>
            <div className="flex justify-center">
              {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full ">
                  <label className="label">
                    <span className=" text-xl text-green-700 font-bold">
                      Name
                    </span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Jeson Ray"
                    className="input input-bordered-2 input-success  w-full  rounded-lg"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-600 font-semibold mt-2">
                    Please fill up Email field
                  </span>
                )}

                <div className="form-control w-full ">
                  <label className="label">
                    <span className=" text-xl text-green-700 font-bold">
                      Email
                    </span>
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="ray@gmail.com"
                    className="input input-bordered-2 input-success  w-full  rounded-lg"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-600 font-semibold mt-2">
                    Please fill up Email field
                  </span>
                )}

                <div className="form-control w-full mt-1">
                  <label className="label">
                    <span className=" text-xl text-green-700 font-bold">
                      Phone Number
                    </span>
                  </label>
                  <input
                    {...register("number", { required: true })}
                    type="number"
                    placeholder="Enter Your Password"
                    className="input input-bordered-2 input-success w-full  rounded-lg"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setConfirm(!confirm)}
                    className="text-xl p-2 px-4 border-2 border-green-700 bg-green-300 mt-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white"
                  >
                    ADD USER
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="adduser"
              className="p-3 px-4 bg-green-400 font-semibold rounded-lg cursor-pointer border-2 border-green-700"
            >
              Ok
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
