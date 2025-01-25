import  { useState, useEffect  } from  'react'; 
     import  { createClient   } from  '@supabase/ supabase- js'; 

     const supabase  = createClient( 
       import. meta. env. VITE_ SUPABASE_ URL, 
       import. meta. env. VITE_ SUPABASE_ ANON_ KEY 
       ); 

     function LoginPage()  { 
       const  [email, setEmail]  = useState(''); 
       const  [password, setPassword]  = useState(''); 
       const  [error, setError]  = useState(null); 

       async function handleSubmit(e)  { 
         e. preventDefault(); 
         const { data, error }  = await supabase.auth.signInWithPassword({ 
           email: email, 
           password: password 
         }); 

         if (error) { 
           setError(error.message); 
         } else { 
           // Redirect to dashboard or home page 
           window.location.href = '/'; 
         } 
       } 

       return  ( 
          <div className="bg- white p-6 rounded- lg shadow"> 
            <h2>Login</h2> 
            {error && <p className="text-red-500">{error}</p>} 
            <form onSubmit={handleSubmit}> 
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              /> 
              <br/> 
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              /> 
              <br/> 
              <button type="submit">Login</button> 
            </form> 
          </div> 
        ); 
      } 

     export default LoginPage;
