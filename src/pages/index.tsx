import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../utils/api";
import { Calendar } from "../components/Calendar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Calendar Journal</title>
        <meta name="description" content="Calendar to hold todos and events" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📅</text></svg>"
        ></link>
      </Head>
      <main>
        <h1 className="text-5xl font-extrabold text-[hsl(280,100%,70%)] sm:text-[5rem]">
          Calendar Journal
        </h1>
        <AuthShowcase />
        {/* <div className="pt-10">
            <EventEntries />
          </div> */}
        <div className="min-h-full pt-10">
          <Calendar />
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

const EventEntries = () => {
  const { data: eventEntries, isLoading } = api.event.getAll.useQuery();

  if (isLoading) return <div>Fetching messages...</div>;

  return (
    <div className="flex flex-col gap-4">
      <p>Events</p>
      {eventEntries?.length! > 0
        ? eventEntries?.map((event) => {
            return (
              <div key={event.id}>
                <p>{event.title}</p>
              </div>
            );
          })
        : "No events found"}
    </div>
  );
};
