import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/pages/Login.module.css';

export default function Login() {
  const router = useRouter();
  const [isFilled, setIsFilled] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    console.log(username);
    setIsFilled(!!username);
    console.log(isFilled);
  }, [username]);

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/home/${username}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="/icons/logo-full.svg" alt="" />

        <h1>Bem-vindo</h1>

        <div className={styles.loginInfo}>
          <img src="/icons/github.svg" alt="" />
          <span>Faça Login com seu Github para começar</span>
        </div>

        <form className={styles.loginInput} onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Digite seu username"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setUsername(e.currentTarget.value);
            }}
            value={username}
          />
          {isFilled ? (
            <button type="submit">
              <img src="/icons/arrow-left.svg" alt="" />
            </button>
          ) : (
            <button disabled></button>
          )}
        </form>
      </div>
    </div>
  );
}
