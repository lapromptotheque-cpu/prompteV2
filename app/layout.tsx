import './globals.css';

export const metadata = {
  title: 'La Promptothèque',
  description: 'Gérez et exécutez vos prompts IA comme un pro.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
