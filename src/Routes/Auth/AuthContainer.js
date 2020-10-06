import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {toast} from 'react-toastify';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import {LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET} from './AuthQueries';
import {logUserIn} from '../../Apollo/Cache';

const AuthContainer = () => {
  const [action, setAction] = useState('logIn');
  const username = useInput('');
  const firstname = useInput('');
  const lastname = useInput('');
  const secret = useInput('');
  const email = useInput('smarttin77@gmail.com');
  const [requestSecret] = useMutation(LOG_IN);
  const [createAccount] = useMutation(CREATE_ACCOUNT);
  const [confirmSecret] = useMutation(CONFIRM_SECRET);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === 'logIn') {
      if (email.value !== '') {
        try {
          const {data} = await requestSecret({variables: {email: email.value}});

          if (!data.requestSecret) {
            toast.error('You dont have an account yet, create one');
            setTimeout(() => setAction('signUp'), 3000);
          } else {
            toast.success('Check your inbox for your login secret');
            setAction('confirm');
          }
        } catch (err) {
          console.log(err);
          toast.error("Can't request secret, try again");
        }
      } else {
        toast.error('Email is required');
      }
    } else if (action === 'signUp') {
      if (
        email.value !== '' &&
        username.value !== '' &&
        firstname.value !== '' &&
        lastname.value !== ''
      ) {
        try {
          const {data} = await createAccount({
            variables: {
              email: email.value,
              username: username.value,
              firstname: firstname.value,
              lastname: lastname.value,
            },
          });
          if (!data.createAccount) {
            toast.error("Can't create account");
          } else {
            toast.success('Account created! Log In now');
            setTimeout(() => setAction('logIn'), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error('All field are required');
      }
    } else if (action === 'confirm') {
      if (secret.value !== '') {
        try {
          const {data: {confirmSecret : token}} = await confirmSecret({
            variables: {
              email: email.value,
              secret: secret.value,
            },
          });

          if (token !== '' && token !== undefined) {
            logUserIn(!!token)
          } else {
            throw Error();
          }
        } catch {
          toast.error('Cant confirm secret,check again');
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstname={firstname}
      lastname={lastname}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};

export default AuthContainer;
