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
  const [userFind, setUserFind] = useState('');
  const [loading, setLoading] = useState(true);

  async function onSubmit(value) {
    if (id) {
      const objectToSave = {
        username: value.username,
        password: value.confirmPassword,
      };

      try {
        await UserService.UpdateUser(JSON.stringify(objectToSave), id);

        handleAlert({ status: 'success', message: 'Alterado com sucesso.' });
        history.push('/usuarios');
      } catch (e) {
        handleAlert({ status: 'error', message: e.message });
      }
    } else {
      UserService.Save(value.username, value.confirmPassword);
      history.goBack();
    }
  }

  useEffect(() => {
    async function findUser() {
      if (id) {
        UserService.FindById(id).then((dataFind) => {
          const objectVehicle = {
            username: dataFind.username,
          };
          setUserFind(objectVehicle);
          setLoading(false);
        });
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
            value={userFind}
          />
        </>
      )
  );
};

export default CreateUser;
