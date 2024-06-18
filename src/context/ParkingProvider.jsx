import { useState } from 'react';
import { ParkingContext } from './ParkingContext';

const ParkingProvider = ({ children }) => {
	const [form, setForm] = useState({
		document: null,
		plate: '',
		cc: '',
		model: '',
		brand: '',
	});
	const [plate, setPlate] = useState('');
	const [vehicleType, setVehicleType] = useState('');
	const cellsLength = 10;
	const [cells, setCells] = useState(Array(cellsLength).fill(false));
	const [cellsDetails, setCellsDetails] = useState(
		Array(cellsLength).fill({ plate: '' }),
	);

	const [vehicles, setVehicles] = useState([]);

	const validatePlate = (plate, type) => {
		if (type === 'car') {
			return /^[A-Z]{3}\d{3}$/.test(plate);
		} else if (type === 'bike') {
			return /^[A-Z]{3}\d{2}[A-Z]$/.test(plate);
		}
		return false;
	};

	const onChangeCells = index => {
		setCells(cells.map((cell, i) => (i == index ? !cell : cell)));
	};

	const addVehicleToCell = index => {
		const vehicle = vehicles?.filter(v => v.plate == plate);
		if (vehicle !== undefined) {
			setCellsDetails(
				cellsDetails.map((detail, i) =>
					i == index
						? { ...vehicle[0], parkingDate: new Date().toISOString() }
						: detail,
				),
			);
		}
	};

	return (
		<ParkingContext.Provider
			value={{
				form,
				setForm,
				vehicleType,
				setVehicleType,
				cells,
				setCells,
				cellsDetails,
				setCellsDetails,
				setVehicles,
				vehicles,
				onChangeCells,
				plate,
				setPlate,
				addVehicleToCell,
				validatePlate,
			}}
		>
			{children}
		</ParkingContext.Provider>
	);
};
export default ParkingProvider;
