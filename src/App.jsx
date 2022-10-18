import { useEffect, useState } from 'react'
import './App.css';
import { MyForm } from './assets/components/MyForm/MyForm.jsx';
import { ListProducts } from './assets/components/ListProducts/ListProducts.jsx';
import { Header } from './assets/components/header/Header.jsx';
import { Modal } from './assets/components/boxModal/Modal.jsx';
import axios from 'axios';

function App() {
    const URL =  'http://144.126.218.162:9000/';

    let [ users, setUsers ] = useState([]);
    let [ userSelect, setUserSelect ] = useState(null);
    let [ visivility, setVisivility ] = useState(true);

    let [ modal, setModal ] = useState(true);
    let [ title, settitle ] =  useState('mi box modal');
    let [ text, setText ] =  useState('Este es el texto de la modal');

    useEffect(()=> {
        axios.get(`${URL}users/`)
        .then((result) => {
            setUsers([...result.data]);
            showModal('uploaded users', 'welcome to my crud.');
        })
        .catch((err) => {
            showModal('Error', 'server error');
            console.log(err)
        });
    },[]);
    const getUser = () => {
        axios.get(`${URL}users/`)
        .then((result) => {
            setUsers([...result.data]);
        })
        .catch(() => {
            showModal('Error', 'server error');
        });
    }
    const addUser = (newProduct) => {
        axios.post(`${URL}users/`, newProduct)
        .then(() => { 
            getUser();
            showModal('created user', 'User created successfully');
        })
        .catch(() => {
            showModal('Error', 'server error');
        });
    }
    const deleteUser = (item) => {
        axios.delete(`${URL}users/${item}/`)
        .then(() => {
            getUser();
            showModal('DUpdateeleted user', 'User deleted successfully');
        })
        .catch(() => {
            showModal('Error', 'server error');
        });
    }
    const updateUser = (item) => {
        axios.put(`${URL}users/${item.id}/`, item)
        .then(result => {
            getUser();
            showModal('Updated user', 'Successfully edited user');
        })
        .catch(() => {
            showModal('Error', 'server error');
        });
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