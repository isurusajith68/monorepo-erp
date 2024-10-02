import { headers } from 'next/headers';

export default function HomePage() {
  const headersList = headers();
  const host = headersList.get('host'); // Get domain/host
  const protocol = headersList.get('x-forwarded-proto') || 'http'; // Get protocol
  const domain = `${protocol}://${host}`;
  

  return (
    <div>
      <h1>Domain: {domain}</h1>
    </div>
  );
}
