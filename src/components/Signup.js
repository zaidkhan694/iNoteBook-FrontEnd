import React , {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
  const onChange = (e) => {
    setcredentials({...credentials,[e.target.name]: e.target.value}) 
  };
  let history = useHistory();

  const handleSubmit = async (e)=>
{
   e.preventDefault();
   console.log("Sign up") 
   const response = await fetch("http://localhost:5000/api/auth/createuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
  });
  const note = await response.json();
  console.log(note);
if(note.success)
{
  localStorage.setItem('token',note.authtoken);
  props.showAlert("User created successfully","success");
  history.push("/");
}
else
{
  props.showAlert("Invalid details","danger");
}
}
  return (
      <>
      <form onSubmit={handleSubmit}>
      <h4 >Create an account to use iNoteBook</h4>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" minLength={5} required onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" minLength={5} required onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </>
  )
}

export default Signup