import React ,{useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"",password:""})
    const onChange = (e) => {
        setcredentials({...credentials,[e.target.name]: e.target.value}) 
      };
      let history = useHistory();
    const handleSubmit = async (e)=>
{
   e.preventDefault();
   console.log("Login") 
   const response = await fetch("http://localhost:5000/api/auth/loginuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email:credentials.email,password:credentials.password}),
  });
  const note = await response.json();
  console.log(note);
  
if(note.success)
{
  localStorage.setItem('token',note.authtoken);
  props.showAlert("Logged in successfully","success");
  history.push("/");
}
else
{
  props.showAlert("Invalid Credentials","danger");
}
}
  return (
    <>
     <form onSubmit={handleSubmit} className="my-3" >
      <h4 >Login to continue to iNoteBook</h4>
  <div className="mb-3 my-3">
    <label htmlFor="email" className="form-label">Email Address</label>
    <input type="email" className="form-control" id="email"  name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
  </div>
  <div className="mb-3 my-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </>
  )
}

export default Login