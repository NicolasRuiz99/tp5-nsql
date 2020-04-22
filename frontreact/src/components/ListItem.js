import React from 'react';
import {withRouter,Link} from 'react-router-dom';

const ListItem = ({item,deleteCoin}) => {
	return (
            <tr>
                <th scope="row">{item.cmc_rank}</th>
                <td>{item.name}</td>
                <td>{item.symbol}</td>
                <td>$ {item.quote.USD.price}</td>
                <td><Link type="button" class="btn btn-primary" to={`/get_coin/${item.id}`}>Ver detalles</Link></td>
                <td><button type="button" class="btn btn-danger" onClick={() => deleteCoin(item.cmc_rank)}>Eliminar</button></td>
            </tr>
	);
}

export default withRouter (ListItem);