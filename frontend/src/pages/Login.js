import { useState } from "react"
import { useLogin } from '../hooks/useLogin'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPasssword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return(
        <form className="login" onSubmit={handleSubmit}>
            <h3 style={{color:'#C21E56', textAlign:'center', fontSize:'25px'}}>Log in</h3>
            
            <label>Email</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password</label>
            <input 
                type="password"
                onChange={(e) => setPasssword(e.target.value)}
                value={password}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button disabled={isLoading}>Log in</button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login