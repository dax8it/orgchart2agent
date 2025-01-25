import  { useState, useEffect    } from   'react'; 
     import  { createClient    } from   '@supabase/supabase- js'; 
     import * as d3 from 'd3'; 

     const supabase   = createClient( 
       import. meta. env. VITE_ SUPABASE_ URL, 
       import. meta. env. VITE_ SUPABASE_ ANON_ KEY 
        ); 

     function OrgChartEditor()   { 
       const  [orgData, setOrgData]   = useState([]); 
       const  [editingPerson, setEditingPerson]   = useState( null ); 
       const  [newPerson, setNewPerson]   = useState({}); 
       const  [svgRef, setSvgRef]   = useState(null); 

       useEffect(()   =>   { 
         fetchOrgData(); 
          },  []); 

       useEffect(()   =>   { 
         if (orgData.length > 0 && svgRef) { 
           renderChart(orgData); 
          } 
          }, [orgData, svgRef]); 

       async function fetchOrgData()   { 
         const  { data: persons, error  }   = await supabase 
              .from('persons') 
              .select('*'); 

         if  (!error)   { 
           setOrgData(persons); 
            } 
          } 

       async function savePerson( person )   { 
         if (person.id) { 
            // Update existing person 
           const  { data, error  }  = await supabase 
                .from('persons') 
                .update(person) 
                .eq('id', person.id); 
          } else { 
            // Create new person 
           const  { data, error  }  = await supabase 
                .from('persons') 
                .insert([person]); 

           if  (!error && data.length > 0 )  { 
             setNewPerson({}); 
             fetchOrgData(); 
            } 
          } 
        } 

       function renderChart( data )   { 
         const svg = d3.select(svgRef); 
         const width = 800; 
         const height = 600; 

         // Clear existing elements 
         svg.selectAll('*').remove(); 

         // Create a new force simulation 
         const simulation = d3.forceSimulation() 
             .force('charge', d3.forceManyBody().strength(-1000)) 
             .force('center', d3.forceCenter(width / 2, height / 2)); 

         // Add nodes 
         const nodes = svg.append('g') 
             .selectAll('circle') 
             .data(data) 
             .enter() 
             .append('circle') 
             .attr('r', 20) 
             .attr('fill', '#fff') 
             .attr('stroke', '#999') 
             .attr('stroke-width', 2); 

         // Add labels 
         const labels = svg.append('g') 
             .selectAll('text') 
             .data(data) 
             .enter() 
             .append('text') 
             .text(d => d.title) 
             .attr('dx', 0) 
             .attr('dy', '1em'); 

         // Add links for direct reports 
         const links = svg.append('g') 
             .selectAll('line') 
             .data(data.flatMap( person =>   ( 
               person.direct_reports || [] 
             ).map(reportId => ({ source: person, target: reportId })) )) 
             .enter() 
             .append('line') 
             .attr('stroke', '#999'); 

         // Run simulation 
         simulation.nodes(data).on('tick', () =>   { 
           nodes 
            .attr('cx', d => d.x) 
            .attr('cy', d => d.y); 

           labels 
            .attr('x', d => d.x) 
            .attr('y', d => d.y + 20); 

           links 
            .attr('x1', d => d.source.x) 
            .attr('y1', d => d.source.y) 
            .attr('x2', d => d.target.x) 
            .attr('y2', d => d.target.y); 
          }); 
        } 

       return   ( 
           <div className="bg- white p-6 rounded- lg shadow"> 
             <h2>Organization Structure</h2> 

             <form onSubmit={(e)  =>  { 
             e. preventDefault(); 
             savePerson( newPerson ); 
              }}> 
               <input 
                type="text" 
                placeholder="Title" 
                value={newPerson.title || ''} 
                onChange={(e)  => setNewPerson({...newPerson, title: e.target.value})} 
               /> 
               <br/> 
               <input 
                type="text" 
                placeholder="Position" 
                value={newPerson.position || ''} 
                onChange={(e)  => setNewPerson({...newPerson, position: e.target.value})} 
               /> 
               <br/> 
               <button type="submit">Add New Person</button> 
             </form> 

             { editingPerson   &&   ( 
               <div className="mt-4"> 
                 <h3>Edit Person</h3> 
                 <form onSubmit={(e)  =>  { 
                  e. preventDefault(); 
                  savePerson({...editingPerson, ...newPerson}); 
                   }}> 
                   <input 
                    type="text" 
                    placeholder="Title" 
                    value={editingPerson.title} 
                    onChange={(e)  => setNewPerson({...newPerson, title: e.target.value})} 
                   /> 
                   <br/> 
                   <input 
                    type="text" 
                    placeholder="Position" 
                    value={editingPerson.position} 
                    onChange={(e)  => setNewPerson({...newPerson, position: e.target.value})} 
                   /> 
                   <br/> 
                   <button type="submit">Save</button> 
                   <button onClick={()   =>  { 
                   setEditingPerson( null ); 
                   setNewPerson({}); 
                    }}>Cancel</button> 
                 </form> 
               </div> 
             )} 

             <svg ref={setSvgRef} width="800" height="600"></svg> 
           </div> 
         ); 
       } 

     export default OrgChartEditor;
