import { url } from "inspector";
import React from "react";

export const Jumbotron = (props: { title: string }) => {
  return (
    <div className="py-10 w-full">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-heading text-black">{props.title}</h1>
        <div className="h-1 w-20 bg-secondary rounded" />
      </div>
    </div>
  );
};
