'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <h1>Something Went Wrong</h1>
      <p>
        We hit an unexpected error. Try refreshing the page, or head back to our
        homepage.
      </p>
      <button onClick={() => reset()}>Try Again</button>
    </main>
  );
}
