import Head from 'next/head';
import React from 'react';
import { ChallengesProvider } from '../../contexts/ChallengesContext';
import { GetServerSideProps } from 'next';
import { CountdownProvider } from '../../contexts/CountdownContext';

import { ExperienceBar } from '../../components/ExperienceBar';
import { Profile } from '../../components/Profile';
import { CompletedChallenges } from '../../components/CompletedChallenges';
import { Countdown } from '../../components/Countdown';
import { ChallengeBox } from '../../components/ChallengeBox';

import styles from '../../styles/pages/Home.module.css';

interface User {
  id: string;
  login: string;
  avatar_url: string;
}

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  user: User;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile
                name={props.user.login}
                avatar_url={props.user.avatar_url}
              />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  const { username } = ctx.query;

  console.log(username);

  try {
    const user: User = await fetch(
      `https://api.github.com/users/${username}`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });

    console.log(user);
    return {
      props: {
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengesCompleted: Number(challengesCompleted),
        user,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
};
