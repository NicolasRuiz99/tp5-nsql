import React from 'react';
import ListItem from './ListItem';

const List = ({list}) => {
	return (
        <div>
            <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Simbolo</th>
                <th scope="col">Precio (USD)</th>
                <th scope="col">Acción #1</th>
                <th scope="col">Acción #2</th>
            </tr>
            </thead>
            <tbody>
            {list.map(item => (
                        <ListItem 
                            key = {item.id}
                            item = {item}
                        />
            ))}
            </tbody>
        </table>
      </div>
	);
}

export default List;