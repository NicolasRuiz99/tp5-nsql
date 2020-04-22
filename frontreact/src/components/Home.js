import React,{useEffect,useState} from 'react';
import List from './List';
import Error from './Error';
import Loading from './Loading';
import {listAll,deleteItem,listTop20,listTop5} from '../functions';

const Home = ({type}) => {

    const [list,setList] = useState ([]);
    const [error,setError] = useState (false);
    const [error2,setError2] = useState (false);
    const [empty,setEmpty] = useState (false);
    const [refresh,setRefresh] = useState (false);
    const [loading,setLoading] = useState (false);

    const deleteCoin = (rank) => {
        setError (false);
        deleteItem(rank)
        .then(()=>{
            setRefresh(true);
        })
        .catch((err)=>{
            setError (true);
            return;
        })
    }

    useEffect (()=>{
        setRefresh (false);
        setError (false);
        setError2 (false);
        setEmpty (false);
        setLoading (true);
        switch (type){
            case 1:
                listAll()
                .then ((res)=>{
                    if (res === null){
                        setEmpty (true);
                        return;
                    }else{
                        setList(res);
                        setLoading (false);
                    }
                })
                .catch((err)=>{
                    setLoading (false);
                    if (err.includes('corrupt')){
                        setError2 (true);
                    }else{
                        setError (true);
                    }
                    return;
                })
            break;
            case 2:
                listTop5()
                .then ((res)=>{
                    if (res === null){
                        setEmpty (true);
                        return;
                    }else{
                        setList(res);
                        setLoading (false);
                    }
                })
                .catch((err)=>{
                    setLoading (false);
                    if (err.includes('corrupt')){
                        setError2 (true);
                    }else{
                        setError (true);
                    }
                    return;
                })
            break;
            case 3:
                listTop20()
                .then ((res)=>{
                    if (res === null){
                        setEmpty (true);
                        return;
                    }else{
                        setList(res);
                        setLoading (false);
                    }
                })
                .catch((err)=>{
                    setLoading (false);
                    if (err.includes('corrupt')){
                        setError2 (true);
                    }else{
                        setError (true);
                    }
                    return;
                })
            break;
        }
        
    },[refresh])

	return (
        <div>
            {(loading)?
            <Loading />
            :
            <div>
                {(error)? <Error mensaje={"Ocurrió un error en el servidor"} /> : null}
                {(error2)? <Error mensaje={"Los datos están corruptos"} /> : null}
                {(empty)? <Error mensaje={"No hay datos para mostrar"} /> : null}
                <List list={list} deleteCoin={deleteCoin}/>
            </div>
            }
        </div>
	);
}

export default Home;