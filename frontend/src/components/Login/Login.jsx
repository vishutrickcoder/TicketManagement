import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

var url = 'http://localhost:4000'
const Login = () => {
    const navigate = useNavigate()
    const [currentState, setCurrentState] = useState("Login")
    const [data , setData] = useState({
        name:"",
         username: "",
        email:"",
        password: "",
        isAdmin: false
      })


      const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setData(data=>({...data , [name]:value}))
      }

      const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url 
  
        if(currentState === "Login"){
          newUrl += '/api/user/login'
        }else{
          newUrl += '/api/user/register'
        }
  
        const response = await axios.post(newUrl , data)
        if (response.status === 200) {
            if (currentState === "Login") {
              localStorage.setItem("token", response.data.token);
              const userResponse = await axios.get('http://localhost:4000/api/user/me', {
                headers: { Authorization: `Bearer ${response.data.token}` }
              });
              if (userResponse.data.isAdmin) {
                navigate('/admin-dashboard');
              } else {
                navigate('/user-dashboard');
              }
    
            } 
            
    
        
          }
    
        setCurrentState('Login')
        setData({
          name: "",
          username: "",
          email: "",
          password: "",
          isAdmin: false
        });
      }
  
    return (
        <div className='container'>
 <div className="wrapper">
            <h2 className='login-h2'>{currentState}</h2>
            <form  onSubmit={onLogin}>

                {currentState === "Login" ? <></> :<>
                  <div className="input-box">
                    <input type="text" value={data.name} name='name' onChange={onChangeHandler} placeholder="Enter your name" required />
                </div>
                <div className="input-box">
                <input type="text" value={data.username} name='username' onChange={onChangeHandler} placeholder="Username" required />
            </div>
                </> 
                }

        


                <div className="input-box">
                    <input type="text" name='email' value={data.email} onChange={onChangeHandler} placeholder="Enter your email" required />
                </div>
                <div className="input-box">
                    <input type="password" name='password' value={data.password} onChange={onChangeHandler} placeholder="Enter password" required />
                </div>
                <div className="policy">
                    <input type="checkbox" />
                    <h3>I accept all terms & condition</h3>
                </div>

                {currentState === "Sign Up" ? <div className="input-box button">
                    <input type="Submit" value="Register Now" />
                </div> : <div className="input-box button">
                    <input type="Submit" value="Login Now" />
                </div>}




                <div className="text">
                    {/* <h3>Already have an account? <a href="#">Login now</a></h3> */}
                    {currentState === "Login" ?
                        <h3>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></h3> :
                        <h3>Already Have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></h3>
                    }
                </div>
            </form>
        </div>

        </div>
           )
}

export default Login
