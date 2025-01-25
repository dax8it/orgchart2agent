import { useState, useEffect } from 'react';
    import { createClient } from '@supabase/supabase-js';
    
    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );

    function App() {
      const [orgs, setOrgs] = useState([]);
      const [selectedOrg, setSelectedOrg] = useState(null);

      useEffect(() => {
        fetchOrgs();
      }, []);

      async function fetchOrgs() {
        const { data, error } = await supabase
          .from('organizations')
          .select('*');
        
        if (!error) {
          setOrgs(data);
        }
      }

      return (
        <div className="container mx-auto p-4">
          <h1>Org2Agent</h1>
          
          {!selectedOrg && (
            <div>
              <h2>Select or Create Organization</h2>
              <ul>
                {orgs.map(org => (
                  <li key={org.id} 
                      onClick={() => setSelectedOrg(org)}>
                    {org.org_name}
                  </li>
                ))}
              </ul>
              <button onClick={() => console.log('Create new org')}>
                Create New Organization
              </button>
            </div>
          )}

          {selectedOrg && (
            <div>
              <h2>Organization: {selectedOrg.org_name}</h2>
              <OrgChartEditor />
              <AgentGenerator />
              <TaskManager />
              <ExportPage />
            </div>
          )}
        </div>
      );
    }

    export default App;
