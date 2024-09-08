import React, { useState, useEffect } from "react";
import TaskColumn from "../components/Task";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    status: "",
    priority: "",
  });

  const [error, setError] = useState({
    title: "",
    description: "",
    date: "",
    status: "",
    priority: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("https://kanbar-board-api.vercel.app/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data)
        // console.log(data)
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const handleCreateTask = () => {
      let titleError="";
      let descriptionError="";
      let dateError="";
      let statusError="";
      let priorityError="";
      if(newTask.title.trim()===''){
        titleError="Please enter title name";
      }

      if(newTask.description.trim()===''){
        descriptionError="Please enter something on description";
      }

      if(newTask.date.trim()===''){
        dateError="Please select the date";
      }
      
      if(newTask.status===''){
        statusError="Please select task status";
      }
      if(newTask.priority===''){
        priorityError="Please select task priority";
      }
      setError({...error,title:titleError,description:descriptionError,date:dateError,status:statusError,priority:priorityError});
      
      
      if(titleError===''&&descriptionError===''&&dateError===''&&statusError===''&&priorityError===''){
        fetch("https://kanbar-board-api.vercel.app/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        })
          .then((response) => response.json())
          .then(() => {
            fetchTasks();
            setShowModal(false);
            setNewTask({
              title: "",
              description: "",
              date: "",
              status: "",
              priority: "",
            });
          })
          .catch((error) => console.error("Error creating task:", error));
      }
      

    
  };

  const handleStatusChange = (id, status) => {
    fetch(`${"https://kanbar-board-api.vercel.app/tasks"}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({status }),
    })
      .then(() => fetchTasks())
      .catch((error) => console.error("Error updating task status:", error));
  };

  const handleDeleteTask = (id) => {
    fetch(`${"https://kanbar-board-api.vercel.app/tasks"}/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchTasks())
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <div className="container mt-4  ">
      <div className="card card-body mb-4 shadow-sm w-75 mx-auto">
        <div className="d-flex justify-content-between align-items-center">
          <div className="card-title fs-3 fw-bold">Desktop & Mobile Application</div>
          <button
            className="btn"
            style={{ background: "#8A30E5", color: "white", width: "10rem" }}
            onClick={() => setShowModal(true)}
          >
            Create Task
          </button>
        </div>
      </div>

      {/* Task Columns */}
      <div className="row">
        <div className=" col-xs-4 col-md-4">
          <TaskColumn
            title="TODO"
            tasks={tasks.filter((task) => task.status === "TODO")}
            onStatusChange={handleStatusChange}
            onDeleteTask={handleDeleteTask}
          />
        </div>
        <div className="col-xs-4 col-md-4">
          <TaskColumn
            title="IN PROGRESS"
            tasks={tasks.filter((task) => task.status === "IN_PROGRESS")}
            onStatusChange={handleStatusChange}
            onDeleteTask={handleDeleteTask}
          />
        </div>
        <div className=" col-xs-4 col-md-4">
          <TaskColumn
            title="COMPLETED"
            tasks={tasks.filter((task) => task.status === "COMPLETED")}
            onStatusChange={handleStatusChange}
            onDeleteTask={handleDeleteTask}
          />
        </div>

        
        
      </div>

      
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {setShowModal(false)
                    setError({...error,title:'',description:'',date:'',status:'',priority:''});
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className={`form-control ${error.title ? 'border-danger' : ''}`}
                      
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                    />
                    <p className="text-danger ms-2 mt-1">{error.title}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description <span className="text-danger">*</span></label>
                    <textarea
                     className={`form-control ${error.description ? 'border-danger' : ''}`}
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                    />
                    <p className="text-danger">{error.description}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Select Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className={`form-control ${error.description ? 'border-danger' : ''}`}
                      value={newTask.date}
                      onChange={(e) =>
                        setNewTask({ ...newTask, date: e.target.value })
                      }
                    />
                    <p className="text-danger">{error.date}</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status <span className="text-danger">*</span></label>
                    <select
                      className={`form-select ${error.description ? 'border-danger' : ''}`}
                      value={newTask.status}
                      onChange={(e) =>
                        setNewTask({ ...newTask, status: e.target.value })
                      }
                    >
                      <option value="" disabled selected>
                        Select here
                      </option>
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                    <p className="text-danger">{error.status}</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Priority <span className="text-danger">*</span></label>
                    <select
                      className={`form-select ${error.description ? 'border-danger' : ''}`}
                      value={newTask.priority}
                      onChange={(e) =>
                        setNewTask({ ...newTask, priority: e.target.value })
                      }
                    >
                      <option value="" disabled selected>
                        Select here
                      </option>
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </select>
                    <p className="text-danger">{error.priority}</p>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {setShowModal(false)
                    setError({...error,title:'',description:'',date:'',status:'',priority:''});
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateTask}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
