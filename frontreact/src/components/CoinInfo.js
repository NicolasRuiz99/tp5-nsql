import React,{useEffect,useState} from "react";
import { get } from "../functions";
import Loading from "./Loading";
import Error from "./Error";

const CoinInfo = ({item,id}) => {

    const [coin,setCoin] = useState (null);
    const [error,setError] = useState (false);
    const [loading,setLoading] = useState (false);
    const [error2,setError2] = useState (false);

    useEffect (()=>{
        setLoading (true);
        get (id)
        .then((res)=>{
            setCoin (res);
            setLoading (false);
        })
        .catch((err)=>{
            if (err.includes('corrupt')){
                setError2 (true);
                return;
            }else{
                setError (true);
                return;
            }
        })
        setError (false);
        setError2 (false);
    },[id])

    if (coin) {
        return (
            <div>
            {(loading)?
            <Loading/>
            :
            <div>
                {(error2)?<Error mensaje={"Los datos están corruptos"}/>
                :
                <div>
                <h2>{coin.symbol} - {coin.name}</h2>
                <ul class="list-group">
                    <li class="list-group-item">Ranking: {coin.cmc_rank}</li>
                    <li class="list-group-item">Cantidad de monedas en circulación: {coin.circulating_supply}</li>
                    <li class="list-group-item">Precio (USD): $ {coin.quote.USD.price}</li>
                    <li class="list-group-item">Variación 24h: {coin.quote.USD.percent_change_24h} %</li>
                    <li class="list-group-item">Variación 1h: {coin.quote.USD.percent_change_1h} %</li>
                    <li class="list-group-item">Variación 7d: {coin.quote.USD.percent_change_7d} %</li>
                    <li class="list-group-item">Última actualización: {coin.last_updated}</li>
                    <li class="list-group-item">Fecha en la que se agregó: {coin.date_added}</li>
                </ul>
            </div>
                }
            </div>
            }
            </div>
        );
    }else{
        if (item){
            return (
                <div>
                <h2>{item.symbol} - {item.name}</h2>
                <ul class="list-group">
                    <li class="list-group-item">Ranking: {item.cmc_rank}</li>
                    <li class="list-group-item">Cantidad de monedas en circulación: {item.circulating_supply}</li>
                    <li class="list-group-item">Precio (USD): $ {item.quote.USD.price}</li>
                    <li class="list-group-item">Variación 24h: {item.quote.USD.percent_change_24h} %</li>
                    <li class="list-group-item">Variación 1h: {item.quote.USD.percent_change_1h} %</li>
                    <li class="list-group-item">Variación 7d: {item.quote.USD.percent_change_7d} %</li>
                    <li class="list-group-item">Última actualización: {item.last_updated}</li>
                    <li class="list-group-item">Fecha en la que se agregó: {item.date_added}</li>
                </ul>
            </div>
            );
        }else {
            return (
                <Error mensaje={"Ocurrió un error"} />
            );
        } 
    }

    ;
};

export default CoinInfo;