import React,{useState} from "react";
import { useForm } from "react-hook-form";
import Creatable from 'react-select/creatable';

function PostJob() {
  
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    data.skills=selectedOption;
    console.log(data);
    fetch("http://localhost:3000/post-job",{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify(data
        
        )
    })
    .then(res=>res.json())
    .then((result)=>{
      console.log(result)
      if(result.acknowledged === true){
        alert("Job Posted Succesfully.")
      }
      reset()
    })
  }

  // Creatable option
  const options=[
    {value:"JavaScript",label:"JavaScript"},
    {value:"MongoDB",label:"MongoDB"},
    {value:"ReactJs", label:"ReactJs"},
    {value:"ExpressJs", label:"ExpressJs"},
    {value:"Postman", label:"Postman" },
    {value:"Docker",label:"Docker"},
    {value:"Python",label:"Python"},
    {value:"Java",label:"Java"},
    {value:"Redux",label:"Redux"},
    {value:"NodeJs", label:"NodeJs"},
    {value:"Mysql", label:"Mysql"},
    {value:"git", label:"git"},
  ]

  return (
    
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        {/* form */}
        <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16 ">
  
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
  
            {/*1st Row  */}
  
            <div className="create-job-flex ">
              <div className="lg:w-1/2 w-full">
  
                <label className="block mb-2 text-lg">Job Title</label>
                <input type="text" defaultValue={"Web Developer"} {...register("jobTitle")} className="create-job-input" />
              </div>
  
              <div className="lg:w-1/2 w-full">
  
                <label className="block mb-2 text-lg">Company Name</label>
                <input type="text" placeholder="Ex: Google" {...register("companyName")} className="create-job-input" />
              </div>
  
  
  
            </div>
  
            {/* 2nd Row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
  
                <label className="block mb-2 text-lg">Minimum Salary</label>
                <input type="text" placeholder="Ex: $20K" {...register("minPrice")} className="create-job-input" />
              </div>
  
              <div className="lg:w-1/2 w-full">
  
                <label className="block mb-2 text-lg">Maximum Salary</label>
                <input type="text" placeholder="Ex: $100K" {...register("maxPrice")} className="create-job-input" />
              </div>
  
  
  
            </div>
  
            {/* 3rd Row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
  
                <label className="block mb-2 text-lg">Salary Type</label>
                <select {...register("salaryType")} className="create-job-input">
                  <option value="">Choose Your Salary</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
  
              <div className="lg:w-1/2 w-full">
  
                <label className="block mb-2 text-lg">Job Location</label>
                <input type="text" placeholder="Ex : Bengaluru ,IN" {...register("jobLocation")} className="create-job-input" />
              </div>
  
  
  
            </div>
  
  
            {/* 4th Row */}
  
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
  
                <label className="block mb-2 text-lg">Job Posting Date</label>
                <input type="date" placeholder="Ex : 02-01-2024" 
                {...register("postingDate")} 
                className="create-job-input" />
              </div>
  
              <div className="lg:w-1/2 w-full">
  
                <label className="block mb-2 text-lg">Experience Level</label>
                <select {...register("experienceLevel")} className="create-job-input">
                  <option value="">Choose experience</option>
                  <option value="Any experience">Any experience</option>
                  <option value="Internship">Internship</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Work remotely">Work remotely</option>
                </select>
              </div>
            </div>
  
            {/* 5th Row */}
            <div>
              <label className="block mb-2 text-lg">Required Skill Sets:</label>
             <Creatable
             defaultValue={selectedOption}
             onChange={setSelectedOption}
             options={options}
             isMulti
             className="create-job-input py-4"/>
            </div>
  
            {/* 6th row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
  
                <label className="block mb-2 text-lg">Company Logo</label>
                <input type="url" placeholder="Paste Your Company Logo url:" 
                {...register("companyLogo")} 
                className="create-job-input" />
              </div>
  
              <div className="lg:w-1/2 w-full">
  
                <label className="block mb-2 text-lg">Employment Type</label>
                <select {...register("employmentType")} className="create-job-input">
                  <option value="">Choose Employment Type</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Full-time">Full-time</option>
                </select>
              </div>
            </div>
  
            {/* 7th Row */}
            <div className="w-full ">
              <label className="block mb-2 text-lg">Job Description</label>
              <textarea {...register("description")} className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              rows={6}
              defaultValue={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum mollitia delectus ducimus quaerat natus sunt eum accusamus, sed veniam reprehenderit! Rerum rem facilis maiores nobis quisquam dolor quibusdam nemo distinctio."}
              placeholder="Job Description"></textarea>
            </div>
  
            {/* Last row */}
            <div className="w-full">
              <label className="block mb-2 text-lg">Job Posted By :</label>
              <input type="email" 
              placeholder="Company Email"
              {...register("postedBy")}
              className="create-job-input"/>
            </div>
  
            <input type="submit" className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm 
            cursor-pointer" />
          </form>
  
        </div>
      </div>
     
   
  )
}
export default PostJob