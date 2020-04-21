import React,{useEffect,useState} from 'react';
import Navbar from './Navbar';
import List from './List';
import Error from './Error';
import {listAll} from '../functions';

const Home = () => {

    const [list,setList] = useState ([]);
    const [error,setError] = useState (false);
    const [empty,setEmpty] = useState (false);

    useEffect (()=>{
        setError (false);
        setEmpty (false);
        listAll()
        .then ((res)=>{
            if (res === null){
                setEmpty (true);
                return;
            }else{
                setList(res);
            }
        })
        .catch((err)=>{
            setError (true);
            console.log(err);
            return;
        })
    },[])

	return (
        <div>
            <Navbar />
            {(error)? <Error mensaje={"Ocurrió un error en el servidor"} /> : null}
            <List list={list}/>
        </div>
	);
}

export default Home;