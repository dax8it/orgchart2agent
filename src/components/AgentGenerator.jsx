import  { useState, useEffect  } from 'react';
     import  { createClient  } from '@supabase/supabase-js';

     const supabase = createClient(
       import. meta.env.VITE_ SUPABASE_URL,
       import. meta.env.VITE_ SUPABASE_ANON_KEY
      );

     function AgentGenerator() {
       const [agents, setAgents] = useState([]);
       const [orgData, setOrgData] = useState([]);

       useEffect(() => {
         fetchOrgData();
        }, []);

       async function fetchOrgData() {
         const { data: persons, error } = await supabase
            .from('persons')
            .select('*');

         if (!error) {
           setOrgData(persons);
          }
        }

       async function generateAgents() {
         // Transform org data to agents
         const newAgents = orgData.map(person => ({
           agent_name: person.title,
           role: person.position,
           goal: `Execute ${person.job_function}`,
           backstory: person.background || 'No background provided'
         }));

         setAgents(newAgents);
        }

       return (
         <div className="bg-white p-6 rounded-lg shadow">
           <h2>Agent Generation</h2>
           
           <button onClick={generateAgents} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
             Generate Agents
           </button>

           {agents.length > 0 && (
             <div className="mt-4">
               <h3>Generated Agents</h3>
               <ul className="list-disc pl-4">
                 {agents.map(agent => (
                   <li key={agent.agent_name}>
                     <strong>{agent.role}</strong>: {agent.goal}
                   </li>
                 ))}
               </ul>
             </div>
           )}
         </div>
       );
     }

     export default AgentGenerator;
