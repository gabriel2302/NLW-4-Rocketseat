import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

interface ProfileProps {
  avatar_url: string;
  name: string;
}

export function Profile({ avatar_url, name }: ProfileProps) {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src={avatar_url} alt="Gabriel Queiroz" />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="/icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
