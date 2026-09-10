import { useState } from "react";

const NotesApp = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [task, setTask] = useState(()=>{
    const savedNotes = localStorage.getItem("Tasks");
    return savedNotes ? JSON.parse(savedNotes) : []; 
  });

  // useState for form submission
  const submitHandler = () => {
    if(title.trim() ==="" && details.trim() === ""){
      alert('Please fill task details');
      return;
    }
    const copyTask = [...task];
    copyTask.push({title,details});
    setTask(copyTask);
    localStorage.setItem('Tasks',JSON.stringify(copyTask));
    // console.log(task);
    setTitle('');
    setDetails('');
  };

  // useState for deleting note
  const deleteNote = (idx)=>{
    const prevTasks = [...task];
    prevTasks.splice(idx,1);
    setTask(prevTasks);
    localStorage.setItem('Tasks',JSON.stringify(prevTasks));
  }

  return (
    <div className="h-screen lg:flex bg-black text-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
        className="flex items-start flex-col lg:w-1/2 gap-4 p-10"
      >
        <h1 className="text-4xl font-bold">Add Notes</h1>

        {/* PEHLA INPUT FOR HEADING */}
        <input
          className="border-2 rounded font-medium w-full px-5 py-2 outline-none"
          type="text"
          placeholder="Enter you task heading"
          value={title}
          onChange={(e)=>{
           setTitle(e.target.value);
          }}
        />

        {/* DUSRA INPUT FOR DESCRIPTION OF NOTE */}
        <textarea
          className="border-2 rounded font-medium h-32 w-full px-5 py-2 outline-none"
          type="text"
          placeholder="Enter you task details"
          value={details}
          onChange={(e)=>{
            setDetails(e.target.value);
          }}
        ></textarea>

        {/* ADD BUTTON */}
        <button className="bg-white text-black active:scale-95 border-2 rounded font-medium w-full px-5 py-2 cursor-pointer outline-none">
          Add
        </button>
      </form>

        {/* CARDS CONTAINER */}
      <div className="lg:w-1/2 lg:border-l-2 p-10">
        <h1 className="text-4xl font-bold text-center">Recent Notes</h1>
        <div
          id="notesContainer"
          className="flex flex-wrap items-start justify-start gap-5 mt-5 lg:h-[90%] overflow-auto"
        >
          {task.map((elem,idx)=>{
            return (
              <div key={idx} className="flex flex-col justify-between items-start px-6 pt-10 pb-5 h-65 w-40 bg-cover bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHOI0reQLJbYio3nDn-3Do7tojc55WBcflQZPNwCsBcg&s=10')] text-black rounded-xl">
                <div>
                <h3 className='font-bold text-lg leading-tight'>{elem.title}</h3>
                <p className="text-gray-500 text-xs mt-2 font-semibold leading-tight">{elem.details}</p>
                </div>
                <button onClick={()=>{
                  deleteNote(idx);
                }} className="bg-red-600 rounded font-bold text-xs py-1 w-full text-white active:scale-95 cursor-pointer mt-3">Delete</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
