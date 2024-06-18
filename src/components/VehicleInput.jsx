import { useContext, useEffect, useState } from 'react';
import { ParkingContext } from '../context/ParkingContext';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const LettersInput = styled.input`
  width: 80px;
  height: 50px;
  padding: 0.5rem;
  text-transform: uppercase;
  text-align: center;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
`;

const Separator = styled.span`
  margin: 0 0.5rem;
  font-size: 1.5rem;
`;

const NumbersInput = styled.input`
  width: 80px;
  height: 50px;
  padding: 0.5rem;
  text-transform: uppercase;
  text-align: center;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0 5px 5px 0;
`;

const VehicleInput = ({ setSearch }) => {
  const { vehicles } = useContext(ParkingContext);
  const [letters, setLetters] = useState('');
  const [numbers, setNumbers] = useState('');

  useEffect(() => {
    setLetters('');
    setNumbers('');
  }, [vehicles]);

  useEffect(() => {
    setSearch(letters + numbers);
  }, [letters, numbers]);

  const handleLettersChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z]*$/.test(value) && value.length <= 3) {
      setLetters(value);
    }
  };

  const handleNumbersChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value == '' || /^\d{0,2}[A-H]?$|^\d{0,3}$/.test(value)) {
      setNumbers(value);
    }
  };

  return (
    <InputContainer>
      <LettersInput
        type='text'
        value={letters}
        onChange={handleLettersChange}
        placeholder='ABC'
        maxLength='3'
      />
      <Separator>-</Separator>
      <NumbersInput
        type='text'
        value={numbers}
        onChange={handleNumbersChange}
        placeholder='123'
        maxLength='3'
      />
    </InputContainer>
  );
};

export default VehicleInput;
