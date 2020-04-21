import React from 'react';

const ListItem = ({item}) => {
	return (
            <tr>
                <th scope="row">{item.cmc_rank}</th>
                <td>{item.name}</td>
                <td>{item.symbol}</td>
                <td>$ {item.quote.USD.price}</td>
                <td><button type="button" class="btn btn-primary">Ver detalles</button></td>
                <td><button type="button" class="btn btn-danger">Eliminar</button></td>
            </tr>
	);
}

export default ListItem;