import { useState } from "react"
import { useSignup } from "../hooks/useSignup"


const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPasssword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3 style={{color:'#C21E56', textAlign:'center', fontSize:'25px'}}>Sign up</h3>
            
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
            <button disabled={isLoading}>Sign up</button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup