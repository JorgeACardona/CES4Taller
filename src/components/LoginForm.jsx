import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ type }) => {
  const { setUser, registeredUsers, setRegisteredUsers, setIsLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    document: 0,
    email: '',
    password: '',
  });

  const onChangeValue = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    setForm({
      document: 0,
      email: '',
      password: '',
    });
  }, []);

  const submitInfo = e => {
    e.preventDefault();
    let foundUser;
    if (type == 'login') {
      foundUser = registeredUsers.filter(
        registeredUser =>
          registeredUser.email == form.email &&
          registeredUser.password == form.password,
      );
    } else if (type == 'signup') {
      foundUser = registeredUsers.filter(
        registeredUser => registeredUser.document == form.document,
      );
    }

    if (type == 'login' && foundUser.length == 1) {
      setUser(form);
      setIsLogin(true);
      navigate('/');
    } else if (type == 'login' && foundUser.length == 0) {
      setForm({
        document: 0,
        email: '',
        password: '',
      });
      alert('Credenciales incorrectas!');
    } else if (type == 'signup' && foundUser.length == 0) {
      setRegisteredUsers([
        ...registeredUsers,
        {
          document: parseInt(form.document),
          email: form.email,
          password: form.password,
        },
      ]);
      alert(`El email: ${form.email} ha sido registrado exitosamente.`);
      setIsLogin(true);
      navigate('/');
    } else if (type == 'signup' && foundUser.length == 1) {
      alert('El usuario ya se encuentra registrado!');
      setForm({
        document: 0,
        email: '',
        password: '',
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#E0F7FA', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='card' style={{ width: '50vw', padding: '20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)' }}>
        <h2 style={{textAlign: 'center'}}>Iniciar Sesión</h2>
		<br></br>
		<form onSubmit={e => submitInfo(e)}>
          {type == 'signup' && (
            <div className='mb-3'>
              <label className='form-label'>Documento</label>
              <div className='input-group'>
                <input
                  className='form-control'
                  value={form.document == 0 ? '' : form.document}
                  type='number'
                  name='document'
                  onChange={e => onChangeValue(e)}
                />
              </div>
            </div>
          )}
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <div className='input-group'>
              <input
                className='form-control'
                value={form.email}
                type='email'
                name='email'
                autoComplete='off'
                onChange={e => onChangeValue(e)}
              />
            </div>
          </div>
          <div className='mb-3'>
            <label className='form-label'>Contraseña</label>
            <div className='input-group'>
              <input
                className='form-control'
                value={form.password}
                type={type == 'login' ? 'password' : 'text'}
                name='password'
                onChange={e => onChangeValue(e)}
              />
            </div>
          </div>
          <div className='d-flex justify-content-end mt-3'>
            <button type='submit' className='btn btn-primary'>
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
