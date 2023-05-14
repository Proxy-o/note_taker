import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export const CreateForm = () => {
  const [title, setTitle] = useState("");
  const { data: sessionData } = useSession();
  const { data: topics , refetch: refetchTopics} = api.topic.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const createTopic = api.topic.create.useMutation({
    onSuccess: ()=>{
     void refetchTopics();
    }
  });

  const handleSubmite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    createTopic.mutate({
      title,
    });
  };
  return (
    <div  className="m-9">
      <div >
        <ul className="">
          {topics?.map((topic) => (
            <li key={topic.id} className="mt-2">
            <Card >
            <CardHeader>
              <CardTitle>{topic.title}</CardTitle>
              <CardDescription>Created at : {topic.createdAt.toString()}</CardDescription>
            </CardHeader>
  
          </Card>
          </li>
          ))}
        </ul>
      </div>
      <form className="m-auto flex w-max justify-center gap-2 p-6">
        <Input
          className="w-96"
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" onClick={(e) => handleSubmite(e)}>
          Send
        </Button>
      </form>
    </div>
  );
};
