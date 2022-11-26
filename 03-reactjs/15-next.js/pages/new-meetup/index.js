// our-domain.com/new-meetup

import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";
import NewCommentForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    try {
      const response = await fetch("api/new-meetup", {
        method: "POST",
        body: JSON.stringify(enteredMeetupData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(response.statusText || "something went wrong");
      }

      const data = await response.json();
      console.log(data);
      router.replace("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities"
        />
      </Head>
      <NewCommentForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetup;
