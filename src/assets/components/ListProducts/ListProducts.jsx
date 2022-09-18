import './list.css';

export const ListProducts = ({ users, deleteUser, selectUser, openSlider }) => {

    return(
        <div className="productContainer">
                {
                    users.length > 0 ?
                    users.map(user => (
                        <article className='productContainer-items' key={user.id}>
                            <div className='items-description'>
                                <h2 className='items-text'>{user.first_name} {user.last_name}</h2>
                                <p className='items-text'>birthday: {user.birthday}</p>
                                <p className='items-text'>email: {user.email}</p>
                                <p className='items-text'>password: {user.password}</p>
                            </div>
                            
                            <div className="item-containerButton">
                                <button className="item-button" onClick={() => { deleteUser(user.id) }}>delet</button>
                                <button className="item-button" 
                                onClick={() => {
                                    selectUser(user); 
                                    openSlider();
                                    }}>update data</button>
                            </div>
                         </article>
                    ))
                    : 
                    (<h1> Add users please</h1>)
                }
        </div>
    );
}