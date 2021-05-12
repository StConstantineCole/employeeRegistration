import React, { useState, useEffect } from 'react';


const defaultImageSrc = '/img/DefaultImage.png';

const initialFieldValues = {
    employeeID: 0,
    firstName: "",
    lastName: "",
    imageName: "",
    imageSrc: defaultImageSrc,
    imageFile: null
}

export default function Employee(props) {
    
    //passing down props from parent component
    const { addOrEdit, recordForEdit }= props

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    
    useEffect(() => { 
        if (recordForEdit != null)
            setValues(recordForEdit);
        
    }, [recordForEdit])
    


   
    //updates value of name attribute form all form fields
    const handleInputChange = (e) => { 
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    //checks if there is an array of "files"/image and if its empty
    //if there are files, then set the values if not set it as null.
    const showPreview = (e) => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0]
            const reader = new FileReader();//Returns a newly constructed FileReader.
            reader.onload = x => {               //A handler for the load event. This event is triggered each time the reading operation is successfully completed.
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else { 
            setValues({
                    ...values,
                    imageFile: null,
                    imageSrc: defaultImageSrc  
        }) 
        } 
        
    };
//validates form fields
    const validate = () => { 
        let temp = {}
        temp.firstName = values.firstName === "" ? false : true;
        temp.lastName = values.lastName === "" ? false : true;
        temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x=> x=true)
        
    }

    //resets forms to innitial state ""
    const resetForm = () => { 
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({});
    }
    
//submits form if it is validated
    const handleFormSubmit = e => { 
        e.preventDefault()
        if (validate()) { 
            const formData = new FormData()
            formData.append('employeeID', values.employeeID)
            formData.append('firstName', values.firstName)
            formData.append('lastName', values.lastName)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            addOrEdit(formData, resetForm)

        }
    }
    //function to vaidate form... uses ternary op to change css class
     const applyErrorClass = field => ((field in errors  && errors[field]===false)?' invaid-field': '') 

    
    return (
        <>
            <div className="container text-center">
                <p className="lead">Employee</p>
            <h3>Employee Form</h3>
        </div>
            <form autoComplete="off" novaidate="true" onSubmit={handleFormSubmit}>
                <div className="card">
                    <img src={ values.imageSrc} alt="Employee" className="card-img-top"/>
                    <div className="card-body">
                        <div className="form-group">
                            <input type="file" accept="image/" className={"form-control-file" +applyErrorClass('imageSrc')}
                                onChange = {showPreview} id="image-uploader"
                            /> 
                        </div>
                        <div className="form-group">
                            <input className={'form-control' +applyErrorClass('firstName')} placeholder="First Name" name="firstName"
                                value={values.firstName} onChange={handleInputChange} />
                            
                            <input className={'form-control' +applyErrorClass('lastName')} placeholder="Last Name" name="lastName"
                                value={values.lastName} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-light">Submit</button>
                    </div>
                </div>
            </form>
            </>
    )
}
