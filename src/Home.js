import { handler } from "daisyui";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEdit } from "react-icons/fa";
import { FcDeleteDatabase } from "react-icons/fc";
import { addToLocalStorage, getToLocalStorage } from "./LocalStorage/fackDB";

const Home = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const [users, setUsers] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({});

  useEffect(() => {
    const users = getToLocalStorage();
    setConfirm(false);
    setUsers(users);
  }, [confirm]);

  //   const handleClick = () => resetField("firstName");

  const onSubmit = (data) => {
    // console.log(data);

    addToLocalStorage(data);
  };

  const HandleToGetUser = (data) => {
    // console.log(data)
    setPersonalInfo(data);
  };

  return (
    <div>
      <div>
        <p className="text-3xl font-bold text-center mt-10">
          Welcome to Contact Manager Dashboard
        </p>
        <p className="mt-5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          obcaecati enim atque impedit excepturi aut eaque quis repudiandae
          natus similique! Numquam exercitationem excepturi, ex officia
          doloremque amet accusantium nobis autem accusamus ullam explicabo
          dolore veritatis, laudantium debitis asperiores odit eveniet at
          dolorem quod tenetur deleniti atque recusandae nesciunt? Aperiam,
          consequatur?
        </p>

        <p className="mt-5 text-2xl font-bold">
          Please add User:{" "}
          <label
            htmlFor="adduser"
            className="border-2 border-green-600 bg-green-800 px-2 py-1 rounded-lg text-lg text-white cursor-pointer"
          >
            + Add New User
          </label>
        </p>
      </div>

      <div className="lg:grid lg: grid-cols-3 gap-2">
        {users?.length &&
          users.map((user) => (
            <div className="mt-5 grid grid-cols-6 bg-slate-300 rounded-xl p-2">
              <div className="col-span-5">
                <p className="border-2 m-1 p-1">
                  Name: <span className="font-semibold ">{user.name}</span>
                </p>
                <p className="border-2 m-1 p-1">
                  Email: <span className="font-semibold">{user.email}</span>
                </p>
                <p className="border-2 m-1 p-1">
                  Phone: <span className="font-semibold">{user.number}</span>
                </p>
              </div>

              <div className="flex flex-col gap-1 mt-1">
                {/* The button to open modal */}
                <label
                  onClick={() => HandleToGetUser(user)}
                  htmlFor="view"
                  className="p-2 cursor-pointer bg-green-300 rounded-lg text-xl flex justify-center mx-1"
                >
                  <FaEye></FaEye>
                </label>

                <label
                  htmlFor="edit"
                  className="p-2 cursor-pointer bg-blue-300 rounded-lg text-xl flex justify-center mx-1"
                >
                  <FaEdit></FaEdit>
                </label>

                <button className="p-2 bg-red-100 rounded-lg text-xl flex justify-center mx-1">
                  <FcDeleteDatabase></FcDeleteDatabase>
                </button>
              </div>
            </div>
          ))}
      </div>


      {/* modal for View User Information*/}
      <input type="checkbox" id="view" className="modal-toggle" />
      <div className="modal">
        
        <div className="modal-box">
        <span className="font-semibold text-2xl">Personal Information </span>
          <div className="mt-5  bg-green-500 rounded-md p-2">
            <div className="col-span-5 text-xl">
              <p className="border-2 border-green-700 rounded-md  m-2 mt-4 bg-green-300 p-1">
                Name:{" "}
                <span className="font-semibold ">{personalInfo.name}</span>
              </p>
              <p className="border-2 border-green-700 rounded-md  m-2 mt-4 bg-green-300 p-1">
                Email:{" "}
                <span className="font-semibold">{personalInfo.email}</span>
              </p>
              <p className="border-2 border-green-700 rounded-md  m-2 mt-4 bg-green-300 p-1">
                Phone:{" "}
                <span className="font-semibold">{personalInfo.number}</span>
              </p>
            </div>

          
          </div>

          <div className="modal-action">
            <label htmlFor="view" className="p-3 px-6 font-semibold bg-green-400 rounded-xl cursor-pointer border-2 border-green-700">
              Ok
            </label>
          </div>
        </div>
      </div>

      {/* modal for Edit*/}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="edit" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="edit" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>

      {/* modal for Add new User*/}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="adduser" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box ">
          <span className="font-semibold text-2xl">Please Enter User Information</span>
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
            <label htmlFor="adduser" className="p-3 px-4 bg-green-400 font-semibold rounded-lg cursor-pointer border-2 border-green-700">
              Ok
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;