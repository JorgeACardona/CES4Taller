import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ParkingContext } from '../context/ParkingContext';
import { UserContext } from '../context/UserContext';
import VehicleInput from './VehicleInput';
import { useNavigate } from 'react-router-dom';

const years = Array.from(new Array(30), (val, index) => 2023 - index);
const brands = ['Kia', 'Hyundai', 'Ford', 'Chevrolet', 'Nissan'];
const bykeBrands = ['Bajaj', 'AKT', 'Auteco', 'Suzuki'];
const cylinder = ['100cc', '125cc', '150cc', '200cc', '+250cc'];

const FormContainer = styled.div`
  width: 50vw;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  .mb-3 {
    margin-bottom: 1rem;
  }

  .form-label {
    font-weight: bold;
  }

  .form-select,
  .form-control {
    width: 100%;
    height: 50px;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 5px;
  }

  .d-flex {
    display: flex;
    justify-content: flex-end;
  }

  .btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ParkingForm = () => {
  const navigate = useNavigate();
  const {
    form,
    setForm,
    vehicleType,
    setVehicles,
    vehicles,
    setPlate,
    validatePlate,
    setVehicleType,
  } = useContext(ParkingContext);
  const { registeredUsers } = useContext(UserContext);
  const [search, setSearch] = useState('');

  const brandSelect = vehicleType === 'car' ? brands : bykeBrands;

  useEffect(() => {
    setForm({
      ...form,
      plate: search,
    });
  }, [search]);

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submitInfo = (e) => {
    e.preventDefault();

    if (!validatePlate(form.plate, vehicleType)) {
      alert('La placa no es válida.');
      return;
    }

    if (vehicleType === 'car') {
      if (
        form.plate === '' ||
        form.document === null ||
        form.model === '' ||
        form.brand === ''
      ) {
        alert('¡Diligencia todos los datos!');
        return false;
      }
    } else if (vehicleType === 'bike') {
      if (
        form.plate === '' ||
        form.document === null ||
        form.cc === '' ||
        form.brand === ''
      ) {
        alert('¡Diligencia todos los datos!');
        return false;
      }
    }

    const plateExists = vehicles?.filter((vehicle) => vehicle.plate === form.plate);
    const documentExists = registeredUsers.filter(
      (user) => user.document === parseInt(form.document)
    );
    if (plateExists?.length > 0) {
      alert('La placa ya está registrada.');
    } else if (plateExists?.length === 0 || plateExists === undefined) {
      if (documentExists.length === 1) {
        setVehicles([
          ...vehicles,
          {
            plate: form.plate,
            document: parseInt(form.document),
            cc: form.cc,
            model: form.model,
            brand: form.brand,
          },
        ]);
        const type = vehicleType === 'car' ? 'el carro' : 'la moto';
        alert(`Se ha registrado con exito ${type} con la placa ${form.plate}`);
        setVehicleType('');
        navigate('/vehicle');
      } else if (documentExists.length === 0) {
        alert('El documento ingresado no existe');
      }
    }
  };

  useEffect(() => {
    setPlate(form.plate);
    setForm({
      plate: '',
      cc: '',
      model: '',
      brand: '',
      document: undefined,
    });
  }, [vehicles]);

  return (
    <FormContainer>
      <form onSubmit={(e) => submitInfo(e)}>
        <div className='mb-3'>
          <label className='form-label'>Número de placa:</label>
          <VehicleInput setSearch={setSearch} />
        </div>
        {vehicleType === 'bike' && (
          <div className='mb-3'>
            <label className='form-label'>Cilindraje del vehículo</label>
            <div className='input-group'>
              <select
                className='form-select'
                value={form.cc}
                name='cc'
                onChange={(e) => onChangeValue(e)}
              >
                <option value=''>Seleccione una marca</option>
                {cylinder.map((cc, index) => (
                  <option key={index} value={cc}>
                    {cc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {vehicleType === 'car' && (
          <div className='mb-3'>
            <label className='form-label'>Modelo del vehículo</label>
            <div className='input-group'>
              <select
                className='form-select'
                value={form.model}
                name='model'
                onChange={(e) => onChangeValue(e)}
              >
                <option value=''>Seleccione un año</option>
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className='mb-3'>
          <label className='form-label'>Marca del vehículo</label>
          <div className='input-group'>
            <select
              className='form-select'
              value={form.brand}
              name='brand'
              onChange={(e) => onChangeValue(e)}
            >
              <option value=''>Seleccione una marca</option>
              {brandSelect.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Documento</label>
          <div className='input-group'>
            <input
              className='form-control'
              list='documents'
              value={form.document !== undefined ? form.document : ''}
              type='number'
              name='document'
              onChange={(e) => onChangeValue(e)}
            />
            <datalist id='documents'>
              {registeredUsers.map((user, index) => (
                <option key={index} value={user.document} />
              ))}
            </datalist>
          </div>
        </div>
        <div className='d-flex justify-content-end mt-3'>
          <button type='submit' className='btn btn-primary'>
            Enviar
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default ParkingForm;
