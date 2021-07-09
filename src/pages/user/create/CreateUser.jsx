import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import Form from '../../../components/form';
import UserService from '../../../services/UserService';
import { AlertContext } from '../../../contexts/AlertContext';

const CreateUser = () => {
  const { handleAlert } = useContext(AlertContext);
  const history = useHistory();
  const { id } = useParams();
  const [userFind, setUserFind] = useState({});
  const [loading, setLoading] = useState(true);

  async function onSubmit(value) {
    setLoading(true);
    try {
      if (value.password !== value.confirmPassword) {
        throw new Error('Invalid password');
      }
      if (id) {
        const objectToSave = {
          username: value.username,
          password: value.confirmPassword,
        };
        await UserService.UpdateUser(JSON.stringify(objectToSave), id);
        handleAlert({ status: 'success', message: 'Alterado com sucesso.' });
      } else {
        await UserService.Save(value.username, value.confirmPassword);
        handleAlert({ status: 'success', message: 'Incluído com sucesso.' });
      }
      history.push('/usuarios');
    } catch (error) {
      handleAlert({ status: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function findUser() {
      if (id) {
        const user = await UserService.FindById(id);

        const objectUser = {
          ...user,
          username: user.username,
        };
        setUserFind(objectUser);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    findUser();
  }, [id]);

  return (
    loading ? <CircularProgress />
      : (
        <>
          <Button onClick={() => { history.push('/usuarios'); }} className="custom-button" variant="outlined" color="primary">
            Voltar
          </Button>
          <br />
          <Form
            mainButton={{
              text: 'Salvar',
              onSubmit,
            }}
            fields={[
              { name: 'username', label: 'Usuário', required: true },
              {
                name: 'password', label: 'Senha', required: true, type: 'password',
              },
              {
                name: 'confirmPassword',
                label: 'Confirmar senha',
                required: true,
                type: 'password',
              },
            ]}
            defaultValues={userFind}
          />
        </>
      )
  );
};

export default CreateUser;
