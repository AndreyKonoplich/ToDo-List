import Providers from '@/providers/Providers';
import '@/styles/globals.scss';

export const metadata = {
  title: 'Task Manager',
  description: 'Управляйте своими задачами с помощью Task Manager',
  icons: {
    icon: '/assets/icons/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
