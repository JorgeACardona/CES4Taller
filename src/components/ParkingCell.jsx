import { useContext, useEffect, useState } from 'react';
import cell from '../assets/cell.svg';
import vehicle from '../assets/vehicle.svg';
import motorcycle from '../assets/motorcycle.svg';
import { ParkingContext } from '../context/ParkingContext';
import { formatDate } from '../utils/handler';

const ParkingCell = ({ index, hasVehicle }) => {
	const { onChangeCells, plate, addVehicleToCell, cellsDetails } =
		useContext(ParkingContext);
	const [isBike, setIsBike] = useState(false);
	const [cellInfo, setCellInfo] = useState({});

	useEffect(() => {
		setIsBike(cellsDetails[index].cc ? true : false);
		setCellInfo(cellsDetails[index]);
	}, [cellsDetails]);

	const onSubmit = () => {
		if (!hasVehicle) {
			if (plate) {
				const plateExists = cellsDetails.filter(cell => cell.plate == plate);
				if (plateExists.length == 0) {
					onChangeCells(index);
					addVehicleToCell(index);
				} else {
					alert('El vehículo ya está parqueado');
				}
			} else {
				console.log('No pasa nada, que buscas?');
			}
		} else {
			const details = `Placa: ${cellInfo.plate} \nDocumento: ${cellInfo.document} \nMarca: ${cellInfo.brand} ${cellInfo.cc && `\nCilindraje: ${cellInfo.cc}`} ${cellInfo.model && `\nModelo: ${cellInfo.model}`}`;
			alert(details);
		}
	};

	return (
		<div
			onClick={onSubmit}
			style={{ cursor: 'pointer' }}
			className='parking-cell'
		>
			<img src={cell} alt='Parking Cell' className='cell' />
			{hasVehicle && !isBike ? (
				<img src={vehicle} alt='Vehicle' className='vehicle' />
			) : null}
			{isBike && <img src={motorcycle} alt='motorcycle' className='vehicle' />}
			<p>
				{formatDate(cellInfo.parkingDate) == 'Invalid Date Invalid Date'
					? null
					: formatDate(cellInfo.parkingDate)}
			</p>
		</div>
	);
};

export default ParkingCell;
