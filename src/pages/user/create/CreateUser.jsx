import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from '../../../components/form';
import UserService from '../../../services/UserService';

const CreateUser = () => {
  const history = useHistory();
  const { id } = useParams();
  const [userFind, setUserFind] = useState('');
  const [loading, setLoading] = useState(true);

  function onSubmit(value) {
    if (id) {
      const objectToSave = {
        username: value.username,
        password: value.confirmPassword,
      };
      UserService.UpdateUser(JSON.stringify(objectToSave), id);
      history.goBack();
    } else {
      // eslint-disable-next-line no-console
      UserService.Save(value.username, value.confirmPassword);
      history.goBack();
    }
    history.goBack();
  }

  const findUser = () => {
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
  };

  useEffect(async () => {
    findUser();
  }, []);

  return (
    loading ? <CircularProgress />
      : (
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
      )
  );
};

export default CreateUser;
