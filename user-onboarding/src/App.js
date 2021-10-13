import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import react, {useState,useEffect} from 'react';
import UserForm from './Form';
import formSchema from './validation/formSchema';
import * as yup from 'yup'


const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  terms: false
}

const initialErrors = {
  name: '',
  email: '',
  password: '',
}

const initialUsers = []


function App() {

  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialErrors)
  const [disabled, setDisabled] = useState(true)


  const getUsers= () => {
    axios.get(`https://reqres.in/api/users`)
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])


  const postNewUser = newUser => {
    axios.post(`https://reqres.in/api/users`, newUser)
      .then(res => {
        setUsers([res.data, ...users]);
      }).catch(err => {
        console.error(err);
      }).finally(() => {
        setFormValues(initialFormValues);
      })
  } 

  
  const validate = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      terms: ['terms'].filter(term => !!formValues[term])
    }
    // !!false => !true => false
    console.log(newUser);
    postNewUser(newUser);
  }

  const User = (props) => {
  return (
    <div className='user container'>
      <h2>{props.details.first_name}</h2>
      <p>Email: {props.details.email}</p>
    </div>
  )}

  return (
    <div className="App">
      <h1>Hello World</h1>
      <UserForm 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors} />

      {
        users.map(user=>{
          return (
          <User key={user.id} details={user} />
        )
      })
      }
    </div>
  );
}

export default App;
