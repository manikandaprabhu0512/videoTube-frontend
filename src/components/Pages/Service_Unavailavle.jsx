export default function ErrorPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 bg-gray-100">
        <img
          src="/Server-Side-Issues.png"
          alt="notfound"
          width={300}
          height={300}
        />

        <div className="mt-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Internal Server Error.
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Sorry, something went wrong on our end.
          </p>
        </div>
      </div>
    </>
  );
}
