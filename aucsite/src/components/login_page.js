import React,{usestate} from 'react';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSignup = () => {
      if (password !== confirmPassword) {
        setError("Passwords don't match");
      } else {
        setError('');
        alert('Signup successful!');
      }
    };
  
    return (
      <div>
        <h2>Sign Up</h2>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        <button onClick={handleSignup}>Sign Up</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    );
  };

const LoginPage=()=>
{
    const[setUserName,username]=usestate('');
    const[setPassword,password]=usestate('');
    const[setError,error]=usestate('');


const handlelogin=()=>
{
    if(username ==='admin' && password === 'password')
    {
         setError('');
         alert('login succesful');
    }

    else
    {
        setError('Invalid username or password');
    }
}

return(
   <div>
    <div>
        <h1>Login page</h1>
    </div>
    <div class='user_name'>
        <label>USERNAME</label>
        <input 
        type='text'
        value={username}
        onChange={(e)=>setUserName(e.target.value)}/>
    </div>
    <div class='pass_word'>
        <label>PASSWORD</label>
        <input 
        type='text'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
    </div>
    <button onClick={(handlelogin)}LOGIN></button>
    {error && <div style={{ color: 'red' }}>{error}</div>}
   </div>
);
};

const Logger = () => {
    return (
      <div>
        <LoginPage />
        <hr />
        <SignupPage />
      </div>
    );
  };
  
  export default Logger;