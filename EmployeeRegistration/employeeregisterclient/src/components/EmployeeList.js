import React, { useState, useEffect} from 'react';
import Employee from './Employee';
import axios from 'axios';

export default function EmployeeList() {

    const [employeeList, setEmployeeList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    

    // By using this Hook, you tell React that your component needs to do something after render
    useEffect(() => { 
        refreshEmployeeList();
    }, [])

    
    //axios CRUD methods 
    const employeeAPI = (url = 'https://localhost:44350/api/Employee/') => {
            return {
                fetchAll: () => axios.get(url),
                create: newRecord => axios.post(url, newRecord),
                update: (id, updateRecord) => axios.put(url + id, updateRecord),
                delete: id => axios.delete(url + id)
        }
    }  
                // funcion to call/get all emplyees from the Employee API
                function refreshEmployeeList(){ 
                    employeeAPI().fetchAll()
                        .then(res => setEmployeeList(res.data))
                        .catch(err => console.log(err))
                }
    
                // funcion to CREATE all emplyees 
    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('employeeID')==="0")   
                employeeAPI().create(formData)
                    .then(res => {
                        onSuccess(); //Checks if the task as been done successfully
                        refreshEmployeeList();
                    })
                
                    .catch(err => console.log(err))
        else
            //updates created employee 
              employeeAPI().update(formData.get('employeeID'), formData)
                    .then(res => {
                        onSuccess(); 
                        refreshEmployeeList();
                    })
                    .catch(err => console.log(err))
                }  
                
    
    
            const showRecordDetails = data => { 
                setRecordForEdit(data)
                    }

    
    const onDelete = (e, id) => { 
        e.stopPropagation();
        if (window.confirm("Are you sure you want delete this record?")) { 
            employeeAPI().delete(id)
                .then(res => refreshEmployeeList())
            .catch(err=>console.log(err))
            
        }
    }
        const imageCard = data => (
            <div className="card" onClick={() => { showRecordDetails(data) }}>
                <img src={ data.imageSrc} alt="Emloyee" className="card-img-top rounded-circle"/>
                <div className="card-body">
                    <h5>{data.firstName}</h5>
                    <h5>{data.lastName}</h5>
                    <button className="btn btn-light delete-button" onClick={e => onDelete(e, parseInt(data.employeeID))}>
                    <i className="far fa-trash-alt"></i>
                    </button>
                    

                </div>
            </div>
        )

        
        return (

                    <div className ="row">
                    <div className="col-md-12"> 
                    <div className="jumbotron jumbotron-fluid py-4">
            <div className="container text-center">
                <h1 className="display-4">Employee Register</h1>
            </div>
            </div>   
            </div>
                <div className = "col-md-4">
                    <Employee
                        addOrEdit={addOrEdit}
                        recordForEdit={recordForEdit}
                    />
                </div>
                <div className = "col-md-8">
                    <div className="text-center">
                        <table>
                            <tbody>
                                {
                                    //tr > td
                                    [...Array(Math.ceil(employeeList.length / 3))].map((e, i) =>
                                        <tr key={i}>
                                            <td>{imageCard(employeeList[3 * i]) }</td>
                                            <td>{employeeList[3 * i + 1] ? imageCard(employeeList[3 * i + 1]) : null}</td>
                                            <td>{employeeList[3 * i + 2] ? imageCard(employeeList[3 * i + 2]) : null }</td>
                                    </tr>
                                    )
                                }
                            </tbody>
                    </table>
                </div>
                </div>
            </div>
        )
}

 