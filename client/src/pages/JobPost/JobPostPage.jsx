import React from 'react'
import jobImage from '../../assets/job.png'
import JobPostComponent from '../../components/JobPost/JobPostComponent'

export default function JobPostPage() {
  return (
    <div style={{display:"flex"}}>
        <JobPostComponent/>

        <img 
        src= {jobImage}
        style={{maxHeight: "100vh", width: "50vw"}}
        alt= "JobPost Image"
        />
    </div>
  )
}
