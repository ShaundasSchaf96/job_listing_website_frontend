import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, {jobLoader} from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"

const App = () => {

  const addJob = async (newJOb) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(newJOb),
    });
    return;
  };

  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE"
    });
  }


const updateJob = async (job) => {
  const res = await fetch(`/api/jobs/${job.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  })
}
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />}/>
        <Route path="/jobs" element={<JobsPage />}/>
        <Route path="*" element={<NotFoundPage />}/>
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader}/>
        <Route path="/add-job" element={<AddJobPage addJobSumit={addJob} />}/>
        <Route path="/edit-job/:id" element={<EditJobPage updateJobSumit={updateJob}/>} loader={jobLoader}/>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
