import  { useState, useEffect    } from   'react'; 
     import  { createClient     } from    '@supabase/ supabase- js'; 
     import YAML from  'yaml'; 

     const supabase    = createClient( 
       import. meta. env. VITE_ SUPABASE_ URL, 
       import. meta. env. VITE_ SUPABASE_ ANON_ KEY 
         ); 

     function ExportPage()    { 
       const  [agents, setAgents]    = useState([]); 
       const  [tasks, setTasks]    = useState([]); 
       const  [exportError, setExportError]    = useState(null); 

       useEffect(()    =>    { 
         fetchAgents(); 
         fetchTasks(); 
           },   []); 

       async function fetchAgents()    { 
         const  { data: persons, error   }    = await supabase 
               .from('persons') 
               .select('*'); 

         if  (!error)    { 
           const agentData    = persons. map( person  =>    ({ 
             name: person. title, 
             role: person. position, 
             goal: `Execute ${person. job_ function}` || 'No goal provided', 
             backstory: person. background  || 'No background provided' 
            })); 
           setAgents(agentData); 
             } 
           } 

       async function fetchTasks()    { 
         const  { data, error   }    = await supabase 
               .from('tasks') 
               .select('*'); 

         if  (!error)    { 
           setTasks(data); 
             } 
           } 

       function generateYAML()    { 
         try  { 
           const agentDoc    = agents. map( agent  =>    ({ 
             name: agent. name, 
             role: agent. role, 
             goal: agent. goal, 
             backstory: agent. backstory 
            })); 

           const taskDoc    = tasks. map( task  =>    ({ 
             name: task. task_ name, 
             description: task. task_ description, 
             expected_ output: task. expected_ output  || null, 
             linked_agent: task. agent_ id  ? agents.find(a  => a.name === task.agent_id)?.name : null 
            })); 

           return    { 
             agents: agentDoc, 
             tasks: taskDoc 
            }; 
         } catch (error)   { 
           setExportError('Error generating YAML files. Please check your data and try again.'); 
           throw error; 
         } 
       } 

       function downloadYAML()    { 
         const yamlContent    = YAML.stringify(generateYAML(),  { indent: 2 }); 
         const blob    = new Blob([yamlContent],  { type: 'text/ yaml' }); 
         const url    = URL. createObjectURL(blob); 

         // Create a temporary link to trigger download 
         const a    = document. createElement('a'); 
         a. href    = url; 
         a. download    = 'agents_tasks.yaml'; 
         document. body. appendChild(a); 
         a. click(); 
         document. body. removeChild(a); 

         // Clear any previous errors 
         setExportError(null); 
       } 

       return    ( 
            <div className="bg- white p-6 rounded- lg shadow"> 
              <h2>Export Agents</h2> 

              {exportError  &&   <p className="text- red-500 mb-4">{exportError}</p>} 

              <button onClick={downloadYAML} className="px-4 py-2 bg- green-500 text- white rounded"> 
               Download YAML Files 
              </button> 

              <div className="mt-4"> 
                <h3>Preview</h3> 
                <pre>{YAML.stringify(generateYAML(),  { indent: 2 })}</pre> 
              </div> 
            </div> 
          ); 
        } 

     export default ExportPage;
