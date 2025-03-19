import LoginForm from '@/components/loginForm/LoginForm';

import '@/styles/pages/home.scss';

export default function Home() {
  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src="/assets/video/background.mp4" type="video/mp4" />
      </video>

      <div className="content">
        <h1 className="home-title">Приветствуем вас на нашем сайте</h1>
        <h2 className="home-article">
          Здесь вы сможете отслеживать ваши задачи
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}
