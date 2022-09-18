import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './myform.css'

export const MyForm = ({ fx, userSelect, deSelecUser, update, hiddenSlider, openSlider }) => {


    useEffect(() => {
        if (userSelect) {
            reset(userSelect);
        }
        
    }, [userSelect]);

    const clearValue = () => {
        reset({email:'',password:'',first_name:'',last_name:'',birthday:''});
        if(userSelect){
            deSelecUser();
        }
    }

    const { register, handleSubmit, reset } = useForm()

    const sub = (data) => {
        userSelect ? update(data) : fx(data);
        clearValue();
    }
        

    return (
        <div className={hiddenSlider ? 'divForm' : 'divForm divForm-hidden'}>
            <form action="" method="post" onSubmit={handleSubmit(sub)} className="myform">
                <label htmlFor="mail-user" className="myform-label">email</label>
                <input type="email" 
                    required
                    className="myform-input"
                    name="mail" placeholder="email" 
                    id="mail-user" 
                    {...register("email")}
                />

                <label htmlFor="pass-user" className="myform-label">password</label>
                <input type="password" 
                    required
                    className="myform-input"
                    name="password" placeholder="password" id="pass-user" 
                    {...register("password")}
                />

                <label htmlFor="name-user" className="myform-label">first name</label>
                <input type="text" 
                    required
                    className="myform-input" 
                    name="name" placeholder="first-name" id="name-user" 
                    {...register("first_name")}
                />

                <label htmlFor="lastName-user" className="myform-label">last name</label>
                <input type="text" 
                    required
                    className="myform-input" 
                    name="lastNme" placeholder="last name" id="lastName-user"
                    {...register("last_name")}
                />

                <label htmlFor="birthday-user" className="myform-label">birthday</label>
                <input type="date" 
                    required
                    className="myform-input" 
                    name="birthday" placeholder="birthday-user" id="birthday-user" 
                    {...register("birthday")}
                />

                <button type="submit" className='myform-button'>{userSelect ? "Update" : "Create"}</button>
                <button type="button" className='myform-button button-clear' onClick={clearValue}>Clear</button>
            </form>
            <button onClick={openSlider}>close the window</button>
        </div>
    );
}