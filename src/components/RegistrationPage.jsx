import  { useState, useEffect   } from  'react'; 
     import  { createClient   } from  '@supabase/ supabase- js'; 

     const supabase  = createClient( 
       import. meta. env. VITE_ SUPABASE_ URL, 
       import. meta. env. VITE_ SUPABASE_ ANON_ KEY 
       ); 

     function RegistrationPage()  { 
       const  [email, setEmail]  = useState(''); 
       const  [password, setPassword]  = useState(''); 
       const  [error, setError]  = useState(null); 

       async function handleSubmit(e)  { 
         e. preventDefault(); 
         const { data, error }  = await supabase.auth.signUp({ 
           email: email, 
           password: password 
         }); 

         if (error) { 
           setError(error.message); 
         } else { 
           // Redirect to login page 
           window.location.href = '/login'; 
         } 
       } 

       return  ( 
          <div className="bg- white p-6 rounded- lg shadow"> 
            <h2>Register</h2> 
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
              <button type="submit">Register</button> 
            </form> 
          </div> 
        ); 
      } 

     export default RegistrationPage;
