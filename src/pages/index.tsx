import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { CreateForm } from "~/components/topics/createForm";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Note Taker</title>
        <meta name="description" content="Note Taker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between p-4">
          <h1 className="text-2xl font-bold ">Note Taker</h1>
          <div className="flex items-center gap-5">
            {sessionData ? (
              <>
                <Avatar>
                  <AvatarImage
                    src={sessionData ? sessionData.user.image! : "null"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div> hello {sessionData?.user.name}</div>
                <Button onClick={() => void signOut()}>Sign Out</Button>
              </>
            ) : (
              <Button onClick={() => void signIn()}>Sign In</Button>
            )}
          </div>
        </div>
      </header>
      <main>
        <Content />
      </main>
    </>
  );
};

export default Home;

const Content: React.FC = () => {
  const { data: sessionData } = useSession();


  return (sessionData ? <CreateForm/> : <div className="flex justify-center"> Login please</div>);
};
