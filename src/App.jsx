import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function InputComponent({title, info, setInfo,  inputKey, type}) {
  
  return (
    <div className='inputComponent'>
    <label>
        {title} 
    </label>
        <input type={type} value={info[inputKey]} onChange={e => setInfo({...info, [inputKey]: e.target.value})}/>
    </div>
  )
}
function GeneralInfo({info, setInfo}) {
  
  
  return (
    <>
   
   <div className='generalInfo card'>
    <h3>General Information</h3>
    
      <InputComponent type="text" title="First Name" info={info} setInfo={setInfo} inputKey="firstName"></InputComponent>

      <InputComponent type="text" title="Last Name" info={info} setInfo={setInfo} inputKey="lastName"></InputComponent>
   
    
  
      <InputComponent type="email" title="Email" info={info} setInfo={setInfo} inputKey="email"></InputComponent>
      <InputComponent type="tel" title="Phone Number" info={info} setInfo={setInfo} inputKey="phone"></InputComponent>
    
   </div>
    </>
  )
}
function EducationBlock({ education, setEducation, onRemove, index }) {
  return (
    <div className='educationCard card'>
      <div className="flex-between">
        <h3>Education #{index + 1}</h3>
        <button type="button" onClick={onRemove}>Remove</button>
      </div>

      <InputComponent type="text"  title="School"     info={education} setInfo={setEducation} inputKey="schoolName" />
      <InputComponent type="text"  title="Degree"     info={education} setInfo={setEducation} inputKey="degree" />
      <InputComponent type="date"  title="Start Date" info={education} setInfo={setEducation} inputKey="startDate" />
      <InputComponent type="date"  title="End Date"   info={education} setInfo={setEducation} inputKey="endDate" />
    </div>
  )
}
function EducationList({ educations, setEducations }) {
  // helper: blank template
  const blankEdu = { schoolName: "", degree: "", startDate: "", endDate: "" }

  
  const setEducationAt = (i) => (newObj) => {
    setEducations(prev => prev.map((ed, idx) => (idx === i ? newObj : ed)))
  }

  const removeAt = (i) => {
    setEducations(prev => prev.filter((_, idx) => idx !== i))
  }

  const addEducation = () => {
    setEducations(prev => [...prev, { ...blankEdu }])
  }

  return (
    <div>
      <h2>Education</h2>

      {educations.map((ed, i) => (
        <EducationBlock
          key={i}
          index={i}
          education={ed}
          setEducation={setEducationAt(i)}
          onRemove={() => removeAt(i)}
        />
      ))}

      <button type="button" onClick={addEducation}>+ Add Education</button>
    </div>
  )
}

function Career({ career, setCareer, onRemove, index }) {
  return (
    <div className='careerCard card'>
      <div className="flex-between">
        <h3>Professional Experience #{index + 1}</h3>
        <button type="button" onClick={onRemove}>Remove</button>
      </div>
      <InputComponent title="Company Name"    info={career} setInfo={setCareer} inputKey="companyName"   type="text" />
      <InputComponent title="Job Title"       info={career} setInfo={setCareer} inputKey="jobTitle"     type="text" />
      <InputComponent title="Job Description" info={career} setInfo={setCareer} inputKey="jobDescription" type="text" />
      <InputComponent type="date" title="Start Date" info={career} setInfo={setCareer} inputKey="startDate" />
      <InputComponent type="date" title="End Date"   info={career} setInfo={setCareer} inputKey="endDate" />
    </div>
  )
}


function CareerList({careers, setCareers}) {
  const blankCareers = {
    companyName: "",
    jobTitle: "", 
    jobDescription: "",
    startDate: "",
    endDate: ""
  }

  const setNewCareerAt = (i) => (newObj) => {
    setCareers(prev => prev.map((ed, idx) => (idx === i ? newObj : ed)))
  }

   const removeAt = (i) => {
    setCareers(prev => prev.filter((_, idx) => idx !== i))
  }

  const addCareer = () => {
    setCareers(prev => [...prev, { ...blankCareers }])
  }

  return (
    <div>
    <h2>Professional Experience</h2>
    <div className='list'>
    {careers.map((career, i) => (
        <Career
          key={i}
          index={i}
          career={career}
          setCareer={setNewCareerAt(i)}
          onRemove={() => removeAt(i)}
        />
      ))}
    <button type="button" onClick={addCareer}>+ Add Career</button>

    </div>
    </div>
  )


}


function EducationProfBlock({name, underName, startDate, endDate}) {
  return (
    <div className='education-prof-block'>
    <div className='name'>{name}</div>
    <div className='underName'>
      <div>{underName}</div>
      <div>{startDate}-{endDate}</div>
    </div>
    </div>
  )
}

function ProfBlock({name, jobTitle, jobDescription, startDate, endDate}) {
  return (
    <div className='education-prof-block'>
    <div className='name'>{name}</div>
    <div className='underName'>
      <div>{jobTitle}</div>
      <div>{startDate}-{endDate}</div>
    </div>
    <div>
      {jobDescription}
    </div>
    </div>
  )

}


function App() {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  })
  const [educations, setEducations] = useState([{
    schoolName: "",
    degree: "",
    startDate: "",
    endDate: ""
  }])
  const [careers, setCareers] = useState( [{
    companyName: "",
    jobTitle: "", 
    jobDescription: "",
    startDate: "",
    endDate: ""
  }])

  return (
    <div className='wrapper'>
      <h4 className='title-logo'>
        CV builder on React <img src={reactLogo} alt='reactLogo' className='react logo'/>
      </h4>
      <div className='cards left-section'>
      
      <GeneralInfo info={info} setInfo={setInfo} />

      <EducationList educations={educations} setEducations={setEducations} />

      
      </div>
      <div className='pdf middle-section'>
      <div className='innerPDF'>
        <div>{info.firstName} {info.lastName}</div>
        <div>{info.email} | {info.phone}</div>
        <div className='educationSec'>
          <div className='introWorkExperience section-underline'>EDUCATION</div>
          {educations.map(education => (
              <EducationProfBlock
                key={`${education.schoolName}-${education.degree}-${education.startDate}`}
                name={education.schoolName}
                underName={education.degree}
                startDate={education.startDate}
                endDate={education.endDate}
              />
            ))}
        </div>
        <div className='workSec'>
            <div className='introWorkExperience section-underline'>WORK EXPERIENCE</div>
            {careers.map(career => (
              <ProfBlock
              key={`${career.companyName}-${career.jobTitle}-${career.startDate}`}
              name={career.companyName}
              jobTitle={career.jobTitle}
              jobDescription={career.jobDescription}
              startDate={career.startDate}
              endDate={career.endDate}
              />
            ))}

        </div>
        
      </div>
      </div>
      <div className='cards right-section'>
        <CareerList careers={careers} setCareers={setCareers} />
          
      </div>
    </div>
  )
}

export default App
