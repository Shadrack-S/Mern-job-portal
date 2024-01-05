import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { FaSuitcase } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

function JobDetails() {
  const { id } = useParams();

  const jobid = id.toString()
  const fourNumb = jobid.substring(0, 6)
  const [job, setJob] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/all-jobs/${id}`)
      .then(res => res.json())
      .then(data => setJob(data))
  }, [])
  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL"
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  }
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Job Details"} path={"Job Details"} />

      <div className="flex flex-col gap-3 mt-5">
        <h3 className="font-semibold">Job ID: {fourNumb}</h3>
        <h2 className="font-bold text-xl text-blue">Job Details : {job.jobTitle}</h2>
        <p className="w-52"> <span className="text-xl font-semibold">Description:<br></br></span> {job.description}</p>
        <div className="flex flex-row gap-3 items-center">
          <FaSuitcase className="text-xl" />
          <h3 className="font-bold text-xl ">Job Type</h3>
        </div>
        <div className="flex gap-2 mt-4">
          <h2 className="bg-blue h-9  px-8 py-2 text-white ">{job.employmentType}</h2>
          <button onClick={handleApply} className="bg-[#7e22ce] h-9  px-8 py-2 text-white ">Apply Now</button>
        </div>

      </div>

      <div className="flex py-10">
        <div className="w-1/3 font-semibold">
          <h2>Benefits</h2>
        
        </div>
        <div className="w-1/3 font-semibold">
        <h2>Outline</h2>
        </div>
        <div className="w-1/3 font-semibold">
        <h2>Future Growth</h2>
        </div>
      </div>
    </div>
  )
}
export default JobDetails