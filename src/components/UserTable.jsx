import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.section`
  width: 50vw;
  height: 50vh;
  padding: 1rem;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: auto; /* Añadido para permitir desplazamiento si es necesario */
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  table {
    width: 100%;
    margin-top: 1rem;
    border-collapse: collapse;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
  }

  th {
    background-color: #f8f9fa;
    font-weight: bold;
  }

  td {
    vertical-align: middle;
  }

  .btn {
    text-decoration: none;
    color: #007bff;
    cursor: pointer;
  }

  .btn:hover {
    text-decoration: underline;
  }
`;

const UserTable = () => {
  const { registeredUsers } = useContext(UserContext);

  return (
    <Card>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Documento</th>
            <th scope='col'>Correo</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registeredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.document}</td>
              <td>{user.email}</td>
              <td>
                <Link className='btn' to={`/user/${user.document}`}>
                  <p>Ver vehiculos</p>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default UserTable;
