import { useEffect, useState } from 'react'
import './App.css';
import { MyForm } from './assets/components/MyForm/MyForm.jsx';
import { ListProducts } from './assets/components/ListProducts/ListProducts.jsx';
import { Header } from './assets/components/header/Header.jsx';
import { Modal } from './assets/components/boxModal/Modal.jsx';
import axios from 'axios';

function App() {

    let [ users, setUsers ] = useState([]);
    let [ userSelect, setUserSelect ] = useState(null);
    let [ visivility, setVisivility ] = useState(true);

    let [ modal, setModal ] = useState(true);
    let [ title, settitle ] =  useState('mi box modal');
    let [ text, setText ] =  useState('Este es el texto de la modal');

    useEffect(()=> {
        axios.get('https://users-crud1.herokuapp.com/users/')
        .then((result) => {
            setUsers([...result.data]);
            showModal('Welcome', 'Uploaded Users.');
        });
    },[]);
    const getUser = () => {
        axios.get('https://users-crud1.herokuapp.com/users/')
        .then((result) => {
            setUsers([...result.data]);
        });
    }
    const addUser = (newProduct) => {
        axios.post('https://users-crud1.herokuapp.com/users/', newProduct)
        .then(() => { 
            getUser();
            showModal('created user', 'User created successfully');
        })
        .catch((error) => console.log(error.response));
    }
    const deleteUser = (item) => {
        axios.delete(`https://users-crud1.herokuapp.com/users/${item}/`)
        .then(() => {
            getUser();
            showModal('DUpdateeleted user', 'User deleted successfully');
        })
        .catch((error) => console.log(error.response));
    }
    const updateUser = (item) => {
        axios.put(`https://users-crud1.herokuapp.com/users/${item.id}/`, item)
        .then(result => {
            getUser();
            showModal('Updated user', 'Successfully edited user');
        })
        .catch(err => console.log(err));
    }
    const selectUser = item => setUserSelect(userSelect = item);
    const deSelectUser = () => setUserSelect(userSelect = null);
    const openSlider = () => {
        if(visivility) setVisivility(!visivility);
    };
    const toogleSlider = () => {
        if(!visivility) setVisivility(!visivility);
    };
    const showModal = (myTitle, myText) => {
        if(myTitle && myText){
            settitle(title = myTitle)
            setText(text = myText)
        }
        setModal(!modal);
    }
    
    return (
        <div className="App">
            <Header openSlider={openSlider}
            />
            <MyForm fx={addUser} 
                userSelect={userSelect} 
                deSelecUser={deSelectUser} 
                update={updateUser}
                hiddenSlider={visivility}
                openSlider={toogleSlider}
            />
            <ListProducts 
                users={users} 
                deleteUser={deleteUser} 
                selectUser={selectUser} 
                openSlider={openSlider}
            />
            <Modal
                keyModal={modal}
                showModal={showModal}
                title={title}
                text={text}
            />
        </div>
    );
}

export default App;