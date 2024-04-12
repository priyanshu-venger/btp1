import React,{useState} from "react"
import axios from "axios";
import { NavLink,useLocation,useNavigate } from "react-router-dom";
import './login.css';
import { useEffect } from "react";
import './btp_list.css'
import { BsSearch } from 'react-icons/bs';
function Btplist(props){
    const [list, setlist] = useState([]);
    let [show,setshow]=useState([]);
    const navigate=useNavigate();
    let [type,settype]=useState("");
    let [searchVal, setSearchVal] = useState("");
    // useEffect(()=>{
    //     if(localStorage.getItem("id")===null) navigate('/login',{state:true});
    // },[localStorage.getItem["id"]]);
    useEffect(() => {
        const fetchlist = async () => {
                const response = await axios.post('http://127.0.0.1:5000/btp_list/',{id:localStorage.getItem["id"],role:localStorage.getItem["role"]})
                    .then((response) => {
                        console.log(response);
                        setlist(response.data);
                        setshow(list);
                        settype('Department');
                        }
                    );
            
        };
        fetchlist();

    }, []);
    useEffect(() => {
        handleSearchClick();
    }, [searchVal, type,list]);

    const sendreq = async(project,index) => {
        // const response= await axios.post('https://127.0.0.1:5000/apply_for_btp/',{btp_id:project.btp_id,id:localStorage.getItem['id']})
        // .then((response)=>{
        //     // project.status=response.data.status;
        // })
        const updatedProjects = [...list];
        updatedProjects[index] = { ...project, status: "Pending"};
        setlist(updatedProjects);
    }
    const handleSearchClick=()=>{
        if (searchVal === "") { setshow(list); return; }
        const filterBySearch = list.filter((item) => {
            if(type==='Department'){
                if (item.department.toLowerCase()
                    .includes(searchVal.toLowerCase())) { return item; }
            }
            else if(type==='Professor'){
                if (item.prof_name.toLowerCase()
                    .includes(searchVal.toLowerCase())) { return item; }
            }
            else{
                if (item.btp_name.toLowerCase()
                    .includes(searchVal.toLowerCase())) { return item; }
            }
        })
        setshow(filterBySearch);
        return;
    }
    return (
        <>
            
            <div class="container">
            <h1>BTP Projects List</h1>
            <div onChange={e=>settype(e.target.name)} style={{ padding: 50 }}>
                <input type="radio" value="Search by department" name="Department" checked={type==='Department'}/> Search by department
                <input type="radio" value="Search by project" name="Project" checked={type==='Project'}/> Search by project
                <input type="radio" value="Search by professor" name="Professor" checked={type==='Professor'}/> Search by professor
            </div>
            <div>
                <input onChange={e => setSearchVal(e.target.value)}>
                </input>
                <BsSearch onClick={handleSearchClick} />
            </div>
                <table>
                    <tr>
                        <th>Index</th>
                        <th>Project ID</th>
                        <th>Name</th>
                        <th>Professor</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Download</th>
                        <th>Status</th>
                    </tr>
                        {show.map((project, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{project.btp_id}</td>
                                <td>{project.btp_name}</td>
                                <td>{project.prof_name}</td>
                                <td>{project.prof_email}</td>
                                <td>{project.department}</td>
                                <td>
                                {/* <a href={url_for('file', file_id=project.project_file_id) } class="download-link" target="_blank">Download</a> */}
                                </td>
                                <td> <input type='button' className='btn btn-primary flex-row-reverse' value={project.status} disabled={project.status!=="Apply" && localStorage.getItem['role']!=="student"?true:false} onClick={()=>sendreq(project,index)}/></td>
                            </tr>

                                ))}
                                                
                </table>
            </div>
                                    
        </>

    );
}
export default Btplist;