import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, serverURL } from "../main";
import toast from "react-hot-toast";
import TaskItem from "../components/TaskItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${serverURL}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${serverURL}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${serverURL}/task/new`,
        {
          title,
          desc,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);
      setLoading(false);
      setTitle("");
      setDesc("");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${serverURL}/task/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  });

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <>
      <div className="container">
        <div className="login">
          <section>
            <form onSubmit={submitHandler}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
                required
              />
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                placeholder="Description"
                required
              />
              <button type="submit" disabled={loading}>
                Add task
              </button>
            </form>
          </section>
          <section className="todosContainter">
            {tasks.map((task) => (
              <TaskItem
                title={task.title}
                desc={task.desc}
                isCompleted={task.isCompleted}
                updateBtn={updateHandler}
                deleteBtn={deleteHandler}
                id={task._id}
                key={task._id}
              />
            ))}
            {/* =>() directly returns */}
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
